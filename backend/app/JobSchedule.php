<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JobSchedule extends Model
{
    //

    protected $fillable =[
        'user_id',
        'event_id',
        
    ];

    public function users(){
        return $this->belongsTo('App\User','id','user_id');
    }
    public function events(){
        return $this->belongsTo('App\Event','id','event_id');
    }
}
