**AmiPhonics**

AmiPhonics is a small phonics game I made for my daughter to help her practise early reading. It’s simple, playful, and designed so she can learn by recognising sounds, choosing letters, and getting quick feedback.

The app uses a Flask backend and a JavaScript frontend. It:
	•	picks a random CVC word from a Python word list
	•	shows the word as _ _ _ and lets the player choose letters in the right order
	•	responds with “Well done!” or “Try again!”
	•	tracks the score and uses fun animations like confetti and a reacting unicorn

**Why I built it**

My daughter has just started learning how to blend sounds, and I wanted to give her something fun that didn’t feel like formal practice. Building this game became a nice way to support her learning and also apply the skills I’ve been developing in software engineering.

AmiPhonics ended up being a mix of both worlds — something she enjoys using, and something I enjoyed building while improving my Flask and JavaScript skills.

**Tech stack**

	•	Python 3
	•	Flask
	•	HTML, CSS, JavaScript
  
**How to run**

python -m venv venv
source venv/bin/activate   # macOS / Linux
# venv\Scripts\activate    # Windows

pip install flask
python app.py
