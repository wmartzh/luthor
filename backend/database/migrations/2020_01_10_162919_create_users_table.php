<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('rol_id');
            $table->bigInteger('code')->unique();
            $table->string('prorfile_image')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('username')->nullable();
            $table->enum('gender',['F','M','no-def'])->default('no-def');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone_number')->nullable();
            $table->boolean('is_active')->default(false);
            $table->enum('status',['out','in','penalized'])->default('in');
            $table->enum('intership',['boys','girls','no-def'])->default('no-def');
            $table->timestamps();

            /// Relations
            $table->foreign('rol_id')->references('id')->on('roles')
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
        Schema::table('users', function(Blueprint  $table){
            $table->dropForeign(['rol_id']);
            $table->dropColumn('rol_id');
        });
        Schema::dropIfExists('users');
    }
}
