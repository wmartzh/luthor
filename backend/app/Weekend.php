<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Weekend extends Model
{
    //

    protected $fillable = [
        'user_code','state','preceptor','vicerector','out_date_time','in_date_time','location'
    ];


    public function users(){
        return $this->belongsToMany(User::class);
    }
}
