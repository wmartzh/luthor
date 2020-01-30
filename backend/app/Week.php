<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Week extends Model
{
    //

    protected $fillable = [

        'event_id',
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'

    ];

    public function event(){
        return $this->hasOne('App\Event','id','event_id');
    }
}
