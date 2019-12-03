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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Assitance  $assitance
     * @return \Illuminate\Http\Response
     */
    public function show(Assitance $assitance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Assitance  $assitance
     * @return \Illuminate\Http\Response
     */
    public function edit(Assitance $assitance)
    {
        //
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Assitance  $assitance
     * @return \Illuminate\Http\Response
     */
    public function destroy(Assitance $assitance)
    {
        //
    }
}
