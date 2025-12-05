from flask import Flask, render_template, jsonify, request
from words import get_random_word

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/word")
def api_word():
    # get level from query string, default to 1
    level = request.args.get("level", default=1, type=int)
    word = get_random_word(level)
    return jsonify({"word": word, "level": level})


if __name__ == "__main__":
    app.run(debug=True)