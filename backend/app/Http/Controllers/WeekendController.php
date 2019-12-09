<?php

namespace App\Http\Controllers;

use App\Weekend;
use Illuminate\Http\Request;

class WeekendController extends Controller
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
            $dta = \App\Weekend::all();

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
        //
        $vD = request()->validate([
            'user_id'=> 'required',
            'out_date_time',
            'in_date_time',
            'location'
        ]);
        try{
            \App\Weekend::create($vD);

            return response()->json(['response'=> 201]);

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
    public function show($id)
    {
        try{
            $✅ = \App\Weekend::findOrFail($id);
            return response()->json(['data'=>$✅],$status = 200);

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
    public function update(Request $request, Weekend $weekend)
    {
        //
        $data = $request->validate([
            'user_id'=> 'required',
            'out_date_time',
            'in_date_time',
            'location'
        ]);


        try{
            $penalty->update($data);

            return response()->json(['message'=> $penalty],$status = 200);


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
}
