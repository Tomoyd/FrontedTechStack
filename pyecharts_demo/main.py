#!/usr/bin/env python
# -*- coding:utf-8 -*-
from config import APP_HOST,APP_PORT
from app import create_app
import webbrowser
import thread,sys
reload(sys)
sys.setdefaultencoding('utf-8')

def open_url():
    webbrowser.open_new("http://{}:{}".format(APP_HOST, APP_PORT))

if __name__ == '__main__':
    app=create_app()
    thread.start_new_thread(open_url,())
    app.run(host=APP_HOST,port=APP_PORT)

