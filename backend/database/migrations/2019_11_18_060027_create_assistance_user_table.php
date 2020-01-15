<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssistanceUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assistance_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_code');
            $table->unsignedBigInteger('assistance_id');
            $table->timestamps();

            //Relations
            $table->foreign('user_code')
                    ->references('code')
                    ->on('users')
                    ->onDelete('cascade');
            $table->foreign('assistance_id')
                    ->references('id')
                    ->on('assistances')
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
        Schema::dropIfExists('assistance_user');
    }
}
