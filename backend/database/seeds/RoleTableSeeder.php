<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {



        //
        \App\Role::create([
            'name'=> 'root'
        ]);

        \App\Role::create([
            'name' => 'student'
        ]);
        \App\Role::create([
            'name' => 'monitor'
        ]);
        \App\Role::create([
            'name' => 'preceptor'
        ]);
        \App\Role::create([
            'name' => 'guard'
        ]);
        \App\Role::create([
            'name' => 'rector'
        ]);

        //User

        \App\User::create([
            'nickname' => 'paquito',
            'rol_id' => '2',
            'email' => 'paquito@mail.com',
            'password' => 'secret'
        ]);
        \App\User::create([
            'nickname' => 'juanito',
            'rol_id' => '2',
            'email' => 'juanito@mail.com',
            'password' => 'secret'
        ]);
    }
}
