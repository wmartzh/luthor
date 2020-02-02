<?php
namespace App\Helpers;
use \Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ResponsesHelper{



    public static function authError(){
        return response(['errror'=>"User Unauthorized"],401);
    }
    public static function emptyField($fields){
        $errors = [];
        foreach ($fields as $field) {
            # code...

            if(!array_key_exists($field)){
               array_push($errors,[$field => 'please provide '.$field.' field']);
            }
        }

        if($errors != null){
            return response(['message'=>'The given data was invalid', 'errors'=> $errors ],400);
        }else{
            return false;
        }

    }
    public static function oneEmptyField($field){
        return response(['message'=>'The given data was invalid', 'errors'=> [$field => 'please provide '.$field.' field']  ],400);
    }
    public static function errorMessage($message){
        return response(['error'=>$message],400);
    }
    public static function customResponse($array){
        return response([$array['title']=>$array['content']],200);
    }
    public static function messageResponse($message){
        return response(['message'=>$message],200);

    }
    public static function dataResponse($data){
        return response(['data'=>$data],200);
    }






}
