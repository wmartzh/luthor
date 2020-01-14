<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('code_user');
            $table->boolean('check_exit')->default(false);
            $table->enum('status',['active','rejected','deprecated'])->default('active');
            $table->dateTimeTz('output_date_time')->nullable();
            $table->dateTimeTz('entry_date_time')->nullable();
            $table->date('date');
            $table->string('place');
            $table->timestamps();

            $table->foreign('code_user')
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
        Schema::table('permissions', function(Blueprint  $table){
            $table->dropForeign(['code_user']);
            $table->dropColumn('code_user');
        });
        Schema::dropIfExists('permissions');



    }
}
