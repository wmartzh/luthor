<?php

namespace App\Http\Controllers;

use App\Permissions;
use Illuminate\Http\Request;

class PermissionsController extends Controller
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
            $dta = \App\Permissions::all();

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
            'user_id' => 'required',
            'status',
            'output_date_time' => 'required',
            'entry_date_time'=> 'required',
            'date' => 'required',
            'place' => 'required'

        ]);
        try{
            \App\Permissions::create($vD);

            return response()->json(['response'=> 201]);

        }catch(Exception $e){
            return response()->json(['response'=> 400]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Permissions  $permissions
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

         //
         try{
            $✅ = \App\Permissions::findOrFail($id);
            return response()->json(['data'=>$✅],$status = 200);

        }catch(Exception $e){
         return response()->json(['message'=>'something was wrong'],$status=400);
        }

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Permissions  $permissions
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permissions $permissions)
    {
        //
        $data = $request->validate([
            'user_id' => 'required',
            'status',
            'output_date_time' => 'required',
            'entry_date_time'=> 'required',
            'date' => 'required',
            'place' => 'required'
        ]);


        try{
            $permissions->update($data);

            return response()->json(['message'=> $permissions],$status = 200);


        }catch(Exception $e){
            return response()->json(['message'=>'something was wrong'],$status=400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Permissions  $permissions
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $permissions = \App\Permissions::findOrFail($id);
        $permissions->delete();

        return response()->json(['message'=>'OK'],$status=402);
    }
}
