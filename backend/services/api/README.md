# Pak API Service

## Production

### Requirements

- Node.js
- NPM
- systemctl
- nginx
- PostgreSQL

```shell
cd /home/pak/pak-backend/services/api/
sudo cp pak_api.service /etc/systemd/system/pak_api.service
sudo systemctl enable pak_api
sudo systemctl start pak_api
```