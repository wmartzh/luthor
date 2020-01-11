<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWeekendsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('weekends', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_code');
            $table->enum('state',['in process', 'approved','rejected','deprecated'])->default('in process');
            $table->boolean('check_exit',[true,false])->default(false);
            $table->enum('preceptor',['approved','rejected','no-def',])->default('no-def');
            $table->enum('vicerector',['approved','rejected','no-def'])->default('no-def');
            $table->dateTimeTz('out_date_time');
            $table->dateTimeTz('in_date_time');
            $table->string('location')->nullable();
            $table->string('message')->nullable();
            $table->timestamps();

            //Relations

            $table->foreign('user_code')
                ->references('code')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('weekends', function(Blueprint  $table){
            $table->dropForeign(['user_code']);
            $table->dropColumn('user_code');
        });
        Schema::dropIfExists('weekends');
    }
}
