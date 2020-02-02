# Luthor Project Backend

This is a backend of the project.

## API Requests Available

[Watch api details](https://documenter.getpostman.com/view/8214440/SWEB3w8w)

### New Requests

```
/students/filter/{parameter} [get]
```

##### valid parameters

**only rol id 4**

```
actives = get active students
inactives = get inactive students
penalized = get penalized students
out = get out students
indicators = get indicators students out, today assistance, students penalized
```

```
/students/block-all   [post]
```

##### valid parameters

**only rol id 4**

```
block = 0/1 
        0 = false
        1 = true
```

```
/students/   [post]
```

##### valid parameters

**available to rol id 4 and 6 **

```
is_active = 0/1            : set if student is active
code    = code_studen      : student code
```

```
/alerts/   [get]
```

##### valid parameters

**available to rol id 4 and 3**

```
no parameter needed
```

```
/alerts/   [post]
```

##### valid parameters

**available to rol id 4 and 3**

```
preceptor params
    content  : content alert
    code     : student to sent alert, can be nullable if the alert is for all students

monitor params
    content  : content alert
```

```
/actual-event/   [get]
```

##### valid parameters

**available to rol id 4 and 3**

```
     Get  events of the last  hour
```

## Database config

To run the backend you will need the database name

```
database_name: db_luthor
```

# run commands

### Installation

### Composer install

```

composer install
```

### Config ENV

Example

```

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=db_luthor

DB_USERNAME=root

DB_PASSWORD=
```

### Config CORS

```

php artisan vendor:publish --tag="cors"
```

More info on [CORS Middleware for Laravel](https://github.com/fruitcake/laravel-cors#configuration)

### Run migrations and seeders

```

php artisan migrate --seed
```

### Install passport

```

php artisan passport:install
```

### Generate laravel keys

```

php artisan key:generate
```

### Server Start

```

php artisan serve
```

# Changes by F34th3R



```

```


