<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $auth_user = Auth::user();

        if($auth_user->rol_id == 2 || $auth_user->rol_id == 3){

             return response(['message'=>'User unauthorized'],401);

        }else if($auth_user->rol_id == 4){

             $data  = \App\User::select('code','status','first_name','last_name','phone_number')->where([['intership',$auth_user->intership],['rol_id',2]])
            ->orWhere([['intership',$auth_user->intership],['rol_id',3]])
            ->get();

            return response(['data'=>$data],200);
        }
        else if($auth_user->rol_id == 6 ){

                return response(['message'=> 'Invalid action', 'errors' => ['urlParameter'=> 'please select intership']],400);

        }

    }
    public function getStatus(){
         try{

            $auth_user = Auth::user();

            if($auth_user->rol_id == 3 ||$auth_user->rol_id == 2){

                return  response(['status'=>$auth_user->status],200);
            }
            else{
                return response(['message'=> 'User unauthorized'],401);
            }


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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($intership)
    {
        //
        $auth_user = Auth::user();
        if($auth_user->rol_id == 6 ){

            $data  = \App\User::select('code','status','first_name','last_name','phone_number')
            ->where([['intership',$intership],['rol_id',2]])
            ->orWhere([['intership',$intership],['rol_id',3]])
            ->get();

            return response(['data'=>$data],200);

        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
