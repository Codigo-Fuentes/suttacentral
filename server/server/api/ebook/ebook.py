import pathlib
import subprocess
from flask import current_app, request, redirect
from flask_restful import Resource

from .make_html import get_html_data
from .epub import Book as Epub

from app import config

HERE = pathlib.Path(__file__).parent
EXPORTS_DIR = config.ASSETS_DIR / 'exports'

def create_epub(data, filename):
    title = 'Long Discourses'
    author = 'Bhante Sujato'
    cover = 'cover.png'

    cover_page = '''
    <div>
    <img src="../images/cover.png" alt="Dhamma Wheel"/>
    </div>
    '''

    introduction_page = f'''
    <h1>{data['root_title']}: {data['title']}</h1>
    
    <p><i>{data['author_blurb']}</i></p>
    
    <p>{data['blurb']}</p>

    <p><em>This EBook was automatically generated by suttacentral.net</em></p>
    '''

    stylesheet = '''
    '''

    book = Epub(title=data['title'], author=data['author'])
    book.add_stylesheet(stylesheet)
    book.add_image(name='cover.png', data=open(HERE / cover, 'rb').read())
    book.add_page(title=data['title'], content=cover_page, uid='cover')
    title_page = book.add_page(title='Introduction', content=introduction_page, uid='intro')

    for page in data['pages']:
        chapter = book.add_page(title=page['title'], content=page['html'], uid=page['uid'])

    book.save(filename)
    #epubcheck(filename)

class EBook(Resource):
    def get(self, uid, language, author, **kwargs):
        ebook_format = request.args.get('format', 'epub')
        debug = request.args.get('debug')
        
        if ebook_format != 'epub':
            return 500, "Format not supported"           
        
        
        data = get_html_data(uid, language, author)
        
        if debug:
            return data
            
        filename = str((HERE / f'{uid}_{language}_{author}.epub').absolute())
        
        create_epub(data, filename)            
        
        
        return {'uid': uid, 'language': language, 'author': author, 'format': ebook_format, 'filename': filename}


def epubcheck(filename):
    subprocess.run(['epubcheck', str(filename)])
