#!/usr/bin/env python
# -*- coding:utf-8 -*-
from flask import Blueprint, render_template, request, json

import yaml, datetime
import sys, os,shutil

sys.path.insert(0, './clibs/build/')

from config import TITLE

point_cloud = Blueprint('point_cloud', __name__)
reload(sys)
sys.setdefaultencoding('utf-8')
import clibs


def get_dict_tow(dict1, dict2):
    for key in dict1:
        dict1[key] = dict2[key]


def delete_file(filepath):
    if os.path.exists(filepath):
        os.remove(filepath)


def get_roi(file_dir):
    max_value=-1
    roi_data=[]
    if os.path.exists(file_dir):
        filenames=os.listdir(file_dir)
        for filename in filenames:
            filepath=os.path.join(file_dir,filename)
            with open(filepath,"r") as f:
                yaml_data=yaml.load(f.read())
                data_dict={}
                value = yaml_data["roi_value"]
                max_value=value if value> max_value else max_value
                data_dict.update(points=yaml_data["polygen"],value=value)
                roi_data.append(data_dict)
    return max_value,roi_data

@point_cloud.route('/')
def index():
    return render_template('index.html', name="hello world", title=TITLE, pcdnames=[])


@point_cloud.route('/api/points/data', methods=["GET"])
def get_points():
    filedir = request.args.get("fileDir")
    pcd_name = None if "pcdName" not in request.args else request.args.get("pcdName")
    points = []
    pcd_names = []
    reply_info = {"code": 200, }
    if pcd_name is not None:
        filepath = os.path.join(filedir, pcd_name)
        roi_file_dir=os.path.join(filedir,pcd_name.replace(".pcd",""),"params")
        max_value,rois=get_roi(roi_file_dir)
        if os.path.exists(filepath):
            points = clibs.pclLoader(str(filepath))
        reply_info.update(points=points,maxValue=max_value,rois=rois)
        if len(points) == 0:
            reply_info = {"code": 204}
        return json.dumps(reply_info)

    if os.path.exists(filedir):
        filenames = os.listdir(filedir)
        filenames.sort()
        for filename in filenames:
            if len(filename) > 4 and filename[-4:] == '.pcd':
                pcd_names.append(filename)
    if len(pcd_names) > 0:
        filename = pcd_names[0]
        filepath = os.path.join(filedir, filename)
        roi_file_dir = os.path.join(filedir, filename.replace(".pcd", ""), "params")
        max_value, rois = get_roi(roi_file_dir)
        points = clibs.pclLoader(str(filepath))
        reply_info.update(points=points, pcdNames=pcd_names,maxValue=max_value,rois=rois)
    if len(points) == 0:
        reply_info = {"code": 204}
    return json.dumps(reply_info)


@point_cloud.route("/api/upload/img", methods=["POST"])
def upload_img():
    file = request.files["b64"]
    file_dir = request.form["fileDir"]
    reply_info = {"code": 200, }
    yaml_info = {'polygen': [],
                 'roi_range': {'xmin': 0, 'ymin': 0, 'ymax': 0, 'xmax': 0}, 'png_size': {'rows': 0, 'cols': 0},
                 'png_range': {'xmin': 0, 'ymin': 0, 'ymax': 0, 'xmax': 0}, 'roi_value': 0}
    yaml_load = json.loads(request.form["yamlInfo"])
    yaml_info["polygen"] = yaml_load["polygen"]
    yaml_info["roi_value"] = yaml_load["roi_value"]
    get_dict_tow(yaml_info["roi_range"], yaml_load["roi_range"])
    get_dict_tow(yaml_info["png_size"], yaml_load["png_size"])
    get_dict_tow(yaml_info["png_range"], yaml_load["png_range"])
    # roi_str="ROI_"+datetime.datetime.strftime(datetime.datetime.now(),"%Y%m%d")
    roi_str = yaml_load["pcdName"]
    file_name = yaml_load["pcdName"] + "_" + str(yaml_load["roi_value"])
    try:
        if os.path.exists(file_dir):
            png_dir = os.path.join(file_dir, roi_str, "roi")
            if not os.path.exists(png_dir):
                os.makedirs(png_dir)
            png_path = os.path.join(png_dir, file_name + ".png")
            with open(png_path, "wb") as f:
                while True:
                    data = file.read(20 * 1024 * 1024)
                    if not data:
                        break
                    f.write(data)
            yaml_dir = os.path.join(file_dir, roi_str, "params")
            if not os.path.exists(yaml_dir):
                os.makedirs(yaml_dir)
            yaml_path = os.path.join(yaml_dir, file_name + ".yaml")
            with open(yaml_path, "w") as y_f:
                yaml.dump(yaml_info, y_f)
    except IOError as e:
        reply_info.update(code=500, msg="文件操作出错:" + str(e))

    return json.dumps(reply_info)


@point_cloud.route("/api/roi/delete", methods=["POST"])
def delete_roi():
    file_dir = request.form["fileDir"]
    filename = request.form["filename"].replace(".pcd","")
    value = request.form["value"]
    file_dir=os.path.join(file_dir,filename)
    reply={"code":500,"msg":"不存在"}
    if not os.path.exists(file_dir):
        return json.dumps(reply)
    if value=="deleteAll":
        shutil.rmtree(file_dir)
        reply.update(code=200,msg="已删除")
        return json.dumps(reply)
    file_name="{}_{}".format(filename,value)
    param_file=os.path.join(file_dir,"params",file_name+".yaml")
    png_file=os.path.join(file_dir,"roi",file_name+".png")
    delete_file(param_file)
    delete_file(png_file)
    reply.update(code=200, msg="已删除")
    return json.dumps(reply)