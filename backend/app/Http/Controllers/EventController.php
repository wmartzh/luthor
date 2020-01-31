<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ResponsesHelper;

class EventController extends Controller
{

    public function index()
    {
        //
        try{
            $dta = \App\Event::all();
            return ResponsesHelper::dataResponse($dta);
        }catch(Exception $e){
        }
    }

    private  function justifyAssistance($user_auth,$event){
        $weekends = \App\Weekend::select('user_code')->where('state','approved')->get();

        if ($weekends != null){
            foreach($weekends as $weekend){
                $data=[
                    'user_code' => $weekend['user_code'],
                    'monitor_id' =>$user_auth->id,
                    'event_id' => $event,
                    'status'=> 'present',
                    'date' => date('Y-m-d'),
                    'time' => date('H:i:s'),
                    'intership' => $actual_time->intership
                ];
                \App\Assistance::create($data);

            }
        }


    }
    public  function getActualEvent(){

        $user_auth = Auth::user();

        if($user_auth->rol_id == 3 ||$user_auth->rol_id == 4 ){

            $actual_time = date('H');
            $actual_day = date('l');
            $limit = $actual_time + 1;


            $day_events = \App\Week::select('event_id')->where($actual_day,True)->get();
            $result =[];
            foreach($day_events as $day) {
                $event = \App\Event::select('id','title','start_time')->where('id',$day['event_id'])->get()->first();

                $e_time = strtotime($event['start_time']);

                 $check_date =date('H',$e_time);

                if( $check_date>= $actual_time){
                    if($check_date <= $limit){
                        array_push($result, ['id'=>$event['id'],'title'=>$event['title'], 'start_time' =>$event['start_time']]);
                        $this->justifyAssistance($user_auth,$event['id']);
                    }
                }
            }

            return response(['data'=>$result]);

        }

    }
    public function store(Request $request)
    {
        $data = request()->validate([
            'title'=> 'required',
            'start_time'=> 'required',
            'tolerance_present' => 'required',
            'tolerance_late' => 'required',
            'event_id' => 'nullable',
            'sunday' => 'nullable',
            'monday' => 'nullable',
            'tuesday' => 'nullable',
            'wednesday' => 'nullable',
            'thursday' => 'nullable',
            'friday' => 'nullable',
            'saturday' => 'nullable',

        ]);
        try{

            $user_auth = Auth::user();

            if($user_auth->rol_id != 4 || $user_auth->rol_id == 6){
                return response(['messge'=> 'User Unauthorized'],401);
            }else{

                $check_regs = \App\Event::select()->where('title',$data['title'])->exists();



                if(!$check_regs){ // Check if exists

                    \App\Event::create($data);
                    $actual_event = \App\Event::select()->where('title',$data['title'])->get()->first();

                    $data['event_id'] = $actual_event ['id'];

                    \App\Week::create($data);

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
