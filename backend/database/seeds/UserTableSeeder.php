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
            'username' => 'paquito',
            'rol_id' => '2',
            'first_name' =>'Paquito',
            'last_name' => 'Fernandez',
            'code'=>'160049',
            'email' => 'paquito@mail.com',
            'password' => bcrypt('secret'),
            'intership' => 'boys',
            'is_active' => true
        ]);
        \App\User::create([
            'username' => 'juanito',
            'rol_id' => '2',
            'first_name' =>'Juanito',
            'last_name' => 'Hernandez',
            'code'=>'160050',
            'email' => 'juanito@mail.com',
            'password' => bcrypt('secret'),
            'intership' => 'boys',
            'is_active' => true
        ]);
        \App\User::create([
            'username' => 'andres',
            'rol_id' => '2',
            'first_name' =>'andres',
            'last_name' => 'Hernandez',
            'code'=>'160032',
            'email' => 'adress@mail.com',
            'password' => bcrypt('secret'),
            'intership' => 'boys',
            'is_active' => true,
            'has_job' => true,

        ]);

        \App\User::create([
            'username' => 'paquita',
            'rol_id' => '2',
            'first_name' =>'Paquita',
            'last_name' => 'Fernandez',
            'code'=>'160048',
            'email' => 'paquita@mail.com',
            'password' => bcrypt('secret'),
            'intership' => 'girls',
            'is_active' => true
        ]);
        \App\User::create([
            'username' => 'juanita',
            'rol_id' => '2',
            'first_name' =>'Juanita',
            'last_name' => 'Hernandez',
            'code'=>'160030',
            'email' => 'juanita@mail.com',
            'password' => bcrypt('secret'),
            'intership' => 'girls',
            'is_active' => true
        ]);

        \App\User::create([
            'username' => 'pedrito',
            'rol_id' => '3',
            'first_name' =>'Pedrito',
            'last_name' => 'Fernandez',
            'code'=>'160060',
            'email' => 'pedrito@mail.com',
            'password' => bcrypt('secret'),
            'intership' => 'boys',
            'is_active' => true
        ]);
        \App\User::create([
            'username' => 'pedrita',
            'rol_id' => '3',
            'first_name' =>'Pedrita',
            'last_name' => 'Fernandez',
            'code'=>'160090',
            'email' => 'pedrita@mail.com',
            'password' => bcrypt('secret'),
            'intership' => 'girls',
            'is_active' => true
        ]);
        \App\User::create([
            'username' => 'jaimito',
            'code'=>'00001',
            'rol_id' => '5',
            'email' => 'jaimito@mail.com',
            'password' => bcrypt('secret')
        ]);
        \App\User::create([
            'username' => 'Cristian',
            'rol_id' => '4',
            'code'=>'00002',
            'email' => 'cristian@mail.com',
            'password' => bcrypt('secret'),
            'intership' => 'boys'
        ]);
        \App\User::create([
            'username' => 'Cristina',
            'rol_id' => '4',
            'code'=>'00022',
            'email' => 'cristina@mail.com',
            'password' => bcrypt('secret'),
            'intership' => 'girls'
        ]);
        \App\User::create([
            'username' => 'Scot',
            'rol_id' => '6',
            'code'=>'000003',
            'email' => 'scot@mail.com',
            'password' => bcrypt('secret')
        ]);
    }
}
