<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    protected $fillable = [
        'title','start_time','tolerance_present','tolerance_late','tolerance_absent'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }
}
