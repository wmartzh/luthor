<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersWeekendsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_weekend', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_code');
            $table->unsignedBigInteger('weekend_id');
            $table->timestamps();

            //Relations
            $table->foreign('user_code')
                    ->references('code')
                    ->on('users')
                    ->onDelete('cascade');

            $table->foreign('weekend_id')
                    ->references('id')
                    ->on('weekends')
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
        Schema::dropIfExists('users_weekends');
    }
}
