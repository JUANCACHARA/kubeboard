from flask import Flask, render_template
from app.kubernetes import k8s_load_config, k8s_get_ingresses

app = Flask(__name__)
app.config.from_prefixed_env()


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html.j2")


@app.route("/config", methods=["GET"])
def config():
    # Start by loading the Kubernetes configuration
    k8s_load_config(logger=app.logger)

    # Fetch all the ingresses from Kubernetes API
    ingresses = k8s_get_ingresses(
        logger=app.logger,
        prefix=app.config["K8S_ANNOTATION_PREFIX"],
        default_icon=app.config["APP_DEFAULT_ICON"],
        hide_by_default=app.config["APP_HIDE_BY_DEFAULT"],
    )

    # Return to user
    return ingresses

@app.route("/static/css/kubeboard-theme.css", methods=["GET"])
def theme():
    resp = app.make_response(
        render_template(
            "theme.css.j2",
            primary_color=app.config["THEME_PRIMARY_COLOR"],
            secondary_color=app.config["THEME_SECONDARY_COLOR"],
            background_url=app.config["THEME_BACKGROUND_URL"],
        )
    )
    resp.mimetype = "text/css"
    return resp
