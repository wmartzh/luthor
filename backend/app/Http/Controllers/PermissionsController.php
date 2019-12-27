<?php

namespace App\Http\Controllers;

use App\Permissions;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
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
        try{


            $data = request()->validate([
                'code_user',
                'output_date_time' => 'required',
                'date' => 'required',
                'place' => 'required',
                'status'

            ]);

            $auth_user = Auth::user();
            $usermodel = \App\User::findOrFail($auth_user->id);
            $data['code_user'] = $usermodel['code'];
            if($auth_user->rol_id != 2 && $auth_user->rol_id!= 3){
                return response()->json(['error'=> 'user can not request a permission']);
            }else{

                if($usermodel['status'] =='penalized'){//check status
                    //create reg
                    $data['status'] = 'rejected';
                    \App\Permissions::create($data);
                    return response()->json(['response'=>'Unauthorized']);


                }else if($usermodel['status']=='in'){//check status

                    //create reg

                    $data['status'] = 'active';
                    \App\Permissions::create($data);
                    $usermodel->update(['status'=>'out']); //update user status
                    return response()->json(['response'=> 'Authorized']);
                }
                else{
                    return response()->json(['response'=> 'User is out']);
                }
            }



        }catch(Exception $e){
            return response()->http_response_code(400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Permissions  $permissions
     * @return \Illuminate\Http\Response
     */
    public function show($code)
    {

         //
         try{
            $✅ = \App\Permissions::select()->where('code_user',$code)->get();
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
    public function update(Request $request)
    {
        //
        $data = $request->validate([
            'user_code'=> 'required',
            'entry_date_time',
            'status'
        ]);

        try{

            $auth_user = Auth::user();

            if($auth_user->rol_id == 5){

                $data['entry_date_time'] = date("Y-m-d H:i:s");
                $data['status']= 'deprecated';
                //Search active permissions
                $permission = \App\Permissions::select()->where([['code_user',$data['user_code']],['status','active']])->get();
                $permissionModel = \App\Permissions::findOrFail($permission[0]['id']);            //Search user
                //Search user
                $res = User::select()->where('code',$data['user_code'])->get();
                $user = $res->toArray();
                $usermodel = \App\User::findOrFail($user[0]['id']);
                //Update user and permissions status
                $usermodel->update(['status'=>'in']);
                $permissionModel->update($data);
                return response()->json(['message'=> 'accepted']);

            }else{
                return response()->json(['error'=> 'user unauthorized']);
            }





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
