
AmiPhonics

AmiPhonics is a simple phonics game designed to help early readers practise blending sounds and recognising short words. It focuses on quick feedback, playful interaction and keeping things light rather than feeling like formal learning.

Alongside the game itself, the project is used to explore how a small web application can be deployed and evolved using real-world engineering and DevOps practices.

⸻

What the app does
	•	Picks a random CVC word from a Python word list
	•	Displays the word as _ _ _ and asks the player to choose letters in order
	•	Responds instantly with “Well done” or “Try again”
	•	Tracks basic scoring and includes simple animations for engagement

⸻

Why this project

The original idea came from wanting to build a small learning tool for my daughter as she started practising phonics. As the project grew, it became a way to apply software engineering skills beyond just writing application code.

The focus is as much on how the system is deployed and maintained as it is on the game itself.

⸻

Architecture evolution

AmiPhonics has been built in stages to show how a simple application can evolve over time.

V1 – Manual EC2 deployment

The first deployed version runs on a single Amazon EC2 instance using Amazon Linux.
	•	Application deployed manually to EC2
	•	SSH access restricted to a single IP and the app exposed on port 5000
	•	Flask app managed as a systemd service using gunicorn
	•	Provides a clear baseline before introducing automation

⸻

V2 – Infrastructure as Code with Terraform

The manual setup was replaced with Terraform to make the infrastructure reproducible.
	•	EC2 instance and security group defined in Terraform
	•	Amazon Linux 2023 selected dynamically using data sources
	•	Application bootstrapped with user_data
	•	Service managed using systemd and gunicorn
	•	Environment can be created or destroyed consistently

⸻

V3 – CI/CD with GitHub Actions

Deployment was automated to remove manual server changes.
	•	GitHub Actions pipeline triggered on pushes to main
	•	Application updates deployed automatically to EC2
	•	No manual SSH required for deployments
	•	Running application stays in sync with the repository

⸻

V4 – Containerisation with Docker

The application was containerised to standardise the runtime and simplify deployment.
	•	Flask app packaged as a Docker image
	•	Images built and pushed automatically in CI
	•	Images stored in GitHub Container Registry
	•	EC2 pulls and runs the latest image on deployment
	•	Container configured to restart automatically

⸻

Tech stack

Application
	•	Python 3
	•	Flask
	•	HTML, CSS and JavaScript
	•	Gunicorn

DevOps and Cloud
	•	Docker
	•	GitHub Actions
	•	GitHub Container Registry
	•	AWS EC2
	•	Terraform
	•	Amazon Linux

⸻

V5 – Kubernetes deployment (local cluster)

The application was deployed to a local Kubernetes cluster to introduce orchestration, service discovery and self-healing.
	•	Kubernetes Deployments and Services used to manage the application lifecycle
	•	Application exposed using a NodePort Service  for local access
	•	Pod startup, health and networking verified using kubectl
	•	Self-healing demonstrated by deleting Pods and observing automatic recreation
	•	Application scaled by running multiple replicas
⸻

Local development

docker build -t amiphonics .
docker run -p 5000:5000 amiphonics
