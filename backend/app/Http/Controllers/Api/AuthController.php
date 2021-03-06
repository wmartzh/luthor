<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Storage;


class AuthController extends Controller
{
    public function register(Request $request){

        $data= $request->validate([

            'code'=> 'required|required|unique:users',
            'rol_id',
            'profile_image' => 'nullable',
            'username'=>'required',
            'first_name'=>'required',
            'last_name'=>'required',
            'gender' => 'required',
            'intership',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        if($data['gender'] == 'F' || $data['gender'] == 'f' || $data['gender'] == 'Female' || $data['gender'] == 'female'){

            if(array_key_exists('profile_image',$data) && $data['profile_image']!=null){
                $path = $request->file('profile_image')->store('avatars',['disk'=>'public']);
                $data['profile_image'] = '/storage/'.$path;

            }else{
                $data['profile_image'] = '/storage/avatars/default_profile_f.png';
            }
            $data['gender'] = 'F';
            $data['intership'] = 'girls';
            $data['password'] = bcrypt($request->password);
            $data['rol_id'] = 2;
            $user =  User::create($data);
            return response(['message' => 'created'],201);

        }else if ($data['gender']=='M'|| $data['gender']=='m' || $data['gender'] == 'Male' || $data['gender'] == 'male'){
            if(array_key_exists('profile_image',$data)&& $data['profile_image']!=null){
                $path = $request->file('profile_image')->store('avatars',['disk'=>'public']);
                $data['profile_image'] = '/storage/'.$path;

            }else{
                $data['profile_image'] = '/storage/avatars/default_profile_m.png';
            }
            $data['gender'] = 'M';
            $data['intership'] = 'boys';
            $data['password'] = bcrypt($request->password);
            $data['rol_id'] = 2;
            $user =  User::create($data);
            return response(['message' => 'created'],201);


        }else{
            return response(['message' => 'Invalid data',
                                    'errors' => ['gender' => 'incorrect selection']],401);
        }


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
                'username' => Auth::user()->username,
                'profile_image' => Auth::user()->profile_image,
                'code' => Auth::user()->code,
                'status' => Auth::user()->status,
                'intership'=> Auth::user()->intership,
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
