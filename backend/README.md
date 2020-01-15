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
## Commit d9f10e8af2aa2f68ff4e6b396426506d22f78937
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
    ```bash
    PermissionsController.php Line 64
    ```

## Commit last 8e18df6b0d04a67bdf16d74074d20aa90b6f49b8
* Assistance table
    ```php
    $table->foreign('monitor_id')
        ->references('id')
        ->on('users')
        ->onDelete('cascade');
    ```
    ```bash
    Line 36
    - $table->foreign('monitor_id')
    + $table->foreign('monitor_id')
    ```
* Assistance Model
    ```php
    public function monitor()
    {
        return $this->belongsTo('App\User');
    }
    ```
* AssistanceController
    ```bash
    Line 27
    - ['user'=> function($query){$query->select('code','first_name','last_name');}]
    + ['monitor'=> function($query){$query->select('id','first_name');}]
    ```
    ```bash
    Line 29
    - ->where('user_code',$auth_user->code)->select('user_code','date','time','event_id')->get();
    + ->where('user_code',$auth_user->code)->select('date','time', 'status','event_id', 'monitor_id')->orderBy('id', 'DESC')->get
    ```
* PermissionsController
    ```bash
    Line 27
    'status'
    ```
    ```bash
    Line 31
    - 'place')->where('code_user',$user_auth->code)->get();
    + 'place')->where('code_user',$user_auth->code)->orderBy('id', 'DESC')->get();
    ```
