<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Register and login routes
Route::post('/register','Api\AuthController@register');
Route::post('/login','Api\AuthController@login');



// Route::group(['middleware'  =>  ['auth:api']], function () {

///Event Routes
    Route::group(['prefix'  =>  '/events'], function () {
        Route::get('/','EventController@index');
        Route::get('/{id}','EventController@show');
        Route::post('/','EventController@store');
        Route::put('/{event}','EventController@update');
        Route::delete('/{id}','EventController@destroy');
    });
// });

///Penalty Routes
Route::group(['prefix'  =>  '/penalties'], function () {
    Route::get('/','PenaltyController@index');
    Route::get('/{id}','PenaltyController@show');
    Route::post('/','PenaltyController@store');
    Route::put('/{penalty}','PenaltyController@update');
    Route::delete('/{id}','PenaltyController@destroy');
});
// });

///Permissions Routes
Route::group(['prefix'  =>  '/permissions'], function () {
    Route::get('/','PermissionsController@index');
    Route::get('/{id}','PermissionsController@show');
    Route::post('/','PermissionsController@store');
    Route::put('/{permissions}','PermissionsController@update');
    Route::delete('/{id}','PermissionsController@destroy');
});
// });

///Alterts Routes
Route::group(['prefix'  =>  '/alerts'], function () {
    Route::get('/','AlertController@index');
    Route::get('/{id}','AlertController@show');
    Route::post('/','AlertController@store');
    Route::put('/{alert}','AlertController@update');
    Route::delete('/{id}','AlertController@destroy');
});
// });

///Assitance Routes
Route::group(['prefix'  =>  '/assistance'], function () {
    Route::get('/','AssitanceController@index');
    Route::get('/{id}','AssitanceController@show');
    Route::post('/','AssitanceController@store');
    Route::put('/{assitance}','AssitanceController@update');
    Route::delete('/{id}','AssitanceController@destroy');
});
// });

///Weekend Routes
Route::group(['prefix'  =>  '/weekends'], function () {
    Route::get('/','WeekendController@index');
    Route::get('/{id}','WeekendController@show');
    Route::post('/','WeekendController@store');
    Route::put('/{weekend}','WeekendController@update');
    Route::delete('/{id}','WeekendController@destroy');
});
// });


Route::get('test/{event}','EventController@index');
