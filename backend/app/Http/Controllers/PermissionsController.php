<?php

namespace App\Http\Controllers;

use App\Permissions;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
class PermissionsController extends Controller
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

            if(Auth::check()){

                $user_auth = Auth::user();

                if($user_auth->rol_id == 2 || $user_auth->rol_id == 3 ){ //student access
                    $p_data = \App\Permissions::select('id',
                    'status',
                    'output_date_time',
                    'entry_date_time',
                    'date',
                    'place')->where('code_user',$user_auth->code)->orderBy('id', 'DESC')->get();
                    return response(['data'=>$p_data],200);
                }else if($user_auth->rol_id == 4) /// Preceptor acces
                {
                    $data = \App\Permissions::select(
                        'code_user',
                        'status',
                        'output_date_time',
                        'place',
                    )
                    ->with(['user'=> function($query){
                        $query->select('code','first_name','last_name','status');
                    }])
                    ->where('intership',$user_auth->intership)
                    ->orderBy('code_user','asc')
                    ->get()
                    ;
                    return response(['data'=>$data],200);

                }else if($user_auth->rol_id == 6){ // vicerector accesss
                    return response(['message'=> 'Invalid action', 'errors' => ['urlParameter'=> 'please select intership']],400);

                }
                else if($user_auth->rol_id == 5){

                    $normal = \App\Permissions::select(
                        'code_user',
                        'status',
                        'check_exit'
                    )
                    ->with(['user'=> function($query){
                        $query->select('code','first_name','last_name',);
                    }])
                    ->orderBy('code_user','asc')
                    ->get();

                    $weekend= \App\Weekend::select('user_code','state','check_exit')
                    ->with(['user' => function($query){
                        $query->select('code','first_name','last_name',);

                    }])
                    ->get();

                    return response(['data'=> ['normal'=> $normal,'weekend'=> $weekend]]);


                }
            }else{
                return response(['message'=>'Unauthenticated'],400);

            }

        }catch(Exception $e){
            return response($e,500);
        }
    }

    public function getPermissionsNumber(){
        try{
            $auth_user = Auth::user();

            if($auth_user->rol_id == 4 ){

                $data = \App\Permissions::select()->where([['intership',$auth_user->intership],['status' ,'active']])->get();

                return response(['total'=> count($data)],200);

            }else if($auth_user->rol_id == 6){
                $data = \App\Permissions::select()->where('status','active')->get();

                return response(['total'=> count($data)],200);
            }

        }catch(Exception $e){

        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{


            $data = request()->validate([
                'code_user',
                'output_date_time',
                'date' => 'required',
                'place' => 'required',
                'status',
                'intership'

            ]);

            $auth_user = Auth::user();
            $usermodel = \App\User::findOrFail($auth_user->id);
            $data['code_user'] = $usermodel['code'];
            $data['intership'] = $auth_user->intership; //intership control
            if($auth_user->rol_id != 2 && $auth_user->rol_id!= 3){
                return response()->json(['error'=> 'user can not request a permission']);
            }else{

                $a_permission = \App\Permissions::select()->where([['code_user',$data['code_user']],['status','active']])->get()->first();
                if($a_permission == null ){
                    if($usermodel['status'] =='penalized'){//check status
                        //create reg
                        $data['status'] = 'rejected';
                        \App\Permissions::create($data);
                        return response(['response'=>'Unauthorized']);


                    }else if($usermodel['status']=='in'){//check status

                        //create reg

                        $data['status'] = 'active';
                        \App\Permissions::create($data);
                        return response(['response'=> 'Authorized']);
                    }
                    else{
                        return response(['response'=> 'user has already a request']);
                    }

                }else{
                    return response(['message'=>'User has already permission request'],400);
                }
            }



        }catch(Exception $e){
            return response()->http_response_code(400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Permissions  $permissions
     * @return \Illuminate\Http\Response
     */
    public function show($intership)
    {

         //
         try{

            $auth_user = Auth::user();

            if($auth_user->rol_id == 6){
                $data = \App\Permissions::select(
                    'code_user',
                    'status',
                    'output_date_time',
                    'entry_date_time',
                    'date',
                    'place'
                )
                ->with(['user'=> function($query){
                    $query->select('code','first_name','last_name','status');
                }])
                ->where('intership',$intership)
                ->orderBy('date', 'desc')
                ->get()

                ;
                return response(['data'=> $data],200);
            }


        }catch(Exception $e){
         return response()->json(['message'=>'something was wrong'],$status=400);
        }

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Permissions  $permissions
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        $data = $request->validate([
            'user_code'=> 'required',
            'check_exit'=>'nullable',
            'entry_date_time',
            'status'

        ]);

        try{

            $auth_user = Auth::user();

            if($auth_user->rol_id == 5){

                //Search active permissions
                $permission = \App\Permissions::select()->where([['code_user',$data['user_code']],['status','active']])->get()->first();

                if($permission != null){
                    $permissionModel = \App\Permissions::findOrFail($permission['id']);            //Search user
                    //Search user
                    $res = User::select()->where('code',$data['user_code'])->get()->first();
                    $usermodel = \App\User::findOrFail($res['id']);

                    if(array_key_exists('check_exit',$data)){


                        if(!$data['check_exit']){//check entry
                            $data['entry_date_time'] = date("Y-m-d H:i:s");
                            $data['status']= 'deprecated';
                            //Update user and permissions status
                            $usermodel->update(['status'=>'in']);
                            $permissionModel->update($data);
                            return response(['message'=> 'accepted'],200);

                        }else{//check exit
                            //Update user and permissions status
                            $usermodel->update(['status'=>'out']);
                            $permissionModel->update($data);
                            return response(['message'=> 'accepted'],200);
                        }

                    }else{
                        return response(['message'=>'The given data was invalid',
                                                    'errors' => [
                                                        'check_exit' => 'check_exit value is required'
                                                    ]
                                                    ],400);
                    }

                }else{
                    return response(['message'=> 'user has not active permissions'],204);
                }




            }else{
                return response(['error'=> 'user unauthorized'],401);
            }





        }catch(Exception $e){
            return response(['message'=>'something was wrong'],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Permissions  $permissions
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $permissions = \App\Permissions::findOrFail($id);
        $permissions->delete();

        return response(['message'=>'OK'],200);
    }
}
