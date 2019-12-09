<?php

namespace App\Http\Controllers;

use App\Assitance;
use Illuminate\Http\Request;

class AssitanceController extends Controller
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
            $dta = \App\Assitance ::all();

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
            'event_id' => 'required',
            'status' => 'required',
            'date' => 'required',
            'time' => 'required'
        ]);
        try{
            \App\Assitance::create($vD);

            return response()->json(['response'=> 201]);

        }catch(Exception $e){
            return response()->json(['response'=> 400]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Assitance  $assitance
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        {
            //
            try{
                $✅ = \App\Assitance::findOrFail($id);
                return response()->json(['data'=>$✅],$status = 200);

            }catch(Exception $e){
             return response()->json(['message'=>'something was wrong'],$status=400);
            }
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Assitance  $assitance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Assitance $assitance)
    {
        //
        $data = request()->validate([
            'user_id'=> 'required',
            'event_id' => 'required',
            'status' => 'required',
            'date' => 'required',
            'time' => 'required'
        ]);

        try{
            $assitance->update($data);

            return response()->json(['message'=> $assitance],$status = 200);


        }catch(Exception $e){
            return response()->json(['message'=>'something was wrong'],$status=400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Assitance  $assitance
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $assitance = \App\Assitance::findOrFail($id);
        $assitance->delete();

        return response()->json(['message'=>'OK'],$status=402);
    }
}
