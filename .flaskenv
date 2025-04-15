FLASK_APP="app"
FLASK_DEBUG=False
FLASK_RUN_HOST="0.0.0.0"
FLASK_RUN_PORT=5000

FLASK_K8S_ANNOTATION_PREFIX="kubeboard.xyz"

FLASK_APP_SUBTITLE="A simple web GUI to visualise the services that are available in a Kubernetes cluster."
FLASK_APP_DEFAULT_ICON="mdi-link-variant" # See https://pictogrammers.com/library/mdi/
FLASK_APP_HIDE_BY_DEFAULT="false"
FLASK_APP_FETCH_FAVICON="false" # Please note that the SPA applications could return an incorrect favicon (library issue)

FLASK_THEME_PRIMARY_COLOR="#0075ff"
FLASK_THEME_SECONDARY_COLOR="#AABBC3"
FLASK_THEME_BACKGROUND_URL="../img/earth-background.jpg"
FLASK_THEME_BACKGROUND_EFFECTS="blur(10px) brightness(55%)"

FLASK_FAVICON_CACHE_SIZE=256
FLASK_FAVICON_CACHE_TTL=3600
