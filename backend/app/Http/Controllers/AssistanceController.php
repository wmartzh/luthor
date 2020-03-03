<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Assistance;
use App\Helpers\ResponsesHelper;
use App\Helpers\TakeAssistanceHelper;
class AssistanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        try {

            $auth_user = Auth::user();

            switch($auth_user->rol_id){

                case 2:{ ## Student

                    if($auth_user->is_active){

                        $data = \App\Assistance::select('id','monitor_id','event_id','status','date','time')
                        ->where('user_code',$auth_user->code)
                        ->with(['event'=> function($query){
                            $query->select('id','title');
                        }])
                        ->with(['monitor' => function($query){
                            $query->select('id','first_name','last_name');
                        }])
                        ->orderBy('id','desc')->get();

                        return ResponsesHelper::dataResponse($data);

                    }else{
                        return ResponsesHelper::errorMessage('user is not active');

                    }

                }
                case 3:{ ## Monitor

                    if($auth_user->is_active){

                        $data = \App\Assistance::select('id','monitor_id','event_id','status','date','time')
                        ->where('user_code',$auth_user->code)
                        ->with(['event'=> function($query){
                            $query->select('id','title');
                        }])
                        ->with(['monitor' => function($query){
                            $query->select('id','first_name','last_name');
                        }])
                        ->orderBy('id','desc')->get();

                        return ResponsesHelper::dataResponse($data);

                    }else{
                        return ResponsesHelper::errorMessage('user is not active');

                    }

                }
                case 4:{ ## Preceptor

                    $data = \App\Assistance::select('user_code','monitor_id','event_id','status','date','time')
                    ->where('intership',$auth_user->intership)
                    ->with(['user'=>function($query){
                        $query->select('code','first_name','last_name');
                    }])
                    ->with(['event'=> function($query){
                        $query->select('id','title');
                    }])
                    ->with(['monitor' => function($query){
                        $query->select('id','first_name','last_name');
                    }])
                    ->where('intership',$auth_user->intership)
                    ->orderBy('date','desc')->get();

                    return ResponsesHelper::dataResponse($data);

                }
                case 6:{ ## Vicerector
                    $boys = \App\Assistance::select('user_code','monitor_id','event_id','status','time','intership')
                        ->with(['user' => function($query){
                            $query->select('code','first_name','last_name');
                        }])
                        ->with(['monitor'=> function($query){
                            $query->select('id','first_name','last_name');
                        }])
                        ->with(['event'=> function($query){
                            $query->select('id','title','start_time');
                        }])
                        ->where('intership','boys')
                        ->orderBy('user_code','asc')
                        ->get();

                    $girls = \App\Assistance::select('user_code','monitor_id','event_id','status','time','intership')
                        ->with(['user' => function($query){
                            $query->select('code','first_name','last_name');
                        }])
                        ->with(['monitor'=> function($query){
                            $query->select('id','first_name','last_name');
                        }])
                        ->with(['event'=> function($query){
                            $query->select('id','title','start_time');
                        }])
                        ->where('intership','girls')
                        ->orderBy('user_code','asc')
                        ->get();


                    return response(['data'=>['boys'=>$boys,'girls'=>$girls]]);
                }

                default:{
                    return ResponsesHelper::authError();
                }
            }

        } catch(Exception $e){
            return response(['message'=>'something was wrong'],500);
        }
    }

    public function filter($param){

        $user_auth = Auth::user();

        switch($param){

            case "today":{

                switch($user_auth->rol_id){

                    case 4:{

                        $data = \App\Assistance::select('id','monitor_id','event_id','status','date','time')
                        ->where([['intership', $user_auth->intership],['date',date('Y-m-d')]])
                        ->with(['event'=> function($query){
                            $query->select('id','title');
                        }])
                        ->with(['monitor' => function($query){
                            $query->select('id','first_name','last_name');
                        }])
                        ->orderBy('id','desc')->get();

                        return ResponsesHelper::dataResponse($data);

                    }
                    case 6:{
                        $boys = \App\Assistance::select('id','monitor_id','event_id','status','date','time')
                        ->where([['intership', 'boys'],['date',date('Y-m-d')]])
                        ->with(['event'=> function($query){
                            $query->select('id','title');
                        }])
                        ->with(['monitor' => function($query){
                            $query->select('id','first_name','last_name');
                        }])
                        ->orderBy('id','desc')->get();
                        $girls = \App\Assistance::select('id','monitor_id','event_id','status','date','time')
                        ->where([['intership', 'girls'],['date',date('Y-m-d')]])
                        ->with(['event'=> function($query){
                            $query->select('id','title');
                        }])
                        ->with(['monitor' => function($query){
                            $query->select('id','first_name','last_name');
                        }])
                        ->orderBy('id','desc')->get();

                        $data =[ $boys,$girls];

                        return ResponsesHelper::dataResponse($data);

                    }

                    default:{
                        return ResponsesHelper::authError();
                    }
                }

            }

            default:{
                return ResponsesHelper::errorMessage('Parameter not defined');
            }
        }

    }

    public function getByEvent($event){
        $auth_user = Auth::user();

        switch($auth_user->rol_id){

            case 2:{ ## student
                if($auth_user->is_active){

                    $data = \App\Assistance::select('id','monitor_id','event_id','status','date','time')
                    ->where([['user_code',$auth_user->code],['event_id',$event]])
                    ->with(['event'=> function($query){
                        $query->select('id','title');
                    }])
                    ->with(['monitor' => function($query){
                        $query->select('id','first_name','last_name');
                    }])
                    ->orderBy('id','desc')->get();

                    return ResponsesHelper::dataResponse($data);

                }else{
                    return ResponsesHelper::errorMessage('user is not active');

                }

            }
            case 3:{ ## monitor
                if($auth_user->is_active){

                    $data = \App\Assistance::select('id','monitor_id','event_id','status','date','time')
                    ->where([['user_code',$auth_user->code],['event_id',$event],['date',date('Y-m-d')]])
                    ->with(['event'=> function($query){
                        $query->select('id','title');
                    }])
                    ->with(['monitor' => function($query){
                        $query->select('id','first_name','last_name');
                    }])
                    ->orderBy('id','desc')->get();

                    return ResponsesHelper::dataResponse($data);

                }else{
                    return ResponsesHelper::errorMessage('user is not active');

                }

            }

            case 4:{ ##Preceptor

                $data = \App\Assistance::select('user_code','monitor_id','event_id','status','date','time')
                ->with(['user'=>function($query){
                    $query->select('code','first_name','last_name');
                }])
                ->with(['event'=> function($query){
                    $query->select('id','title');
                }])
                ->with(['monitor' => function($query){
                    $query->select('id','first_name','last_name');
                }])
                ->where([['event_id',$event],['intership',$auth_user->intership]])
                ->orderBy('date','desc')->get();

                return ResponsesHelper::dataResponse($data);

            }

            case 6:{ ## Vicerector

                $boys = \App\Assistance::select('user_code','monitor_id','event_id','status','date','time')

                ->with(['user'=>function($query){
                    $query->select('code','first_name','last_name');
                }])
                ->with(['event'=> function($query){
                    $query->select('id','title');
                }])
                ->with(['monitor' => function($query){
                    $query->select('id','first_name','last_name');
                }])
                ->where([['event_id',$event],['intership','boys']])
                ->orderBy('date','desc')->get();

                $girls = \App\Assistance::select('user_code','monitor_id','event_id','status','date','time')

                ->with(['user'=>function($query){
                    $query->select('code','first_name','last_name');
                }])
                ->with(['event'=> function($query){
                    $query->select('id','title');
                }])
                ->with(['monitor' => function($query){
                    $query->select('id','first_name','last_name');
                }])
                ->where([['event_id',$event],['intership','girls']])
                ->orderBy('date','desc')->get();

                return response(['data'=>['boys'=>$boys,'girls'=>$girls]]);

            }

            default:{
                return ResponsesHelper::authError();
            }

        }
        if($auth_user->rol_id == 4){


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
        //data definition

        $data = $request->validate([
            'user_code'=>'required',
            'event_id'=> 'required',
            'monitor_id',
            'status',
            'date',
            'time',
            'intership'
        ]);
        try {

            date_default_timezone_set("America/Costa_Rica");

            //Check if user can access
            $user = Auth::user();
            $roles = [
                'monitor' => 3,
                'preceptor' => 4
            ];
            $event = \App\Event::select()->where('id',$data['event_id'])->get()->first();
            $intership = \App\User::select('intership')->where('code',$data['user_code'])->get()->first();
            $present =  TakeAssistanceHelper::setPresentTime($event);
            $late =  TakeAssistanceHelper::setLateTime($event);
            $data['monitor_id'] = $user->id;
            $data['intership'] = $user->intership;
            $data['time'] =   date('H:i:s');
            $data['date'] = date("Y-m-d");


            switch($user->rol_id){
                case $roles['monitor']:{

                    if( $intership['intership'] == $user->intership){
                        if(!TakeAssistanceHelper::assistancesExists($data)){
                            if(strtotime($data['time']) <= $present){
                                $data['status']='present';
                                $data['intership'] = $user->intership; //intership control
                                \App\Assistance::create($data);
                                return ResponsesHelper::messageResponse('Assistance checked');

                            }else if(strtotime($data['time']) > $present && strtotime($data['time']) < $late){
                                $data['status']='late';
                                $data['intership'] = $user->intership; //intership control
                                \App\Assistance::create($data);
                                return ResponsesHelper::messageResponse('Assistance checked');
                            }else {
                                $data['status']='absent';
                                $data['intership'] = $user->intership; //intership control
                                \App\Assistance::create($data);
                                return ResponsesHelper::messageResponse('Assistance checked');
                            }
                        }
                        else{
                            return ResponsesHelper::errorMessage("user is already checked");
                        }
                    }else{
                        return ResponsesHelper::errorMessage("Intership does not match");
                    }




                }
                case $roles['preceptor']:{

                    if( $intership['intership'] == $user->intership){

                        if(!TakeAssistanceHelper::assistancesExists($data)){
                            if(strtotime($data['time']) <= $present){
                                $data['status']='present';
                                \App\Assistance::create($data);
                                return ResponsesHelper::messageResponse('Assistance checked');

                            }else if(strtotime($data['time']) > $present && strtotime($data['time']) < $late){
                                $data['status']='late';
                                \App\Assistance::create($data);
                                return ResponsesHelper::messageResponse('Assistance checked');
                            }else {
                                $data['status']='absent';
                                \App\Assistance::create($data);
                                return ResponsesHelper::messageResponse('Assistance checked');
                            }
                        }
                        else{
                            return ResponsesHelper::errorMessage("user is already checked");
                        }

                    }else{
                        return ResponsesHelper::errorMessage("Intership does not match");
                    }
                }
                default:{
                    return ResponsesHelper::authError();
                }
            }

        } catch (Exception $e) {

            return response(['message'=>'something was wrong'],500);
        }

    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($intership)
    {
        $auth_user = Auth::user();


        if($auth_user->rol_id == 6){

            $data = \App\Assistance::select('user_code','monitor_id','event_id','status','time','intership')
            ->with(['user' => function($query){
                $query->select('code','first_name','last_name');
            }])
            ->with(['monitor'=> function($query){
                $query->select('id','first_name','last_name');
            }])
            ->with(['event'=> function($query){
                $query->select('id','title','start_time');
            }])
            ->where('intership',$intership)
            ->orderBy('user_code','asc')
            ->get();

            return response(['data'=>$data],200);

        }else{
            return response(['errors'=>['user'=>'user unauthorized']],401);

        }
    }

    public function destroy($id)
    {
        $assistance = \App\Assistance::findOrFail($id);
        $assistance->delete();

        return response(['message'=>'OK'],200);
    }
}
