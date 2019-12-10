# coding:utf-8
import os
import threading


class Common(object):
    def __init__(self):
        self.locker = threading.Lock()

    # 检测Bag文件存储路径是否存在,不存在则创建
    def check_dir(self,filepath):
        # 去除首位空格
        filepath = filepath.strip()
        # 去除尾部 \ 符号
        filepath = filepath.rstrip("\\")
        # 如果不存在则进行创建
        ret = True
        # 加线程锁,防止多线程同时进行文件夹创建时冲突
        self.locker.acquire()
        if not (os.path.isdir(filepath)):
            os.makedirs(filepath)
            # 判断是否创建成功
            if not (os.path.isdir(filepath)):
                ret = False
        # 释放线程锁
        self.locker.release()
        return ret