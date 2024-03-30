from flask import Flask, jsonify
from flask import request

app = Flask(__name__)

import db
from scraper import get_repos
import json

@app.route("/getprojects")
def getprojects():
    username = request.args.get('username')
    # repos = get_repos(username)
    # db.db.collection.insert_one({"username": username, "repos": repos})
    db.db.collection.insert_one({"username": 'bob'})
    # return jsonify(repos)
    return "connected!"


if __name__ == '__main__':
    app.run(port=8000)