<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    //

    protected $fillable = [
        'user_id','destination','dest','code','content','intership','created_at','updated_at'
    ];

    public function user(){
        return $this->HasOne('App\User','id','user_id');
    }
}

