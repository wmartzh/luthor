<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use League\Flysystem\Exception;


class AuthController extends Controller
{
    public function register(Request $request){

        $validateData= $request->validate([

            'nickname'=> 'required|max:55',
            'rol_id'=>'required',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);
        $validateData['password'] = bcrypt($request->password);
        $user =  User::create($validateData);

        $accessToken = $user->createToken('authToken')->accessToken;

        return response(['user'=>$user, 'access_token'=>$accessToken]);
    }

   public function login(Request $request){

        $loginData= $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        try{
            if(!auth()->attempt($loginData)){
                return response(['message'=>'Invalid Credentials']);
            }

            $accessToken = auth()->user()->createToken('authToken')->accessToken;

            return response(['user' => auth()->user(), 'access_token'=>$accessToken]);
        }
        catch(Exception $e){

            echo ($e);
        }
    }
}
