<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    //

    protected $fillable = [
        'user_id','destination_id','msg'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
