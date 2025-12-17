FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /static /media

# entrypoint для миграций + collectstatic
RUN printf '#!/bin/sh\nset -e\npython manage.py migrate --noinput\npython manage.py collectstatic --noinput\nexec gunicorn kittygram_backend.wsgi:application --bind 0:8000\n' > /app/entrypoint.sh \
    && chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
