# Reverse proxy

When deploying Cthunline in production, it's convenient to have a reverse proxy distributing the app.

Here is an example of a Nginx configuration that you can use to serve the app:

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name my.cthunline.app;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name my.cthunline.app;
  ssl_certificate /path/to/ssl/fullchain.pem;
  ssl_certificate_key /path/to/ssl/privkey.pem;
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Upgrade $http_upgrade;
    proxy_cache_bypass $http_upgrade;
  }
}
```
