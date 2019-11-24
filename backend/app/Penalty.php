<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Penalty extends Model
{
    //
    protected $fillable = [
        'user_id'
    ];

    public function users(){

        return $this->hasMany(User::class);

    }
}
