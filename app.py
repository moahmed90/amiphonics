from flask import Flask, render_template, jsonify
from words import get_random_word


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/word")
def api_word():
    word = get_random_word()
    return jsonify({"word": word})

if __name__ == "__main__":
    app.run(debug=True)