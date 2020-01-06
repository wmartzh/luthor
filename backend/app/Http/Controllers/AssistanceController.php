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


                $assistances =\App\Assistance::with(
                  ['event'=>function($query){$query->select('id','title');}],

                )->with(
                    ['user'=> function($query){$query->select('code','first_name','last_name');}]
                )
                ->where('user_code',$auth_user->code)->select('user_code','date','time','event_id')->get();

                return response(['data'=>$assistances],200);



            }else if($auth_user->rol_id == 4 || $auth_user->rol_id == 6){
                $assistances =\App\Assistance::with(['event' => function($query){
                    $query->select('id','title');
                }])->select('user_code','date','time','event_id')->get();
                return response(['data'=>$assistances],200);
            }else{
                return response(['message'=>'user Unauthorized'],401);
            }


        } catch(Exception $e){
            return response()->json(['message'=>'something was wrong'],$status=400);
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
            'time'
        ]);
        try {

            //Check if user can access
            $user = Auth::user();
            if($user->rol_id ==3 || $user->rol_id == 4 || $user->rol_id ==6){


                $data['monitor_id']= $user->id; // get user that check the assistance
                date_default_timezone_set("America/Costa_Rica");
                $data['time'] = date('H:i:s');    //"06:17:00";
                $event = \App\Event::select()->where('id',$data['event_id'])->get()->first();

                $time_check = strtotime($event['start_time'])+600; //present  5 min
                $time_check2 = strtotime($event['start_time'])+1000; //late 10 min

                $data['date'] = date("Y-m-d");

                $same_assistance = \App\Assistance::select()->where([['user_code',$data['user_code']],['date',date('Y-m-d')]])->get()->first();

                /**
                 * Check if there are more than one try to take assistance
                 * Disable develop only
                 *        |
                 *        |
                 *        V
                 */

                // if($same_assistance == null){

                // }else{

                // }


                if(strtotime($data['time']) <= $time_check){
                    $data['status']='present';

                    \App\Assistance::create($data);
                    return response()->json(['message'=>'Assistance checked']);


                }else if(strtotime($data['time']) > $time_check && strtotime($data['time']) < $time_check2){
                    $data['status']='late';
                    \App\Assistance::create($data);
                    return response()->json(['message'=>'Assistance checked']);
                }else {
                    $data['status']='absent';
                    \App\Assistance::create($data);
                    return response()->json(['message'=>'Assistance checked']);

                }

            }else{
                return response()->json(['error'=>'user unauthorized']);
            }
        } catch (Exception $e) {

            return response()->json(['error'=>$e]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $assistance = \App\Assistance::findOrFail($id);
        $assistance->delete();

        return response()->json(['message'=>'OK'],$status=402);
    }
}
