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
        Schema::create('votes', function (Blueprint $table) {
            // Primary Key
            $table->id();
            
            // Foreign Keys
            $table->foreignId('poll_id')->constrained('polls')->onDelete('cascade');
            $table->foreignId('option_id')->constrained('poll_options')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            
            // Ranked Choice Support
            $table->integer('rank')->nullable(); // Only for ranked_choice type
            
            // Vote Metadata
            $table->datetime('voted_at');
            $table->string('ip_address', 45); // IPv6 support (45 chars max)
            
            // Timestamps
            $table->timestamps();
            
            // Indexes for Performance
            $table->index('poll_id');                      // Filter votes by poll
            $table->index('option_id');                    // Count votes per option
            $table->index('user_id');                      // Get users votes
            $table->index('voted_at');                     // Analytics by time
            $table->index(['poll_id', 'user_id']);         // Check authenticated user already voted
            $table->index(['poll_id', 'ip_address']);      // Check anonymous IP already voted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
