# DIDA entry

Data entry app frontend for DIDA.

## Setting up Apache httpd

```
  # Prevent indexing by crawlers
  Alias /robots.txt /home/martin/x/www/robots-disallow.txt
  <Directory /home/martin/x/www/>
    Options -Indexes -FollowSymLinks
    AllowOverride none
    Require all granted
  </Directory>

  # Proxy to the API (dida production server)
  ProxyPass        /api/ http://localhost:3000/api/
  ProxyPassReverse /api/ http://localhost:3000/api/

  <Proxy *>
    Require all granted
  </Proxy>

  # Statically build client (dida production client)
  DocumentRoot /home/martin/Projects/dida/dida-entry/build
  <Directory /home/martin/Projects/dida/dida-entry/build>
    Header set Cache-Control "max-age=84600, public"

    Options Indexes FollowSymLinks
    AllowOverride all
    Require all granted

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.html [QSA,L]
  </Directory>
```

## Run this app:

Running development server:
```bash
REACT_APP_ENV=development npm start
```

Building static assets for production:

```bash
REACT_APP_ENV=production npm run build
```

## Screenshots

![Login form](doc/starter-login.png)

![List of Exemps](doc/starter-vms.png)

## Libs and links

 * [Material UI](https://material-ui.com/)
 * [Dropzone for Material UI](https://github.com/Yuvaleros/material-ui-dropzone)
 * [create-react-app configuration](https://github.com/facebook/create-react-app/blob/master/docusaurus/docs/advanced-configuration.md)


## TODO:
 * Take a look: https://github.com/mbrn/material-table
 * Mapy.cz Integration: https://github.com/flsy/react-mapycz
 * Toasts: https://fkhadra.github.io/react-toastify/autoClose
