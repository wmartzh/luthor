<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Penalty extends Model
{
    //
    protected $fillable = [
        'user_code','active'
    ];

    public function users(){

        return $this->hasMany(User::class);

    }
}
