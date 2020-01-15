<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assistance extends Model
{

    protected $fillable = [
        'user_code','monitor_id', 'event_id','status','date','time'
    ];


    public function user(){
        return $this->hasOne('App\User','code','user_code');
    }
    public function monitor()
    {
        return $this->belongsTo('App\User');
    }
    public function event(){
        return $this->belongsTo('App\Event');
    }

}
