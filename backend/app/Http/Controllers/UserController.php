<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use \Illuminate\Http\Response;
use App\Helpers\ResponsesHelper;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $auth_user = Auth::user();

        if($auth_user->rol_id == 2){

            return ResponsesHelper::authError();
        }else if($auth_user->rol_id == 3){
            $data  = \App\User::select('code',
             'first_name',
             'last_name')->where([['intership',$auth_user->intership],['rol_id',2],['is_active',true],['status','in']])
            ->orWhere([['intership',$auth_user->intership],['rol_id',2],['is_active',true],['status','penalized']])
            ->orWhere([['intership',$auth_user->intership],['rol_id',3],['is_active',true],['status','in'],['code','!=',$auth_user->code]])
            ->orWhere([['intership',$auth_user->intership],['rol_id',3],['is_active',true],['status','penalized'],['code','!=',$auth_user->code]])

            ->orderBy('id', 'DESC')
            ->get();
            return response(['data'=>$data],200);
        }else if($auth_user->rol_id == 4){

             $data  = \App\User::select('code',
             'status',
             'first_name',
             'profile_image',
             'last_name',
             'phone_number')->where([['intership',$auth_user->intership],['rol_id',2],['is_active',true]])
            ->orWhere([['intership',$auth_user->intership],['rol_id',3],['is_active',true]])
            ->orderBy('id', 'DESC')
            ->get();


            return response(['data'=>$data],200);
        }
        else if($auth_user->rol_id == 6 ){


            $data  = \App\User::select('code',
             'status',
             'first_name',
             'profile_image',
             'last_name',
             'phone_number')->where([['rol_id',2],['is_active',true]])
            ->orWhere([['rol_id',3],['is_active',true]])
            ->orderBy('id', 'DESC')
            ->get();
            return response(['data'=>$data],200);
        }

    }
    public function filterStudents($filterBy){

        $auth_user = Auth::user();

        if($auth_user->rol_id == 4){

            switch($filterBy){

                case 'actives':{
                    $data  = \App\User::select('code','status','first_name','last_name','phone_number')->where([['intership',$auth_user->intership],['rol_id',2],['is_active',true]])
                    ->orWhere([['intership',$auth_user->intership],['rol_id',3],['is_active',true]])
                    ->get();
                    return response(['data'=>$data],200);
                }
                case 'inactives':{
                    $data  = \App\User::select('code','status','first_name','last_name','phone_number')->where([['intership',$auth_user->intership],['rol_id',2],['is_active',false]])
                    ->orWhere([['intership',$auth_user->intership],['rol_id',3],['is_active',false]])
                    ->get();
                    return response(['data'=>$data],200);
                }
                case 'penalized':{
                    $data  = \App\User::select('code','status','first_name','last_name','phone_number')->where([['intership',$auth_user->intership],['rol_id',2],['status','penalized']])
                    ->orWhere([['intership',$auth_user->intership],['rol_id',3],['status','penalized']])
                    ->get();
                    return response(['data'=>$data],200);
                }
                case 'out':{
                    $data  = \App\User::select('code','status','first_name','last_name','phone_number')->where([['intership',$auth_user->intership],['rol_id',2],['status','out']])
                    ->orWhere([['intership',$auth_user->intership],['rol_id',3],['status','out']])
                    ->get();
                    return response(['data'=>$data],200);
                }
                case 'indicators':{
                    $student_out = \App\User::select()->where([['intership',$auth_user->intership],['is_active',true],['status','out']])->get();
                    $assitance = \App\Assistance::select()->where([['intership',$auth_user->intership],['date',date('Y-m-d')]])->get();
                    $penalties = \App\Penalty::select()->where([['intership',$auth_user->intership],['active',true]])->get();

                    return response(['data'=>['students_out'=> count($student_out), 'assitance'=> count($assitance),'penalties'=> count($penalties)]],200);
                }
                case 'studentCodeName':{
                    $data  = \App\User::select('code','first_name','last_name')->where([['intership',$auth_user->intership],['rol_id',2],['is_active',true],['status','!=','penalized']])
                    ->orWhere([['intership',$auth_user->intership],['rol_id',3],['is_active',true],['status','!=','penalized']])
                    ->orderBy('first_name', 'ASC')
                    ->get();
                    return response(['data'=>$data],200);
                }

                default:{
                    return response(['message'=>'Parameter not established'],200);
                }

            }


        }else if($auth_user->rol_id == 6){

            switch($filterBy){

                case 'actives':{
                    $data  = \App\User::select('code','status','first_name','last_name','phone_number')->where('is_active',true)
                    ->get();
                    return response(['data'=>$data],200);
                }
                case 'inactives':{
                    $data  = \App\User::select('code','status','first_name','last_name','phone_number')->where('is_active',false)
                    ->get();
                    return response(['data'=>$data],200);
                }
                case 'penalized':{
                    $data  = \App\User::select('code','status','first_name','last_name','phone_number')->where('status','penalized')
                    ->get();
                    return response(['data'=>$data],200);
                }
                case'out':{
                    $data  = \App\User::select('code','status','first_name','last_name','phone_number')->where('status','out')
                    ->get();
                    return response(['data'=>$data],200);

                }
                case 'indicators':{
                    $student_out = \App\User::select()->where([['is_active',true],['status','out']])->get();
                    $assitance = \App\Assistance::select()->where([['date',date('Y-m-d')]])->get();
                    $penalties = \App\Penalty::select()->where([['active',true]])->get();

                    return response(['data'=>['students_out'=> count($student_out), 'assitance'=> count($assitance),'penalties'=> count($penalties)]],200);
                }
                case 'studentCodeName':{
                    $data  = \App\User::select('code','first_name','last_name')->where([['rol_id',2],['is_active',true],['status','!=','penalized']])
                    ->orWhere([['rol_id',3],['is_active',true],['status','!=','penalized']])
                    ->orderBy('first_name', 'ASC')
                    ->get();
                    return response(['data'=>$data],200);
                }

                default:{
                    return response(['message'=>'Parameter not established'],200);
                }

            }

        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($intership)
    {
        //
        $auth_user = Auth::user();
        if($auth_user->rol_id == 6 ){

            $data  = \App\User::select('code','status','first_name','last_name','phone_number')
            ->where([['intership',$intership],['rol_id',2]])
            ->orWhere([['intership',$intership],['rol_id',3]])
            ->get();

            return response(['data'=>$data],200);

        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //Users update information

        $auth_user = Auth::user();
        $data = $request->validate([

            'profile_image'=>'nullable',
            'username'=>'nullable',
            'first_name'=>'nullable',
            'last_name'=>'nullable',
            'phone_number'=>'nullable',
            'is_active' => 'nullable',
            'code' => 'nullable'

        ]);

        if($auth_user->rol_id == 3 || $auth_user->rol_id == 2){



            $m_user = \App\User::findOrFail($auth_user->id);

            if(array_key_exists('profile_image',$data)){

                if(!$auth_user->profile_image == null){
                    $filename = explode('/',$m_user->profile_image);
                    Storage::disk('public')->delete('avatars/'.$filename);
                }
                $path = $request->file('profile_image')->store('avatars',['disk'=>'public']);
                $data['profile_image'] = '/storage/'.$path;

            }

            $m_user->update($data);
            $m_user->save();
            return response(['data'=>$m_user],200);


        }else if($auth_user->rol_id == 4){

            if(array_key_exists('is_active', $data)){

                if(array_key_exists('code',$data)){

                    $check_student = \App\User::select('id','intership')->where('code',$data['code'])->get()->first();

                    if($check_student['intership']==$auth_user->intership){

                        $m_user = \App\User::findOrFail($check_student['id']);
                        $m_user->update($data);
                        $m_user->save();
                        return response(['message'=> 'User changed to '.$data['is_active']],200);

                    }else{
                        return response([
                            'message'=>'The given data was invalid',
                            'errors' => [
                                'code' => 'wrong intership'
                            ]
                            ],400);
                    }

                }else{
                    return response([
                        'message'=>'The given data was invalid',
                        'errors' => [
                            'code' => 'please provide student code'
                        ]
                        ],400);
                }

            }else{
                return response([
                    'message'=>'The given data was invalid',
                    'errors' => [
                        'is_active' => 'state not provided'
                    ]
                    ],400);

            }

        }else if ($auth_user->rol_id ==6){
            if(array_key_exists('is_active', $data)){

                if(array_key_exists('code',$data)){

                    $check_student = \App\User::select('id')->where('code',$data['code'])->get()->first();
                    $m_user = \App\User::findOrFail($check_student['id']);
                    $m_user->update($data);
                    $m_user->save();
                    return response(['message'=> 'User changed to '.$data['is_active']],200);


                }else{
                    return response([
                        'message'=>'The given data was invalid',
                        'errors' => [
                            'code' => 'please provide student code'
                        ]
                        ],400);
                }

            }else{
                return response([
                        'message'=>'The given data was invalid',
                            'errors' => [
                                'is_active' => 'state not provided'
                            ]
                    ],400);
            }
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
