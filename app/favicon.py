from logging import Logger
import favicon
import requests


def _favicon_fetch(logger: Logger, hostname: str) -> str:
    favicon_url = None

    try:
        icons = favicon.get(f"http://{hostname}", allow_redirects=True)
        if len(icons) > 0:
            # Validate that favicon is reachable
            request_resp = requests.get(icons[0].url)
            request_resp.raise_for_status()  # Raise an exception for bad status codes

            # Add favicon into cache if its correspond to an image
            request_content_type = request_resp.headers.get("Content-Type")
            if request_content_type and request_content_type.startswith("image/"):
                favicon_url = icons[0].url

    except Exception as error:
        logger.warning(f"Cannot fetch favicon for {hostname}: {error}")

    return favicon_url
