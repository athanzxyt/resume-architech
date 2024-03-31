from flask import Flask, jsonify
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import db
import json
import pandas as pd
from bson.json_util import dumps, loads 

from scraper import get_repos
from vectorize import sort_by_similarity, embed_data

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/checkusername", methods=['POST'])
def checkusername():
    username = request.json['username']

    existing_user = db.db.collection.find_one({"username": username})
    if existing_user == None:
        return jsonify({"exists": False})
    else:
        return jsonify({"exists": True})

@app.route("/getprojects", methods=['get'])
def getuserprojects():
    username = request.args.get('username')
    # print(username)
    existing_user = db.db.collection.find_one({"username": username})
    return json.loads(dumps(existing_user))
    
@app.route("/setuserinfo", methods=['post'])    
def setuserinfo():
    data = request.json
    existing_user = db.db.collection.find_one({"username": data['username']})
    if existing_user != None:
        if existing_user.get("github") != data['github']:
            repos = get_repos(data['github'])
        else:
            repos = existing_user['repos']
        db.db.collection.update_one({"username": data['username']}, {"$set":{**data, "repos": repos}})
        return "updated"
    else:
        repos = get_repos(data['github'])
        db.db.collection.insert_one({**data, "repos": repos})
        return "inserted"
    
@app.route("/addproject", methods=['post']) 
def addproject():
    data = request.json
    existing_user = db.db.collection.find_one({"username": data['username']})
    if existing_user != None:
        db.db.collection.update_one({"username": data['username']}, {"$set":{f"repos.{data['project']['name']}": data['project']}})
        existing_user = db.db.collection.find_one({"username": data['username']})
        return json.loads(dumps(existing_user))
    else:
        return "user not found"

@app.route("/generatebullets")
def genbullets():
    return "generating!!"

@app.route("/clear")
def clear():
    db.db.collection.delete_many({})
    return "cleared"

@app.route("/viewall")
def viewall():
    cursor = db.db.collection.find({})
    list_cur = list(cursor) 
    json_data = dumps(list_cur, indent = 2)  
    return json_data


@app.route("/sortbullets")
def getmostsimilar():
    data = []
    with open("dummydata.json", "r") as f:
        json_data = json.load(f)
        for project in json_data:
            for bullet in json_data[project]['bullets']:
                data.append((bullet, json_data[project]['title']))
    data = pd.DataFrame(data, columns=["bullet", "title"])

    job_desc = open("dummyjob.txt", "r").read()

    return sort_by_similarity(job_desc, embed_data(data)).to_json()

if __name__ == '__main__':
    app.run(port=8000)