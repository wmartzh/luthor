<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;
use League\Flysystem\Exception;

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



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vD = request()->validate([
            'title'=> 'required',
            'start_time'=> 'required'
        ]);
        try{
            \App\Event::create($vD);

            return response()->json(['response'=> 201]);

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
                'start_time' => 'required'
        ]);


        try{
            $event->update([
                'title' => $request->title,
                'start_time' => $request->start_time
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

        return response()->json(['message'=>'OK'],$status=402);
    }
}
