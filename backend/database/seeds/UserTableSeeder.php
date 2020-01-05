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
            'first_name' =>'Paquito',
            'last_name' => 'Fernandez',
            'code'=>'160049',
            'email' => 'paquito@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'juanito',
            'rol_id' => '2',
            'first_name' =>'Juanito',
            'last_name' => 'Hernandez',
            'code'=>'160050',
            'email' => 'juanito@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'pedrito',
            'rol_id' => '3',
            'first_name' =>'Pedrito',
            'last_name' => 'Fernandez',
            'code'=>'160060',
            'email' => 'pedrito@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'jaimito',
            'code'=>'00001',
            'rol_id' => '5',
            'email' => 'jaimito@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'Cristian',
            'rol_id' => '4',
            'code'=>'00002',
            'email' => 'cristian@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'nickname' => 'Scot',
            'rol_id' => '6',
            'code'=>'000003',
            'email' => 'scot@mail.com',
            'password' => bcrypt('secret')
        ]);
    }
}
