<?php
namespace App\Helpers;

use \App\User;
use \App\Assistance;
use \Illuminate\Request;
use Illuminate\Support\Facades\Auth;
use \App\Helpers\ResponsesHelper;
class TakeAssistanceHelper{



    public static function assistancesExists($data){

        $same_assistance = \App\Assistance::select()->where([['user_code',$data['user_code']],['date',$data['date']],['event_id',$data['event_id']]])->exists();
        return $same_assistance;

    }
    public static function setPresentTime($event){

        $event_time = strtotime($event['tolerance_present']); //Get Tolerance time
        $present = date("i",$event_time) * 60; // get raw value from extra time

        $return = strtotime($event['start_time'])+$present;

    }
    public static function setLateTime($event){
        $late_time = strtotime($event['tolerance_late']);
        $late = date("i",$late_time) * 60;
        return strtotime($event['start_time'])+ $late;
    }
    private  function justifyAssistance($user_auth,$event_id){

        //Justify by weekend
        $weekends = \App\Weekend::select('user_code')->where([['state','approved'],['instership',$user_auth->intership]])->get();
        $users = \App\User::select('id','user_code')->where([['has_job',true],['intership',$user_auth->intership]]);

        if ($weekends != null){
            foreach($weekends as $weekend){
                // Set assistance data
                $data=[
                    'user_code' => $weekend['user_code'],
                    'monitor_id' =>$user_auth->id,
                    'event_id' => $event_id,
                    'status'=> 'present',
                    'date' => date('Y-m-d'),
                    'time' => date('H:i:s'),
                    'intership' => $user_auth->intership
                ];

                // Exclude user that check the assistance
                $same_assistance = \App\Assistance::select()->where([['user_code',$data['user_code']],['date',$data['date']],['event_id',$data['event_id']]])->exists();
                if(!$same_assistance){

                    if($data['user_code'] != $user_auth->code){

                        \App\Assistance::create($data);
                    }

                }
            }
        }
    }




}
