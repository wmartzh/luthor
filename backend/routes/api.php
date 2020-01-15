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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Register and login routes
Route::post('/register','Api\AuthController@register');
Route::post('/login','Api\AuthController@login');
Route::post('/logout','Api\AuthController@logout')->middleware('auth:api');


Route::group(['middleware'  =>  ['auth:api']], function () {

    ///Students
    Route::group(['prefix'  =>  '/students'], function () {
        Route::get('/','UserController@index');
        Route::get('/{code}','UsersController@show');
        Route::put('/','UsersController@update');
        Route::delete('/{id}','UsersController@destroy');
    });
    ///Permissions Routes
    Route::group(['prefix'  =>  '/permissions'], function () {
        Route::get('/','PermissionsController@index');
        Route::get('/{code}','PermissionsController@show');
        Route::post('/','PermissionsController@store');
        Route::put('/','PermissionsController@update');
        Route::delete('/{id}','PermissionsController@destroy');
    });

      ///Weekend Routes
      Route::group(['prefix'  =>  '/weekends'], function () {
        Route::get('/','WeekendController@index');
        Route::get('/{id}','WeekendController@show');
        Route::post('/','WeekendController@store');
        Route::put('/','WeekendController@update');
        Route::put('/recycle/','WeekendController@recycle');
        Route::delete('/{id}','WeekendController@destroy');
    });
    ///Penalty Routes
    Route::group(['prefix'  =>  '/penalties'], function () {
        Route::get('/','PenaltyController@index');
        Route::get('/{code}','PenaltyController@show');
        Route::post('/','PenaltyController@store');
        Route::put('/','PenaltyController@update');
        Route::delete('/{id}','PenaltyController@destroy');

    });

    ///Assitances Routes
    Route::group(['prefix'  =>  '/assistance'], function () {
        Route::post('/','AssistanceController@store');
        Route::get('/','AssistanceController@index');

    });
    ///Event Routes
    Route::group(['prefix'  =>  '/events'], function () {
        Route::get('/','EventController@index');
        Route::get('/{id}','EventController@show');
        Route::post('/','EventController@store');
        Route::put('/{event}','EventController@update');
        Route::delete('/{id}','EventController@destroy');
    });
    ///Alterts Routes
    Route::group(['prefix'  =>  '/alerts'], function () {
        Route::get('/','AlertController@index');
        Route::get('/{id}','AlertController@show');
        Route::post('/','AlertController@store');
        Route::put('/{alert}','AlertController@update');
        Route::delete('/{id}','AlertController@destroy');
    });





 });














Route::get('test/','TestsController@test')->middleware('auth:api');
