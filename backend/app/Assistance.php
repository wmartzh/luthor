<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assistance extends Model
{

    protected $fillable = [
        'user_code','monitor_id', 'event_id','status','date','time'
    ];
    public function users(){
        return $this->belongsToMany(User::class);

    }
}
