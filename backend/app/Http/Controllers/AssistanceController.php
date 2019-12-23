<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AssistanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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

                $data['monitor_id']= $user->id;
                date_default_timezone_set("America/Costa_Rica");
                $data['time'] =  date('H:i:s');    //"06:17:00";
                $extratime = 30;
                $event = \App\Event::select()->where('id',$data['event_id'])->get()->first();
               
                $time_check = strtotime($event[0]['start_time'])+600;
                $time_check2 = strtotime($event[0]['start_time'])+1000;

                if(strtotime($data['time']) <= $time_check){
                    $data['status']='present';
                    $data['date'] = date("Y-m-d");

                    \App\Assistance::create($data);
                    return response()->json(['message'=>'Assistance checked']);


                }else if(strtotime($data['time']) > $time_check && strtotime($data['time']) < $time_check2){
                    $data['status']='late';
                    $data['date'] = date("Y-m-d");

                    \App\Assistance::create($data);
                    return response()->json(['message'=>'Assistance checked']);
                }else {
                    $data['status']='absent';
                    $data['date'] = date("Y-m-d");
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
