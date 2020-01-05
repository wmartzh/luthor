<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assistance extends Model
{

    protected $fillable = [
        'user_code','monitor_id', 'event_id','status','date','time'
    ];


    public function user(){
        return $this->belongsTo(\App\User::class);

    }
    public function event(){
        return $this->belongsTo('App\Event');
    }

}
