<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assitance extends Model
{
    //
    protected $fillable = [
        'event_id', 'status', 'date', 'time'

    ];

    public function event(){
        return $this->belongsToMany(Event::class);

    }

}
