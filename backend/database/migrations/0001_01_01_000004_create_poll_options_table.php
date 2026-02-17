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
        Schema::create('poll_options', function (Blueprint $table) {
            // Primary Key
            $table->id();
            
            // Foreign Key to polls
            $table->foreignId('poll_id')->constrained('polls')->onDelete('cascade');
            
            // Option Data
            $table->string('option_text');
            $table->string('image_url')->nullable();
            
            // Timestamps
            $table->timestamps();
            
            // Index for Performance
            $table->index('poll_id'); // Fetch all options by poll_id
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poll_options');
    }
};
