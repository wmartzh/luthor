<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
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
            $dta = \App\Event::all();

            return response()->json(['data'=>$dta,'response'=>200]);
        }catch(Exception $e){

        }
    }

    public  function getActualEvent(){

        $user_auth = Auth::user();

        if($user_auth->rol_id == 3 ||$user_auth->rol_id == 4 ){

            $actual_date = date('H');

            $limit = $actual_date + 1;


            $events = \App\Event::select('title','start_time')->get();

            $result =[];

            foreach($events as $event)  {
                 $e_time = strtotime($event['start_time']);

                 $check_date =date('H',$e_time);

                if( $check_date>= $actual_date){
                    if($check_date <= $limit){
                        array_push($result, ['title'=>$event['title'], 'start_time' =>$event['start_time']]);
                    }
                }
            }

            return response(['data'=>$result]);

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
        $data = request()->validate([
            'title'=> 'required',
            'start_time'=> 'required',
            'tolerance_present' => 'required',
            'tolerance_late' => 'required',

        ]);
        try{

            $user_auth = Auth::user();

            if($user_auth->rol_id != 4 || $user_auth->rol_id == 6){
                return response(['messge'=> 'User Unauthorized'],401);
            }else{

                $check_regs = \App\Event::select()->where('title',$data['title'])->exists();

                if(!$check_regs){ // Check if exists
                    \App\Event::create($data);
                    return response(['message'=>'Event created suscessfully'],201);
                }else{
                    return response(['message'=> $data['title'].' is already register'],400);
                }

            }


        }catch(Exception $e){
            return response()->json(['response'=> 400]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $✅ = \App\Event::findOrFail($id);
            return response()->json(['data'=>$✅],$status = 200);

        }catch(Exception $e){
         return response()->json(['message'=>'something was wrong'],$status=400);
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        $request->validate([
            'title'=> 'required',
            'start_time' => 'required',
            'tolerance_present' => 'required',
            'tolerance_late' => 'required',
        ]);


        try{
            $event->update([
                'title' => $request->title,
                'start_time' => $request->start_time,
                'tolerance_present' => $request->tolerance_present,
                'tolerance_late' => $request->tolerance_late,
            ]);

            return response()->json(['message'=> $event],$status = 200);


        }catch(Exception $e){
            return response()->json(['message'=>'something was wrong'],$status=400);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        //
        $event = \App\Event::findOrFail($id);
        $event->delete();

        return response()->json(['message'=>'OK'],$status=200);
    }
}
