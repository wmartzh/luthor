<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permissions extends Model
{
    //
    protected $fillable =[
        'user_id','destination_id','description'
    ];

    public function users(){
        return $this->belongsToMany(User::class);

    }
}
