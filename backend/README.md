#  Luthor Project Backend

This is a backend of the project.
**API Requests Available**

![availible requests](https://i.ibb.co/3cwC89c/request-v1.jpg)

[Watch api details](https://documenter.getpostman.com/view/8214440/SWEB3w8w)


To run the backend you will need the database name

database_name: db_luthor

To request data run the next commads

## Installation

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

###  Server Start
```
php artisan serve
```

# Changes by F34th3R
* CORS middleware
    - New composer package was installed, more info More info on [CORS Middleware for Laravel](https://github.com/fruitcake/laravel-cors#configuration)
     
* AuthController
    - `login` was updated, just the response
    ```php
    return response()->json([
        'username' => Auth::user()->nickname,
        'code' => Auth::user()->code,
        'status' => Auth::user()->status,
        'token' => Auth::user()->rol_id.$tokenResult // the role will be embedded into the token for security
    ]);
    ```

* In Permissions_table
    - The field `output_date_time` was change it to `nullable`. This change is because, when the student role is creating a permission, the client just going to pass `place, and the current date`
    ```
    PermissionsController.php Line 64
    ```
