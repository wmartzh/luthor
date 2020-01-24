<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Penalty extends Model
{
    //
    protected $fillable = [
        'user_code','active','reason','intership','conclusion'
    ];

    public function user(){

        return $this->hasOne('App\User','code','user_code');

    }
}
