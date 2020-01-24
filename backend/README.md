#  Luthor Project Backend

  

This is a backend of the project.

## API Requests Available

[Watch api details](https://documenter.getpostman.com/view/8214440/SWEB3w8w)

  

### New Requests
```
/students/filter/{parameter}
```
#####  valid parameters
**rol id 4**
```
actives = get active students
inactives = get inactive students
penalized = get penalized students
```

  ## Database config

To run the backend you will need the database name
```
database_name: db_luthor
```

# run commands

  

###  Installation

  

###  Composer install

```

composer install

```

  

###  Config ENV

Example

```

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=db_luthor

DB_USERNAME=root

DB_PASSWORD=

```

  

###  Config CORS

```

php artisan vendor:publish --tag="cors"

```

More info on [CORS Middleware for Laravel](https://github.com/fruitcake/laravel-cors#configuration)

  

###  Run migrations and seeders

```

php artisan migrate --seed

```

  

###  Install passport

```

php artisan passport:install

```

  

###  Generate laravel keys

```

php artisan key:generate

```

  

###  Server Start

```

php artisan serve

```

  

#  Changes by F34th3R
