<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermissionsUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_code');
            $table->unsignedBigInteger('permissions_id');
            $table->timestamps();

            //Relations
            $table->foreign('user_code')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');
            $table->foreign('permissions_id')
                    ->references('id')
                    ->on('permissions')
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
        Schema::dropIfExists('permissions_user');
    }
}
