FROM alpine:3

LABEL org.opencontainers.image.source="https://github.com/ByTheHugo/kubeboard"
LABEL org.opencontainers.image.description="A simple web GUI to visualise the services that are available in a Kubernetes cluster."
LABEL org.opencontainers.image.licenses="Apache-2.0"

WORKDIR /app

# hadolint ignore=DL3018
RUN apk add --update --no-cache python3 py3-pip \
  && adduser --home /app --disabled-password kubeboard

COPY requirements.txt .

RUN pip install --no-cache-dir --break-system-packages -r requirements.txt

COPY . .

RUN chown -R kubeboard:kubeboard .

USER kubeboard

CMD [ "python3", "-m", "flask", "run" ]
