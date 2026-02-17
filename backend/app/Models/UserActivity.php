<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserActivity extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'users_activity';

    /**
     * The primary key for the model.
     */
    protected $primaryKey = 'user_id';

    /**
     * Indicates if the model's ID is auto-incrementing.
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'session_token',
        'session_expires_at',
        'last_login_at',
        'last_login_ip',
        'last_password_changed_at',
        'last_password_changed_ip',
        'password_reset_token',
        'password_reset_expires_at',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'session_expires_at' => 'datetime',
            'last_login_at' => 'datetime',
            'last_password_changed_at' => 'datetime',
            'password_reset_expires_at' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the activity.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Prepare a date for array / JSON serialization.
     */
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('d-m-Y H:i:s');
    }
}
