<?php

namespace App\Http\Controllers;

use App\Weekend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class WeekendController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response;
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
        $vD = $request->validate([
            'user_code',
            'out_date_time' => 'required',
            'in_date_time' => 'required',
            'location' => 'required'
        ]);
        try{

            if(Auth::check()){

                $user_auth = Auth::user();
                $usermodel = \App\User::findOrFail($user_auth->id);
                if($usermodel['rol_id'] != 2 && $usermodel['rol_id']!=3){
                    return response()->json(['error'=>'user can not make a request']);
                }else{
                    if($usermodel['status'] == 'penalized'){
                        return response()->json(['message'=> 'Can not process, the user is penalized']);
                    }else{
                        $vD['user_code']=$usermodel['code'];
                        $search = \App\Weekend::where([['user_code',$usermodel['code']],['state','in process']])->exists();

                        if(!$search){

                            \App\Weekend::create($vD);
                            return response()->json(['message'=>'Permission requested']);
                        }
                        else{
                            return response()->json(['message'=>'User already has a request in process']);
                        }
                    }


                }

            }





            //Search user



            if($user[0]['status']=='penalized'){
                return response()->json(['message'=> 'Can not process, the user is penalized']);
            }else{


            }




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
    public function update(Request $request)
    {
        //
        $data = $request->validate([
            'user_code'=> 'required',
            'state'=> 'required'
        ]);

        try{

            $weekendInf = \App\Weekend::select()->where([['user_code',$data['user_code']],['state','in process']])->get();
            $weekendModel = \App\Weekend::findOrFail($weekendInf[0]['id']);
            $weekendModel->update($data);

            if($data['state']=='aproved'){
                return response()-json(['message'=>'Request approved']);
            }else if($data['state']=='rejected'){
                return response()-json(['message'=>'Request denied']);
            }



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

    public function recycle($code)
    {
        $weekendInf = \App\Weekend::select()->where([['user_code',$code],['state','aproved']])->get();
        $weekendModel = \App\Weekend::findOrFail($weekendInf[0]['id']);
        $now = date("Y-m-d H:i:s");

        if($now >$weekendInf[0]['in_date_time']){ //seach weekends out of date
            $weekendModel->update(['state'=>'deprecated']);
            return response()->json(['message'=>'Regs recycled']);
        }else{
            return response()->json(['message'=>'Thers is nothing to recycle']);
        }



    }
}
