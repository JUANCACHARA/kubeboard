import logging
import pytest

logging.getLogger("kubernetes").setLevel(logging.INFO)

FAVICON_HOSTNAME = "prometheus.io"
FAVICON_URL = "https://prometheus.io/assets/favicons/android-chrome-192x192.png"

DEFAULT_ICON = "mdi-link-variant"
ANNOTATION_PREFIX = "kubeboard.xyz"
ANNOTATIONS_TO_TEST = {
    f"{ANNOTATION_PREFIX}/test": "success",
    "invalid-prefix/test": "fail",
}


@pytest.fixture(scope="session")
def logger() -> logging.Logger:
    return logging.getLogger(__name__)
