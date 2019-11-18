<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Weekend extends Model
{
    //

    protected $fillable = [
        'user_id','out_date_time','in_date_time','string'
    ];


    public function users(){
        return $this->belongsToMany(User::class);
    }
}
