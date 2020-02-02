<?php

namespace App\Http\Controllers;

use App\Weekend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ResponsesHelper;
class WeekendController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response;
     */
    public function index()
    {
        //
        try{
            $auth_user = Auth::user();

            switch($auth_user->rol_id){
                case 2 :{
                    if($auth_user->is_active){
                            $data = \App\Weekend::select('id','state','vicerector','preceptor','in_date_time','out_date_time','location')
                            ->where('user_code',$auth_user->code)
                            ->orderBy('id', 'DESC')
                            ->get();
                        return ResponsesHelper::dataResponse($data);
                    }else{
                        return ResponsesHelper::erroMessage('user is not active');

                    }
                }
                case 3 :{
                    if($auth_user->is_active){
                        $data = \App\Weekend::select('id','state','vicerector','preceptor','in_date_time','out_date_time','location')
                        ->where('user_code',$auth_user->code)
                        ->orderBy('id', 'DESC')
                        ->get();
                        return ResponsesHelper::dataResponse($data);
                    }else{
                        return ResponsesHelper::errorMessage('user is not active');
                    }
                }
                case 4:{
                    $data = \App\Weekend::select('id','user_code','state','vicerector','preceptor','location','out_date_time','in_date_time','check_exit')
                    ->with(['user' => function($query){
                        $query->select('code','first_name','last_name');
                    }])
                    ->where('intership',$auth_user->intership)
                    ->orderBy('id', 'DESC')
                    ->get();

                    return ResponsesHelper::dataResponse($data);
                }
                case 6 :{
                    $data = \App\Weekend::select('id','user_code','state','vicerector','preceptor','location','out_date_time','in_date_time','check_exit')
                    ->with(['user' => function($query){
                        $query->select('code','first_name','last_name','intership');
                    }])
                    ->orderBy('id', 'DESC')
                    ->get();


                    return ResponsesHelper::dataResponse($data);

                }
                default :{
                    return ResponsesHelper::authError();
                }

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
        //
        $vD = $request->validate([
            'user_code',
            'out_date_time' => 'required',
            'in_date_time' => 'required',
            'location' => 'required',
            'intership' => 'required',
            'contact_name',
            'contact_phone'
        ]);
        try{

            if(Auth::check()){

                $user_auth = Auth::user();
                $usermodel = \App\User::findOrFail($user_auth->id);
                if($usermodel['rol_id'] != 2 && $usermodel['rol_id']!=3){
                    return ResponsesHelper::errorMessage('user can not make a request');

                }else{
                    if($user_auth->is_active){
                        if($usermodel['status'] == 'penalized'){

                            return ResponsesHelper::errorMessage('Can not process, the user is penalized');
                        }else{
                            $vD['user_code']=$usermodel['code'];
                            $search = \App\Weekend::where([['user_code',$usermodel['code']],['state','in process']])->exists();

                            if(!$search){
                                \App\Weekend::create($vD);

                                return ResponsesHelper::messageResponse('Permission requested');
                            }
                            else{
                                return ResponsesHelper::errorMessage('User already has a request in process');
                            }
                        }

                    }else{

                        return ResponsesHelper::errorMessage('user is not active');
                    }
                }
            }
        }
        catch(Exception $e){
            return response()->json(['response'=> 400]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Weekend  $weekend
     * @return \Illuminate\Http\Response
     */
    public function show($intership)
    {
        try{
            $user_auth = Auth::user();

            if($user_auth->rol_id ==6){
                $data = \App\Weekend::select('user_code','state','vicerector','preceptor','out_date_time','in_date_time','check_exit')
                ->with(['user' => function($query){
                    $query->select('code','first_name','last_name');
                }])
                ->where('intership',$intership)
                ->get();

                return ResponsesHelper::dataResponse($data);
            }

        }catch(Exception $e){
         return response()->json(['message'=>'something was wrong'],$status=400);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Weekend  $weekend
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        $data = $request->validate([
            'user_code'=> 'nullable',
            'state' =>'nullable',
            'preceptor'=> 'nullable',
            'vicerector' => 'nullable',
            'check_exit' => 'nullable',
            'message' => 'nullable'
        ]);

        try{
            $auth_user = Auth::user(); //verify auth
            //chek request

           
                //Check if the auth user is a student
                if($auth_user->rol_id == 2 || $auth_user->rol_id == 3){//Student access


                    if($auth_user->is_active){ // check if user is active

                        $weekendModel = \App\Weekend::select()->where([['user_code',$auth_user->code,['state','in process']]])->get()->first();
                        if($weekendModel != null){
                            $mdl = \App\Weekend::findOrFail($weekendModel['id']);
                        }else{
                            return response(['message'=>'no data exist',
                                             'errors' =>['user has not requests']]);

                        }

                        if($weekendModel['state'] == 'approved'){
                            return response(['message'=>'The last request was approved'],202);
                        }else if($weekendModel['state'] == 'rejected'){
                            return response(['message'=>'The last request was rejected'],202);
                        }else if($weekendModel['state'] == 'in process'){
                            if($weekendModel['vicerector']=='approved' && $weekendModel['preceptor']=='approved'){ //Check requirements
                                $data['state'] = 'approved';
                                $mdl->update($data);
                                return response(['message'=>'updated'],202);
                            }
                            else if($weekendModel['vicerector']=='approved' && $weekendModel['preceptor']=='no-def' || $weekendModel['vicerector']=='no-def' && $weekendModel['preceptor']=='approved' || $weekendModel['vicerector']=='no-def' && $weekendModel['preceptor']=='no-def'){
                                return response(['message'=>'Request in process'],202);
                            }

                            else if( $weekendModel['vicerector']=='rejected' && $weekendModel['preceptor']='rejected' ){
                                $data['state'] = 'rejected';
                                $mdl->update($data);
                                return response(['message'=>'updated'],202);
                            }
                        }else{
                            return response([
                                'message'=>'The given data was invalid',
                                'errors' => [
                                    'state' => 'the state is invalid'
                                ]
                                ],400);
                        }
                    }else{
                        return response(['message'=>'user is not active'],401);
                    }
                }else if($auth_user->rol_id == 4){//preceptor access

                    if(array_key_exists('user_code',$data)){
                        $weekendModel = \App\Weekend::select()->where([['user_code',$data['user_code']],['state','in process']])->get()->first();

                        if($weekendModel == null){
                            return response(['message'=>'no data exist',
                                'errors' =>['user has not requests']]);
                        }
                    }
                    $mdl = \App\Weekend::findOrFail($weekendModel['id']);
                    //Preceptor
                    $intership = \App\User::select('intership')->where('code',$data['user_code'])->get()->first();

                    $check_state = array_key_exists('preceptor',$data);

                    if($check_state){
                        //evaluate requests already processed

                        if($intership['intership'] == $auth_user->intership){ //check intership

                            if($weekendModel['preceptor']=='rejected'){
                                return response([
                                    'message'=>'Not found',
                                    'errors' => [
                                        'preceptor' => 'user has a rejected request'
                                    ]
                                    ],404);
                            }else if($weekendModel['preceptor']=='approved'){
                                return response([
                                    'message'=>'Not found',
                                    'errors' => [
                                        'preceptor' => 'user has a approved request'
                                    ]
                                    ],404);

                            }else if($weekendModel['preceptor']=='no-def'){

                                if($data['preceptor']=='approved'){ //Evaluate if the state is correct typed
                                    $mdl->update($data);
                                    return response(['message'=>'Acepted'],202);
                                }else if($data['preceptor']=='rejected'){
                                    $mdl->update($data);
                                    return response(['message'=>'Rejected'],202);
                                }else{
                                    return response([
                                        'message'=>'The given data was invalid',
                                        'errors' => [
                                            'state' => 'the state is invalid'
                                        ]
                                        ],400);
                                }
                            }
                        }else{
                            return response(['message'=>'invalid operation',
                                                'errors' => ['user_code'=>'Wrong intership']],401);
                        }

                    }else{
                        return response(['message'=>'The given data was invalid',
                                                'errors' => [
                                                    'preceptor' => 'preceptor value is required'
                                                ]
                                                ],400);
                    }

                } else if($auth_user->rol_id == 6){ //vicerrector access
                    if(array_key_exists('user_code',$data)){
                        $weekendModel = \App\Weekend::select()->where([['user_code',$data['user_code']],['state','in process']])->get()->first();

                        if($weekendModel == null){
                            return response(['message'=>'no data exist',
                                'errors' =>['user has not requests']]);
                        }
                    }

                    ///Vicerector
                    $mdl = \App\Weekend::findOrFail($weekendModel['id']);

                    $check_state = array_key_exists('vicerector',$data);

                    if($check_state){
                        //evaluate requests already processed

                        if($weekendModel['vicerector']=='rejected'){
                            return response([
                                'message'=>'Not found',
                                'errors' => [
                                    'preceptor' => 'user has a rejected request'
                                ]
                                ],404);
                        }else if($weekendModel['vicerector']=='approved'){
                            return response([
                                'message'=>'Not found',
                                'errors' => [
                                    'preceptor' => 'user has a approved request'
                                ]
                                ],404);

                        }else if($weekendModel['vicerector']=='no-def'){

                            if($data['vicerector']=='approved'){ //Evaluate if the state is correct typed
                                $mdl->update($data);
                                return response(['message'=>'Acepted'],202);
                            }else if($data['vicerector']=='rejected'){
                                $mdl->update($data);
                                return response(['message'=>'Rejected'],202);
                            }else{
                                return response([
                                    'message'=>'The given data was invalid',
                                    'errors' => [
                                        'state' => 'the state is invalid'
                                    ]
                                    ],400);
                            }
                        }

                    }else{
                        return response(['message'=>'The given data was invalid',
                                                'errors' => [
                                                    'vicerector' => 'vicerector value is required'
                                                ]
                                                ],400);
                    }
            }else if($auth_user->rol_id == 5){ //guard access

                if(array_key_exists('check_exit',$data)){

                    $weekendmdl = \App\Weekend::select()->where([['user_code',$data['user_code']],['state','approved']])->get()->first();
                    $user = \App\User::select('id')->where('code',$data['user_code'])->get()->first();
                    $umdl = $user = \App\User::findOrFail($user['id']);
                    $mdl = \App\Weekend::findOrFail($weekendmdl['id']);
                    if($weekendmdl != null){

                        if($data['check_exit']){
                            unset($data['output_date_time']);
                            $mdl->update($data);
                            $umdl->update(['status'=>'out']);
                            return ResponsesHelper::messageResponse('Exit checked');
                        }else{
                            $data['state'] = 'deprecated';
                            $mdl->update($data);
                            $umdl->update(['status'=>'in']);
                            return ResponsesHelper::messageResponse('Entry checked');
                        }

                    }

                }else{
                    return ResponsesHelper::oneEmptyField('check_exit');
                }


            }

        }catch(Exception $e){
            return response()->json(['message'=>'something was wrong'],$status=400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Weekend  $weekend
     * @return \Illuminate\Http\Response
     */
    public function destroy(Weekend $weekend)
    {
        //
        $penalty = \App\Weekend::findOrFail($id);
        $penalty->delete();

        return response()->json(['message'=>'OK'],$status=402);
    }

    public function recycle()
    {
        $auth_user = Auth::user();

        if($auth_user->rol_id == 2 || $auth_user->rol_id ==3){
            $weekendInf = \App\Weekend::select()->where([['user_code',$auth_user->code],['state','approved']])->get()->first();
            if($weekendInf == null){
                return response(['message'=>'Available weekends does not exist'],404);
            }else{
                $weekendModel = \App\Weekend::findOrFail($weekendInf['id']);
                $now = date("Y-m-d H:i:s");

                if($now >$weekendInf[0]['in_date_time']){ //seach weekends out of date
                    $weekendModel->update(['state'=>'deprecated']);
                    return response(['message'=>'Regs recycled']);
                }else{
                    return response(['message'=>'Thers is nothing to recycle']);
                }
            }

        }else{
            return response(['message'=>'user is not a student',404]);
        }



    }

}
