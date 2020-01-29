<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Weekend extends Model
{
    //

    protected $fillable = [
        'user_code','check_exit','state','preceptor','vicerector','out_date_time','in_date_time','location','message','intership'
    ];


    public function user(){
        return $this->hasOne('App\User','code','user_code');
    }
}
