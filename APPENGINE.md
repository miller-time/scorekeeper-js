Deployment
==========

Command line:

    appcfg.py --oauth2 --noauth_local_webserver update .

Dev Server

    dev_appserver.py --skip_sdk_update_check=yes --port=8081 --admin_port=8091 app.yaml
