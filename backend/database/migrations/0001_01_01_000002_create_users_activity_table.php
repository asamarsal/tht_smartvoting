<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_activity', function (Blueprint $table) {
            // Primary Key: user_id (1-to-1 relationship dengan users)
            $table->foreignId('user_id')->primary()->constrained('users')->onDelete('cascade');
            
            // JWT Session Token
            $table->text('session_token')->nullable();
            $table->timestamp('session_expires_at')->nullable();
            
            // Login Tracking
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip', 45)->nullable();
            
            // Password Change Tracking
            $table->timestamp('last_password_changed_at')->nullable();
            $table->string('last_password_changed_ip', 45)->nullable();
            
            // Password Reset Token
            $table->string('password_reset_token')->nullable();
            $table->timestamp('password_reset_expires_at')->nullable();
            
            // Timestamps
            $table->timestamps();
            
            // Indexes
            $table->index('session_token');
            $table->index('password_reset_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_activity');
    }
};
