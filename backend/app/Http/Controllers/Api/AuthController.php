<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;



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



        return response(['user'=>$user]);
    }

   public function login(Request $request){

        $loginData= $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        try{
            if(!Auth::attempt($loginData)){
                return response()->json(['message'=>'Invalid Credentials'], 401);
            }
            $user = Auth::user();
            $tokenResult = $user->createToken('Personal Access')-> accessToken;

            return response()->json([
                'username' => Auth::user()->nickname,
                'code' => Auth::user()->code,
                'status' => Auth::user()->status,
                'token' => Auth::user()->rol_id.$tokenResult // the role will be embedded into the token for security
            ]);
        }
        catch(Exception $e){

            echo ($e);
        }
    }
    public function logout(Request $request){
        if(Auth::check()){

            $user = Auth::user();
            $user->token()->revoke();

            return response()->json([
                'message' => 'Logged out'
            ]);
        }else{
            return response()->json([
                'message' => 'User not exist'
            ]);

        }



    }
}
