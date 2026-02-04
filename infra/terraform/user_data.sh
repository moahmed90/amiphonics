#!/bin/bash
set -e

dnf update -y
dnf install -y python3 python3-pip git

APP_DIR=/home/ec2-user/amiphonics

# Get the app code
if [ ! -d "$APP_DIR" ]; then
  sudo -u ec2-user git clone https://github.com/moahmed90/amiphonics.git "$APP_DIR"
else
  cd "$APP_DIR"
  sudo -u ec2-user git pull
fi

# Install dependencies (simple for V2)
sudo -u ec2-user pip3 install --user flask gunicorn

# Create systemd service
cat > /etc/systemd/system/amiphonics.service << 'SERVICE'
[Unit]
Description=AmiPhonics Flask App
After=network.target

[Service]
User=ec2-user
WorkingDirectory=/home/ec2-user/amiphonics
Environment=PYTHONUNBUFFERED=1
ExecStart=/home/ec2-user/.local/bin/gunicorn -b 0.0.0.0:5000 app:app
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable amiphonics
systemctl restart amiphonics
