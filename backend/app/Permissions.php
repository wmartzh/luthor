<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permissions extends Model
{
    //
    protected $fillable =[
        'code_user',
        'status',
        'check_exit',
        'output_date_time',
        'entry_date_time',
        'date',
        'place',
        'permissions'
    ];

    public function user(){
        return $this->hasOne('App\User','code','code_user');

    }
}
