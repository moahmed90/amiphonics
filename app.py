from flask import Flask, render_template, jsonify, request
from words import get_random_word

app = Flask(__name__)


@app.route("/")
def ask_name():
    # First page: ask for name
    return render_template("name.html")


@app.route("/balloon")
def balloon():
    # Second page: pop a balloon
    name = request.args.get("name", "Friend")
    return render_template("balloon.html", name=name)


@app.route("/game")
def game():
    # Third page: main AmiPhonics game
    name = request.args.get("name", "Friend")
    return render_template("index.html", name=name)


@app.route("/api/word")
def api_word():
    level = request.args.get("level", default=1, type=int)
    word = get_random_word(level)
    return jsonify({"word": word, "level": level})

@app.route("/health")
def health():
    return jsonify({"ok":True})


if __name__ == "__main__":
    app.run(host ="0.0.0.0", port=5000,debug=True)