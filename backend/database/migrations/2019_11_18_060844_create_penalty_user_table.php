<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenaltyUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penalty_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_code');
            $table->unsignedBigInteger('penalty_id');
            $table->timestamps();

            //Relations
            $table->foreign('user_code')
                    ->references('code')
                    ->on('users')
                    ->onDelete('cascade');
            $table->foreign('penalty_id')
                    ->references('id')
                    ->on('penalties')
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
        Schema::dropIfExists('penalty_user');
    }
}
