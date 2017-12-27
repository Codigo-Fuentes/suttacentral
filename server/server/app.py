import os
from typing import Tuple

from flasgger import Swagger
from flask import Blueprint, Flask
from flask_cors import CORS
from flask_restful import Api

from api.views import (Currencies, Donations, Languages, LookupDictionaries, Menu, Paragraphs, Parallels, Sutta,
                       SuttaplexList, Images, Epigraphs, WhyWeRead, DictionaryFull, Glossary, Adjacent)
from common.arangodb import ArangoDB
from config import app_config, swagger_config, swagger_template
from search.view import Search


def app_factory() -> Tuple[Api, Flask]:
    """app factory. Handles app object creation for better readability"""
    app = Flask(__name__)
    app.config.from_object(app_config[os.getenv('ENVIRONMENT')])
    api_bp = Blueprint('api', __name__)
    api = Api(api_bp)

    api.add_resource(Languages, '/languages')
    api.add_resource(Search, '/search')
    api.add_resource(DictionaryFull, '/dictionary_full/<string:word>')
    api.add_resource(Menu, '/menu', '/menu/<path:submenu_id>')
    api.add_resource(SuttaplexList, '/suttaplex/<path:uid>')
    api.add_resource(Parallels, '/parallels/<path:uid>')
    api.add_resource(Sutta, '/suttas/<string:uid>/<string:author>', '/suttas/<string:uid>')
    api.add_resource(LookupDictionaries, '/dictionaries/lookup')
    api.add_resource(Currencies, '/currencies')
    api.add_resource(Donations, '/donate')
    api.add_resource(Paragraphs, '/paragraphs')
    api.add_resource(Images, '/images/<string:division>/<int:vol>')
    api.add_resource(Epigraphs, '/epigraphs')
    api.add_resource(WhyWeRead, '/whyweread')
    api.add_resource(Glossary, '/glossary')
    api.add_resource(Adjacent, '/adjacent/<string:word>')

    app.register_blueprint(api_bp)
    return api, app


api, app = app_factory()
arango = ArangoDB(app)
swagger = Swagger(app, config=swagger_config, template=swagger_template)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
