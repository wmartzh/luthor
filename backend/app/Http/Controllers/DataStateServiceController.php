<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use \Illuminate\Http\Response;
use App\Helpers\ResponsesHelper;

class DataStateServiceController extends Controller
{
    //All updates data

    private function updateWeekendStatus($auth_user){

        $exist = \App\Weekend::select()->where([['user_code',$auth_user->code],['state','in process']])->exists();
        $weekendModel = \App\Weekend::select()->where([['user_code',$auth_user->code],['state','in process']])->get()->first();


        if($exist){
            $mdl = \App\Weekend::findOrFail($weekendModel['id']);
           
            if($weekendModel['state'] == 'in process'){

                if($weekendModel['vicerector']=='approved' && $weekendModel['preceptor']=='approved'){ //Check requirements
                    $data['state'] = 'approved';
                    $mdl->update($data);
                }
                else if( $weekendModel['vicerector']=='rejected' && $weekendModel['preceptor']='rejected' ){
                    $data['state'] = 'rejected';
                    $mdl->update($data);
                }
            }
        }

    }

    private function autoPenalize($auth_user){

        $assistances = \App\Assistance::select('status','date')->where('user_code',$auth_user->code)->get();
        $existPenalties = \App\Penalty::select()->where([['user_code',$auth_user->code],['active',true]])->exists();
        $userModel = \App\User::findOrFail($auth_user->id);
        $penalty  = [
            'user_code' => $auth_user->code,
            'active' => true,
            'reason' => 'Absences limit exceeded',
            'intership' => $auth_user->intership,
            'conclusion' => date('Y-m-d', strtotime(date('Y-m-d'). ' + 6 day'))
        ];
        $today = date('Y-m-d');
        $absentCount = 0;
        ##check if user has active penalties
        if(!$existPenalties){

            switch(date('l')){

                case 'Wednesday':{
                    $min = date('Y-m-d', strtotime(date('Y-m-d'). ' - 4 day'));

                    foreach($assistances as $assistance){
                        if(date('Y-m-d',strtotime($assistance['date']))>= $min){
                            if(date('Y-m-d',strtotime($assistance['date']))<= $today){
                                if($assistance['status']== 'absent'){
                                    $absentCount++;
                                }
                            }
                        }
                    }
                    if($absentCount == 3){
                        \App\Penalty::create($penalty);
                        $userModel->update(['status'=>'penalized']);
                    }
                }
                case 'Thursday':{
                    $min = date('Y-m-d', strtotime(date('Y-m-d'). ' - 5 day'));

                    foreach($assistances as $assistance){
                        if(date('Y-m-d',strtotime($assistance['date']))>= $min){
                            if(date('Y-m-d',strtotime($assistance['date']))<= $today){
                                if($assistance['status']== 'absent'){
                                    $absentCount++;
                                }
                            }
                        }
                    }
                    if($absentCount == 3){
                        \App\Penalty::create($penalty);
                        $userModel->update(['status'=>'penalized']);
                    }
                }
                case 'Friday':{
                    $min = date('Y-m-d', strtotime(date('Y-m-d'). ' - 6 day'));

                    foreach($assistances as $assistance){
                        if(date('Y-m-d',strtotime($assistance['date']))>= $min){
                            if(date('Y-m-d',strtotime($assistance['date']))<= $today){
                                if($assistance['status']== 'absent'){
                                    $absentCount++;
                                }
                            }
                        }
                    }
                    if($absentCount == 3){
                        \App\Penalty::create($penalty);
                        $userModel->update(['status'=>'penalized']);
                    }
                }
            }
        }

    }
    public function blockSaturday($auth_user){

        if(date('l')=='saturday'){

            if(date('H') == 5){
                \App\User::where([['is_active',true],['rol_id',2]])
                ->orWhere([['is_active',true],['rol_id',3]])
                ->update(['status'=>'penalized']);
            }
            else if(date('H') == 6){
                \App\User::where([['is_active',true],['rol_id',2]])
                ->orWhere([['is_active',true],['rol_id',3]])
                ->update(['status'=>'in']);
            }
        }

    }

    private function autoRemovePenalty($auth_user){

        $active = \App\Penalty::select()->where([['active', true],['user_code',$auth_user->code]])->get()->first();

        if($active != null){
            $u_mdl = \App\User::findOrFail($auth_user->id);
            $p_mdl = \App\Penalty::findOrFail($active['id']);

            if(date('Y-m-d')==$active->conclusion){

                $p_mdl->update(['active'=>false]);
                $u_mdl->update(['status'=>'in']);
            }

        }
    }

    public function getStatus(){

        $auth_user = Auth::user();


        switch($auth_user->rol_id){

            case 2:{

                $this->updateWeekendStatus($auth_user);
                $this->autoPenalize($auth_user);
                $this->blockSaturday($auth_user);
                $this->autoRemovePenalty($auth_user);
                $response = [
                    'title' => 'status',
                    'content' =>$auth_user->status
                ];
                return ResponsesHelper::customResponse($response);
            }
            case 3:{
                $this->updateWeekendStatus($auth_user);
                $this->autoPenalize($auth_user);
                $this->blockSaturday($auth_user);
                $this->autoRemovePenalty($auth_user);
                $response = [
                    'title' => 'status',
                    'content' =>$auth_user->status
                ];
                return ResponsesHelper::customResponse($response);
            }

            default:{
                return ResponsesHelper::authError();
            }
        }
    }

    public function test(Request $request){

        $auth_user = Auth::user();

        switch($auth_user->rol_id){

            case 2|| 3:{
                $data = $request->validate([
                    'item s',
                    'item x'
                ]);
            }
            case 4:{
                $data = $request->validate([
                    'item f',
                    'item g'
                ]);

                if(ResponsesHelper::emptyField($data)){

                }

            }
            default:{
                return ResponsesHelper::authError();
            }
        }

    }

}
