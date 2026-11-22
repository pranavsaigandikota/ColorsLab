FROM php:8.3-apache
RUN docker-php-ext-install mysqli
COPY public/ /var/www/html/
COPY api/ /var/www/html/LAMPAPI/
COPY tests/support/config.php /var/www/html/LAMPAPI/config.php
