# coding=utf-8
from pycloudpoint.template_genarate import TemplateHandler
import webbrowser

# print (template.render(name='gua',numbers=ns,users=us))
template_handle=TemplateHandler()
filepath=template_handle.generate_html()


webbrowser.open_new(filepath)