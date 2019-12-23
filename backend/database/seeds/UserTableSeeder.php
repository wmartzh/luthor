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
            'nickname' => 'jaimito',
            'rol_id' => '5',
            'email' => 'jaimito@mail.com',
            'password' => bcrypt('secret')
        ]);
    }
}
