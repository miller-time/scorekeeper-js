import os
from flask import Flask, render_template, send_from_directory, request
from google.appengine.api import users

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        'favicon.ico', mimetype='image/vnd.microsoft.icon'
    )

@app.route('/')
def index():
    username = None
    user = users.get_current_user()
    admin = users.is_current_user_admin()
    if user:
        username = user.nickname()
        log_in_out_text = "Log out"
        log_in_out_url = users.create_logout_url(request.url)
    else:
        log_in_out_text = "Log in"
        log_in_out_url = users.create_login_url(request.url) + '%23%2Fprofile'
    return render_template(
        "index.html",
        username=username,
        admin=admin,
        log_in_out_url=log_in_out_url,
        log_in_out_text=log_in_out_text
    )
