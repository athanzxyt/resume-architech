from flask import Flask, jsonify
from flask import request

app = Flask(__name__)

import db
import json
import pandas as pd

from scraper import get_repos
from vectorize import sort_by_similarity, embed_data

@app.route("/getprojects")
def getprojects():
    username = request.args.get('username')
    # repos = get_repos(username)
    # db.db.collection.insert_one({"username": username, "repos": repos})
    db.db.collection.insert_one({"username": 'bob'})
    # return jsonify(repos)
    return "connected!"

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