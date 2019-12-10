# coding=utf-8

import sys

reload(sys)
sys.setdefaultencoding('utf8')

from ..common import Common
from jinja2 import Environment, FileSystemLoader
import os


class TemplateHandler(Common):
    def __init__(self, template_folder=None, output_folder="./template/"):
        super(TemplateHandler, self).__init__()
        if template_folder is None:
            template_folder = '{}/../templates/'.format(os.path.join(os.path.dirname(__file__)))
        self.template_folder = template_folder
        self.output_folder = output_folder

    def generate_html(self):
        html_loader = FileSystemLoader(self.template_folder)
        env = Environment(loader=html_loader)
        template = env.get_template('demo.html')
        self.check_dir(self.output_folder)
        filepath = os.path.join(self.output_folder, "index.html")
        with open(filepath, "w") as html_file:
            html_file.write(template.render(name='gua'))
        return filepath
