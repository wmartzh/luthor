<?php

namespace App\Http\Controllers;

use App\Penalty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $data = request()->validate([
            'user_code'=> 'required',
            'active'
        ]);



        try{

            $auth_user = Auth::user();

            //check rol id --- only rector and preceptor can access
            if($auth_user->rol_id == 2 || $auth_user->rol_id == 3 || $auth_user->rol_id == 5){
                return response(['message'=>'user can not access'],401);
            }else{
                $req = \App\User::select()->where('code',$data['user_code'])->get()->first();
                $student = \App\User::findOrFail($req['id']);
                //Check if user is already penalized

                if($student['status'] == 'penalized'){
                    return response(['message'=>'user is already penalized'],409);
                }else{
                    $data['active']= true;
                    $student->update(['status'=>'penalized']);
                    \App\Penalty::create($data);
                    return response(['message'=>'user penalized'],201);
                }

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

            $auth_user = Auth::user();

            //check rol id --- only rector and preceptor can access
            if($auth_user->rol_id == 2 || $auth_user->rol_id == 3 || $auth_user->rol_id == 5){

                return response(['message'=>'user cant access'],401);
            }else{
                $penalty_active = \App\Penalty::select()->where([['user_code',$data['user_code']],['active',true]])->get()->first();
                if($penalty_active==null){
                    return response(['message'=>'user has not active penalties'],404);
                }else{
                    $p_mdl = \App\Penalty::findOrFail($penalty_active['id']);
                    $user = \App\User::select()->where('code',$data['user_code'])->get()->first();
                    $u_mdl = \App\User::findOrFail($user['id']);

                    //check if there are active penalties
                    $data['active'] = false;
                    $p_mdl->update($data);
                    $u_mdl->update(['status'=>'in']);
                    return response(['message'=>'Penalty removed'],200);


                }
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
