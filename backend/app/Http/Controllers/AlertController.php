<?php

namespace App\Http\Controllers;

use App\Alert;
use Illuminate\Http\Request;
use \Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AlertController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        try{

            $auth_user = Auth::user();

            if($auth_user->rol_id ==2){
                $data = \App\Alert::select('user_id','content','created_at')
                ->with(['user'=> function($query){
                    $query->select('id','username');
                }])
                ->where([['destination','students'],['intership',$auth_user->intership]])
                ->orderBy('created_at','desc')
                ->get()
                ;

                return response(['data'=> $data]);

            }else if($auth_user->rol_id ==3){

                $data = \App\Alert::select('user_id','content','created_at')
                ->with(['user'=> function($query){
                    $query->select('id','username');
                }])
                ->where('dest',$auth_user->id)
                ->orWhere([['destination','students'],['intership',$auth_user->intership]])
                ->orderBy('created_at','desc')
                ->get()
                ;

                return response(['data'=> $data]);

            }else if($auth_user->rol_id==4){

                $data = \App\Alert::select('user_id','content','created_at')
                ->with(['user'=> function($query){
                    $query->select('id','username');
                }])
                ->where([['destination','preceptor'],['intership', $auth_user->intership]])
                ->orderBy('created_at','desc')->get()
                ;
                return response(['data'=> $data]);

            }



        }catch(Exception $e){

        }
    }

    public function store(Request $request)
    {
        //
        $data = $request->validate([
            'user_id',
            'dest'=>'nullable',
            'intership'=>'nullable',
            'destination' => 'nullable',
            'code' => 'nullable',
            'content' => 'required'
        ]);
        $auth_user = Auth::user();
        try{
            $data['intership'] = $auth_user->intership;
            $data['user_id'] = $auth_user->id;

            if($auth_user->rol_id == 3){

                $data['destination'] = 'preceptor';
                \App\Alert::create($data);
                return response(['message'=>'Alert sent'],201);

            }else if($auth_user->rol_id == 4){

                $check = array_key_exists('code',$data);

                if($check){ //For someone

                    $check_student = \App\User::select('intership','id')->where('code',$data['code'])->get()->first();

                    if($check_student['intership'] == $auth_user->intership){
                        $data['dest'] = $check_student['id'];
                        $data['destination'] = 'monitor';
                        \App\Alert::create($data);
                        return response(['message'=>'Alert sent'],201);
                    }else{
                        return response(['message'=> 'Bad request',
                        'errors'=> ['code'=>'wrong intership']],400);
                    }

                }else{ // for all

                    $data['user_id'] = $auth_user->id;
                    $data['destination'] = 'students';
                    \App\Alert::create($data);
                    return response(['message'=>'Alert sent'],201);
                }
            }





        }catch(Exception $e){
            return response([''],500);
        }
    }




    public function destroy($id)
    {
        //
        $alert = \App\Alert::findOrFail($id);
        $alert->delete();

        return response()->json(['message'=>'OK'],$status=402);
    }
}
