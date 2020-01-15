<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assistance extends Model
{

    protected $fillable = [
        'user_code','monitor_id', 'event_id','status','date','time','intership'
    ];


    public function user(){
        return $this->hasOne('App\User','code','user_code');

    }
    public function monitor(){
        return $this->HasOne('App\User','id','monitor_id');
    }
    public function event(){
        return $this->belongsTo('App\Event');
    }

}
