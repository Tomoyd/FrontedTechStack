from flask import Flask
from config import *
from app.views import point_cloud


def create_app():
    app = Flask(__name__, static_folder=STATIC_FOLDER,
                template_folder=TEMPLATE_FOLDER)
    app.debug = False
    app.register_blueprint(point_cloud)

    return app