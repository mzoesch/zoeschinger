# 🦄 Setup Backend

# 🛠️ Prerequisites

- Tested with Ubuntu 20.04 and Debian (idk the version)
- Python3.7 or newer
- Domain name with advanced DNS, ARecord to server IP-Address
- Sudo access via ssh
- (opt) git

Replace with your directories and urls

```
[url] = api.zoeschinger.com
[destination] = /home/zoeschinger/app
[service_name] = fastapi
[username] = root
```

# ⚙️ FastAPI App setup

Go to destination directory and create your fastapi project.

E.g.:

```
cd /home
git clone [url]
(opt) git checkout -b [name] origin/[name]; git branch -u origin/[name]
```

Create and activate a virtual environment

```
sudo apt update
sudo apt install python3-venv
python3 -m venv venv
source venv/bin/activate
```

Install dependencies

```
pip install fastapi uvicorn gunicorn
(opt) pip install -r requirements.txt
```

Test if everything works so far

```
gunicorn main:app -k uvicorn.workers.UvicornWorker

curl http://localhost:8000/
```

# 😈 Create a daemon

In your main.py directory

```
sudo nano gunicorn_conf.py
```

and paste the following:

```
from multiprocessing import cpu_count

bind = "127.0.0.1:8000"

workers = cpu_count() + 1
worker_class = 'uvicorn.workers.UvicornWorker'

loglevel = 'debug'
accesslog = '[destination]/access_log'
errorlog =  '[destination]/error_log'
```

Create a systemd unit file in /etc/systemd/system

```
sudo nano /etc/systemd/system/[service_name].service
```

an paste the following:

```
[Unit]

Description=Gunicorn Daemon for FastAPI

After=network.target


[Service]

User=[username]

Group=www-data

WorkingDirectory=[destination]

ExecStart=[destination]/venv/bin/gunicorn -c gunicorn_conf.py main:app


[Install]

WantedBy=multi-user.target
```

Start and enable the daemon service

```
sudo systemctl start [service_name]
sudo systemctl enable [service_name]
(opt) sudo systemctl status [service_name]
```

# 📐 Configure Nginx

Install and start nginx

```
sudo apt install nginx

sudo systemctl start nginx
sudo systemctl enable nginx
(opt) sudo systemctl status nginx
```

Configure serving FastAPI application

```
sudo nano /etc/nginx/sites-available/[url]
```

and paste the following:

```
server {
        client_max_body_size 64M;
        listen 80;
        server_name [url];

        location / {
                proxy_pass             http://127.0.0.1:8000;
                proxy_read_timeout     60;
                proxy_connect_timeout  60;
                proxy_redirect         off;

                # Allow the use of websockets
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

}
```

Add a soft link to /etc/nginx/sites-enabled, to enable config

```
sudo ln -s /etc/nginx/sites-available/[url] /etc/nginx/sites-enabled/
```

Restart daemon so that changes take affect

```
sudo systemctl restart nginx
```

Check if it works. Under http://[url] you should see your api.

# 🔒 Obtain an SSL Certificate

Install certbot:

```
sudo apt install certbot python3-certbot-nginx
```

obtain certificate and follow the steps:

```
sudo certbot --nginx -d [url]
```

restart nginx

```
sudo systemctl restart nginx
```

Congrats. Your api should now be encrypted
