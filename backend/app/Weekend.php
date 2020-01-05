<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Weekend extends Model
{
    //

    protected $fillable = [
        'user_code','check_exit','state','preceptor','vicerector','out_date_time','in_date_time','location','message'
    ];


    public function user(){
        return $this->belongsTo('App\User','foreign_key');
    }
}
