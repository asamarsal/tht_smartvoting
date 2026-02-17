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
        Schema::create('polls', function (Blueprint $table) {
            // Primary Key
            $table->id();
            
            // Creator (Foreign Key to users)
            $table->foreignId('creator_id')->constrained('users')->onDelete('cascade');
            
            // Poll Information
            $table->string('title');
            $table->text('description')->nullable();
            
            // Poll Configuration
            $table->enum('poll_type', ['single_choice', 'multiple_choice', 'ranked_choice']);
            $table->boolean('is_anonymous')->default(false);
            $table->integer('max_votes')->nullable(); // Only for multiple_choice
            
            // Schedule
            $table->datetime('starts_at');
            $table->datetime('ends_at');
            
            // Status
            $table->enum('status', ['draft', 'active', 'closed'])->default('draft');
            
            // Timestamps
            $table->timestamps();
            
            // Indexes for Performance
            $table->index('creator_id'); // Query polls by creator
            $table->index('status'); // Filter by status (active, closed)
            $table->index('ends_at'); // Scheduler queries
            $table->index('created_at'); // Sort by newest
            $table->index(['status', 'ends_at']); // Composite: optimize scheduler (active polls yang akan expire)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('polls');
    }
};
