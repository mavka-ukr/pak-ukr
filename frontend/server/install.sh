#!/usr/bin/env bash

SYSTEMD_SERVICES_DIR="/etc/systemd/system"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
NGINX_AVAILABLE_DIR="/etc/nginx/sites-available"

if [ -d "./server/systemd" ]; then
    SYSTEMD_SERVICES=$(ls "./server/systemd")
    for SERVICE in $SYSTEMD_SERVICES; do
        SERVICE_FILE="./server/systemd/$SERVICE"
        SERVICE_FILENAME=$(basename "$SERVICE_FILE")
        echo "Copying $SERVICE_FILE to $SYSTEMD_SERVICES_DIR/$SERVICE_FILENAME"
        sudo cp "$SERVICE_FILE" "$SYSTEMD_SERVICES_DIR/$SERVICE_FILENAME"
    done
fi

if [ -d "./server/nginx" ]; then
    NGINX_CONFIGS=$(ls "./server/nginx")
    for CONFIG in $NGINX_CONFIGS; do
        CONFIG_FILE="./server/nginx/$CONFIG"
        CONFIG_FILENAME=$(basename "$CONFIG_FILE")
        echo "Copying $CONFIG_FILE to $NGINX_AVAILABLE_DIR/$CONFIG_FILENAME"
        sudo cp "$CONFIG_FILE" "$NGINX_AVAILABLE_DIR/$CONFIG_FILENAME"
    done
fi