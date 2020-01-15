<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenaltiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penalties', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_code') ;
            $table->boolean('active',[true, false])->default(false);
            $table->string('subject')->nullable();
            $table->enum('intership',['boys','girls','no-def'])->default('no-def');
            $table->timestamps();

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
        Schema::table('penalties', function(Blueprint  $table){
            $table->dropForeign(['user_code']);
            $table->dropColumn('user_code');
        });
        Schema::dropIfExists('penalties');
    }
}
