<img src="https://user-images.githubusercontent.com/25137010/50963073-0027c100-14cc-11e9-805e-a1b60edd7409.png" width="15%"></img> 
<img src="https://user-images.githubusercontent.com/25137010/50963087-09189280-14cc-11e9-9efc-f1699e837087.png" width="15%"></img> 
<img src="https://user-images.githubusercontent.com/25137010/50963099-0f0e7380-14cc-11e9-8e2b-2a27a997a94b.png" width="15%"></img> 
<img src="https://user-images.githubusercontent.com/25137010/50963112-1766ae80-14cc-11e9-8c05-386552ada25e.png" width="15%"></img> 

# rartracker
A modern front and backend bittorrent tracker written in AngularJS and PHP.
## Current version
0.3.5
## Author
the swedish torrent king / ERR1R

## Updates
For a detailed list of updates, improvements, and fixes, see [UPDATES.md](UPDATES.md).

## Feature highlights
* Super responsive GUI thanks to the SPA-application nature of AngularJS
* Advanced admin-features for monitoring site activity, handling reports and multi-deleting torrents.
* Many features suitable for scene only trackers
* Awesome features like bonus-system, leech bonus, seed-time, request system and rss-system.
* Highly skinnable and mobile friendly design with Bootstrap CSS
* Very clean code to grasp for developers
* Dynamic multi language support

# Installation
## 1. Install Node.js/npm and Git

**Windows:**
* https://nodejs.org/en/download/
* https://git-scm.com/download/win (Choose: Use/run Git from the Command Prompt (cmd.exe))

**Ubuntu/Debian:**
```sh
$ sudo apt-get install -y nodejs
$ sudo apt-get install -y git-core

Working with versions:
root@server01:~# nodejs -v
v4.2.6

root@server01:~# node -v
v7.10.1

root@server01:~# npm --v
3.5.2
```

## 2. Install dependencies
From the project folder install all build script packages and all 3rd party dependencies
```sh
$ npm install --global bower
$ npm install --global gulp-cli
$ npm install
$ bower install --allow-root <-- keep the allow-root flag, if logged in as root
$ npm run dist
```
## 3. Import database (databse/database.sql)

# Configurations

### 1. Basic config
Create the file **secrets.php** in the api/ folder.
````
<?php
$database = 'mysql';
$host = '127.0.0.1';
$dbname = 'rartracker';
$username = 'root';
$password = '';
````

Some site settings in api/Config.php and app/app.config.js should be changed!

### 2. Generate new unique salt hashes (optional for security)
* Note that updating the salts will make current registered accounts unusable, you'd want to log in and create invite codes (step 4) before changing salts and finally registering new accounts.
* $passwordSalt and $cookieSalt in **User.php** should be updated with new random hashes.

### 3. Create admin accounts
Use built in account named "**System**" password: "**password**" to create invites and register new admin-accounts
The "System" account **must remain** as a parked account and have Staff rights because it's used as deleter of torrents, sender of PM and creation of forum topics etc. Change System password.

## Server settings
### Recommended packages
Apache:
``php7.2 apache2 mariadb-server libapache2-mod-php7.2 php7.2-mysql memcached php7.2-curl php7.2-memcached php-msgpack php-igbinary
php7.2-imagick
``
## Only for apache2
### Enable rewrite module and change AllowOverride from "None" to "All" in httpd.conf in order for .htaccess to work
``a2enmod rewrite``

Nginx:
``php7.2 nginx mariadb-server libapache2-mod-php7.2 php7.2-mysql memcached php7.2-curl php7.2-memcached php-msgpack php-igbinary php7.2-fpm php7.2-imagick``

Mysql/MariaDB:

Are strict with newer versions so you need to use this sql_mode. Use this in your my.cnf under [mysqld]

```sql_mode=ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION```

### Recommended MariaDB settings
This is for making the fulltext search work. Add below lines in your my.cnf under [mysqld].
Also disable the stopword function with innodb_ft_enable_stopword = OFF
```sh
innodb_ft_enable_stopword = OFF
innodb_ft_min_token_size=1
ft_min_word_len=1
```

