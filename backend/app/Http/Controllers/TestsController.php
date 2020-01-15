<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TestsController extends Controller
{
    //


    public function test(){
        $user = Auth::user();
        
        return response()->json(["id"=> $user]);
    }
}
