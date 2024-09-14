#!/usr/bin/env bash

SYSTEMD_SERVICES_DIR="/etc/systemd/system"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
NGINX_AVAILABLE_DIR="/etc/nginx/sites-available"

if [ -d "./server/systemd" ]; then
    SYSTEMD_SERVICES=$(ls "./server/systemd")
    for SERVICE in $SYSTEMD_SERVICES; do
        SERVICE_FILE="./server/systemd/$SERVICE"
        SERVICE_FILENAME=$(basename "$SERVICE_FILE")
        echo "Removing $SYSTEMD_SERVICES_DIR/$SERVICE_FILENAME"
        sudo rm "$SYSTEMD_SERVICES_DIR/$SERVICE_FILENAME"
    done
fi

if [ -d "./server/nginx" ]; then
    NGINX_CONFIGS=$(ls "./server/nginx")
    for CONFIG in $NGINX_CONFIGS; do
        CONFIG_FILE="./server/nginx/$CONFIG"
        CONFIG_FILENAME=$(basename "$CONFIG_FILE")
        echo "Removing $NGINX_AVAILABLE_DIR/$CONFIG_FILENAME"
        sudo rm "$NGINX_AVAILABLE_DIR/$CONFIG_FILENAME"
    done
fi