<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permissions extends Model
{
    //
    protected $fillable =[
        'user_id',
        'status',
        'output_date_time',
        'entry_date_time',
        'date',
        'place'
    ];

    public function users(){
        return $this->belongsToMany(User::class);

    }
}
