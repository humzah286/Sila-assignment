from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import requests

app = FastAPI()

NODE_URL = 'http://node-backend:8000'


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/get-random-text")
def get_random_text():
        return {"random_text": '''Python : Canto oh el epoca atras ni. Sano un so echo yo sola. El rica sido ya me en sera. Urbana viento mi da prensa aterra. Adquirido tranquilo apelativo infiernos de ex ch averiados forastero tu. Movimiento perversion satisfecha ni el amenazaban claramente renunciaba. Yo manera verdes tocaba lo ni.

        Echaba va volvio marido ah medico sastre. Para era sin son paje dijo. Banco botas fagot damas si en. Yo necesarias no entenderlo dispersion desencanto comprender oh fantastico. Esa estudiante respetable ser ortografia. Notar pasto si fonda fe mecia hijos guapo. Llenase ser del pandero procuro etc dociles. Un edad yo se raso pano rato dijo. ''' }

@app.get('/get-text-from-node')
def get_text_from_node():
    
    url = NODE_URL + '/get-random-text'

    print("url : ", url)
    
    try: 
        response = requests.get(url)

        response = response.json()

        return response

    except: 
        return {"message": "Error encountered"}


     
     