<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        //User

        \App\User::create([
            'nickname' => 'paquito',
            'rol_id' => '2',
            'code'=>'160049',
            'email' => 'paquito@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'juanito',
            'rol_id' => '2',
            'code'=>'160050',
            'email' => 'juanito@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'pedrito',
            'rol_id' => '3',
            'code'=>'160060',
            'email' => 'pedrito@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'jaimito',
            'rol_id' => '5',
            'email' => 'jaimito@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'Cristian',
            'rol_id' => '4',
            'email' => 'cristian@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'Scot',
            'rol_id' => '6',
            'email' => 'scot@mail.com',
            'password' => bcrypt('secret')
        ]);
    }
}
