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
## Architecture evolution

### V1 – Manual EC2 deployment (baseline)
The first deployed version of AmiPhonics runs on a single Amazon EC2 instance using Amazon Linux.

- The app is deployed manually to EC2 to establish a simple baseline
- Inbound access is restricted (SSH from my IP, application exposed on port 5000)
- The Flask app runs as a managed `systemd` service using `gunicorn`
- This version focuses on getting the application live with minimal complexity

This baseline will be evolved in later versions to introduce infrastructure as code, automated deployments, containerisation, and orchestration.
python -m venv venv
source venv/bin/activate   # macOS / Linux

### V2 – Infrastructure as Code with Terraform
The manual EC2 setup from V1 was replaced with Terraform so the infrastructure can be created and destroyed consistently.

- EC2 instance and security group are defined using Terraform
- Amazon Linux 2023 is selected dynamically using a data source
- The application is bootstrapped using `user_data`
- AmiPhonics runs automatically as a `systemd` service with `gunicorn`
- The public IP is exposed as a Terraform output

This version removes click-based setup and makes the environment fully reproducible.

venv\Scripts\activate    # Windows
pip install flask
python app.py
