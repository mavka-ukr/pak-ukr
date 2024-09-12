#!/usr/bin/env bash

SYSTEMD_SERVICES_DIR="/etc/systemd/system"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
NGINX_AVAILABLE_DIR="/etc/nginx/sites-available"

SYSTEMD_SERVICES=$(ls "./server/systemd")
NGINX_CONFIGS=$(ls "./server/nginx")

for SERVICE in $SYSTEMD_SERVICES; do
    SERVICE_FILE="./server/systemd/$SERVICE"
    SERVICE_FILENAME=$(basename "$SERVICE_FILE")
    echo "Stopping $SERVICE_FILENAME"
    sudo systemctl stop "$SERVICE_FILENAME"
    echo "Disabling $SERVICE_FILENAME"
    sudo systemctl disable "$SERVICE_FILENAME"
done

for CONFIG in $NGINX_CONFIGS; do
    CONFIG_FILE="./server/nginx/$CONFIG"
    CONFIG_FILENAME=$(basename "$CONFIG_FILE")
    echo "Removing $NGINX_ENABLED_DIR/$CONFIG_FILENAME"
    sudo rm "$NGINX_ENABLED_DIR/$CONFIG_FILENAME"
done

echo "Reloading nginx"
sudo systemctl reload nginx