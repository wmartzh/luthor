<?php

namespace App\Http\Controllers;

use App\Penalty;
use Illuminate\Http\Request;

class PenaltyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $dta = \App\Penalty::all();

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
            'user_code'=> 'required',
            'active'
        ]);



        try{
            $res = \App\User::select()->where('code',$vD['user_code'])->get();
            $user = $res->toArray();
            $usermodel = \App\User::findOrFail($user[0]['id']);

            if($user[0]['status']=='penalized'){
                return response()->json(['message'=>'the user now is penalized']);
            }else if($user[0]['status'] == 'out'){
                $usermodel->update(['status'=>'penalized']);
                $vD['active'] = true;
                \App\Penalty::create($vD);
                return response()->json(['message'=>'user penalized']);

            }else if($user[0]['status']=='in' || $user[0]['status'] == 'out'){

                $usermodel->update(['status'=>'penalized']);
                $vD['active'] = true;
                \App\Penalty::create($vD);
                return response()->json(['message'=>'user penalized']);

            }





        }catch(Exception $e){
            return response()->json(['response'=> 400]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Penalty  $penalty
     * @return \Illuminate\Http\Response
     */
    public function show($code)
    {
        //
        try{
            $penalties = \App\Penalty::select()->where('user_code',$code)->get();
            $penaltiesActive = $penalties->toArray();
            return response()->json(['data'=>$penaltiesActive]);

        }catch(Exception $e){
         return response()->json(['message'=>'something was wrong'],$status=400);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Penalty  $penalty
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'user_code'=> 'required',
            'active'
        ]);
        try{
            //get active penalties
            $penalties = \App\Penalty::select()->where([['user_code',$data['user_code']],['active',true]])->get();
            $penaltiesActive = $penalties->toArray();

            if($penaltiesActive[0]['active']==false){ //check if active penalties exists
                return response()->json(['message'=>'user has not active penalties']);

            }else if($penaltiesActive[0]['active']==true){

                //obtain user and penalty info
                $res = \App\User::select()->where('code',$data['user_code'])->get();
                $user = $res->toArray();
                $usermodel = \App\User::findOrFail($user[0]['id']);
                $penalty = \App\Penalty::findOrFail($penaltiesActive[0]['id']);

                //update data
                $data['active']=false;
                $usermodel->update(['status','in']);
                $penalty->update($data);

                return response()->json(['message'=>'penalty removed']);
            }


        }catch(Exception $e){
            return response()->json(['message'=>'something was wrong'],$status=400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Penalty  $penalty
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $penalty = \App\Penalty::findOrFail($id);
        $penalty->delete();

        return response()->json(['message'=>'OK'],$status=402);
    }
}
