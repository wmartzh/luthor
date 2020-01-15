<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Assistance;
class AssistanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $auth_user = Auth::user();

            if($auth_user->rol_id == 2  || $auth_user->rol_id == 3 ){

                $data = \App\Assistance::select('monitor_id','event_id','status','date','time')
                ->where('user_code',$auth_user->code)
                ->with(['event'=> function($query){
                    $query->select('id','title');
                }])
                ->with(['monitor' => function($query){
                    $query->select('id','first_name','last_name');
                }])
                ->orderBy('date','desc')->get();

                return response(['data'=>$data],200);
            }else if($auth_user->rol_id == 4){

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

                return response(['data'=>$data],200);
            }
            else if($auth_user->rol_id == 6){

                return response(['message'=> 'Invalid action', 'errors' => ['urlParameter'=> 'please select intership']],400);


            }
            else{
                return response(['message'=>'user Unauthorized'],401);
            }


        } catch(Exception $e){
            return response(['message'=>'something was wrong'],500);
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

            //Check if user can access
            $user = Auth::user();
            if($user->rol_id ==3 || $user->rol_id == 4 || $user->rol_id ==6){


                $data['monitor_id']= $user->id; // get user that check the assistance

                date_default_timezone_set("America/Costa_Rica");
                $data['time'] = date('H:i:s');    //"06:17:00";
                $event = \App\Event::select()->where('id',$data['event_id'])->get()->first();

                $intership = \App\User::select('intership')->where('code',$data['user_code'])->get()->first();

                $time_check = strtotime($event['start_time'])+600; //present  5 min
                $time_check2 = strtotime($event['start_time'])+1000; //late 10 min

                $data['date'] = date("Y-m-d");
                $data['intership'] = $user->intership; //intership control

                /// use when the user was checked
                $same_assistance = \App\Assistance::select()->where([['user_code',$data['user_code']],['date',$data['date']],['event_id',$data['event_id']]])->exists();

                /**
                 * Check if there are more than one try to take assistance
                 * Disable to develop only
                 *        |
                 *        |
                 *        V
                 */

                if($intership['intership'] == $user->intership){ //intership control


                    if($same_assistance == false){ //assistance check
                        if(strtotime($data['time']) <= $time_check){
                            $data['status']='present';
                            $data['intership'] = $user->intership; //intership control
                            \App\Assistance::create($data);
                            return response()->json(['message'=>'Assistance checked']);


                        }else if(strtotime($data['time']) > $time_check && strtotime($data['time']) < $time_check2){
                            $data['status']='late';
                            $data['intership'] = $user->intership; //intership control
                            \App\Assistance::create($data);
                            return response()->json(['message'=>'Assistance checked']);
                        }else {
                            $data['status']='absent';
                            $data['intership'] = $user->intership; //intership control
                            \App\Assistance::create($data);
                            return response()->json(['message'=>'Assistance checked']);

                        }

                    }else{

                        return response(['message'=> 'Bad request',
                                    'errors'=> ['user_code'=>'user is already checked']],400);
                    }

                }else{

                    return response(['message' => 'Invalid operation',
                                    'errors' => ['user_code' => 'wrong intership']],401);

                }





            }else{
                return response(['errors'=>['user'=>'user unauthorized']],401);
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