## Nginx configuration
```sh
server {
#simple config
	listen 80;
	listen 443 ssl;
	server_name digitalcore.nl;
   
       ssl_certificate     /etc/nginx/ssl/digitalcore.nl.crt;
	ssl_certificate_key /etc/nginx/ssl/digitalcore.nl.key;

	root /home/www/rartor/rartracker;
	index index.html;

	location / { try_files $uri /index.html;}
	location ~ ./img { } 
	location ~ ./phpMyAdmin { } 
	location ~ .(html)$ { } 
	rewrite ^/api/v1/(.*)$ /api/api-v1.php?url=$1 last;

	location ~ \.php$ {
       include snippets/fastcgi-php.conf;
       fastcgi_pass unix:/run/php/php7.2-fpm.sock;
       }
}

```

## Apache Configuration
```sh 
<VirtualHost domainname.nl:443>
    ServerName domainname.nl
    DocumentRoot /var/www/rartracker
    LogLevel warn
    ServerSignature Off
    ErrorLog /var/log/apache2/error.log
    <Directory "/var/www/rartracker">
        AllowOverride All
        Require all granted
    RewriteEngine On
    </Directory>
SSLEngine on
SSLCertificateFile /etc/apache2/ssl/certname_nl.crt
SSLCertificateKeyFile /etc/apache2/ssl/certname.key
SSLCertificateChainFile /etc/apache2/ssl/certname_nl.ca-bundle 
</VirtualHost>

<VirtualHost domainname.nl:80>
    ServerName domainname.nl
    DocumentRoot /var/www/rartracker
    LogLevel warn
    ServerSignature Off
    ErrorLog /var/log/apache2/error.log
    <Directory "/var/www/rartracker">
        AllowOverride All
        Require all granted
    RewriteEngine On
    </Directory>
</VirtualHost>
```

Tested with mariadb-server-10.3 / php7.2 / php7.2-fpm / apache2 / nginx

### Permissions
The following folders needs to be created and be given write permission:

* torrents/
* img/imdb/

## General Configurations

You'll need to listen on:

Port 80 to reach the site
Port 1337 so torrent clients can talk to the tracker
Port 1338 ( with SSL enabled! ) so torrent clients can securely talk to the tracker
By default this option is enabled for every member
In /api/Config.php you'll need to edit TRACKER_URL and TRACKER_URL_SSL.

```php
<?php
    const TRACKER_URL = "http://domain.nl:1337";
    const TRACKER_URL_SSL = "https://domain.nl:1338"
```

Obviously replace domain.nl with whatever domain you use.

Dev-hint

If you want to force regular HTTP tracker communication, just set TRACKER_URL_SSL to the same value as TRACKER_URL.
This allows you to ignore messing with SSL for a while.

I do recommend setting up SSL if you're using this in production.

## Crontab settings (crontab -e)
```sh
12      *       *       *       *       wget -O /dev/null http://127.0.0.1/api/v1/run-leechbonus
*/20    *       *       *       *       wget -O /dev/null http://127.0.0.1/api/v1/run-cleanup
0       0       *       *       5       wget -O /dev/null http://127.0.0.1/api/v1/run-bonus
0       20      *       *       *       wget -O /dev/null http://127.0.0.1/api/v1/run-statistics
```

## Language support

The default language is English, but if you want the back and front end to default to another of the available languages you need to change the default language variable in **Config.php** and **app.config.js**. If the user changes the display language, the default language will still be used for site wide logs and automatic messages.

## Developing and deploying
### Developing
In the project folder run ``npm run watch``. This will lauch a watcher that continuously build the code into the dist/.
### Deploying
In the project folder run ``npm run dist`` and the code will be minified and scrambled, a JsHint check will also be made.

The following folders should not exist in production. The bundles contains everything needed.
app/
bower_components/
node_modules/

# License
[WTFPL]

[//]: #
[WTFPL]: <http://www.wtfpl.net/>
