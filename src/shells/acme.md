---
title: acme.sh
tag:
  - Shell
  - HTTPS
---

## 更新acme.sh

```bash
acme.sh --upgrade
```

## 更新证书

```bash
vi /etc/nginx/sites-available/${domain}
nginx -s reload
acme.sh -r --domain ${domain}
vi /etc/nginx/sites-available/${domain}
nginx -s reload
```
