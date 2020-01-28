<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alerts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('dest')->nullable();
            $table->enum('destination',['students','monitor','preceptor','no-def']);
            $table->integer('code')->nullable();
            $table->string('content');
            $table->string('intership');
            $table->timestamps();


            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('dest')
                ->references('id')
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
        Schema::table('alerts', function(Blueprint  $table){
            $table->dropForeign(['user_id']);
            $table->dropForeign(['dest']);
            $table->dropColumn('user_id');
            $table->dropColumn('dest');
        });
        Schema::dropIfExists('alerts');
    }
}
