<?php

use Illuminate\Database\Seeder;

class EventTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        \App\Event::create([
            'title' => 'culto matutino',
            'start_time' => '06:00:00',
            'tolerance_present' =>'00:05:00',
            'tolerance_late' =>'00:10:00'

        ]);
        \App\Event::create([
            'title' => 'CEU',
            'start_time' => '17:00:00',
            'tolerance_present' =>'00:05:00',
            'tolerance_late' =>'00:10:00'
        ]);

    }
}
