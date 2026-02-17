<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    /**
     * Register new user and create JWT token
     */
    public function register(array $data): array
    {
        // 1. Create user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_active' => true,
        ]);

        // 2. Generate JWT token
        $token = JWTAuth::fromUser($user);

        // 3. Store session in users_activity
        $this->storeUserActivity($user->id, $token, request()->ip());

        return [
            'user' => $user->fresh(), // Reload to get formatted dates
            'token' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60,
        ];
    }

    /**
     * Login user and create JWT token
     */
    public function login(array $credentials): array
    {
        // 1. Attempt to authenticate user
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw new \Exception('Invalid credentials');
        }

        // 2. Check if user is active
        if (!$user->is_active) {
            throw new \Exception('Account is inactive');
        }

        // 3. Generate JWT token
        $token = JWTAuth::fromUser($user);

        // 4. Update session in users_activity
        $this->updateUserActivity($user->id, $token, request()->ip());

        return [
            'user' => $user->fresh(), // Reload to get formatted dates
            'token' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60,
        ];
    }

    /**
     * Store user activity on register/login
     */
    private function storeUserActivity(int $userId, string $token, string $ip): void
    {
        UserActivity::create([
            'user_id' => $userId,
            'session_token' => $token,
            'session_expires_at' => now()->addMinutes(auth()->factory()->getTTL()),
            'last_login_at' => now(),
            'last_login_ip' => $ip,
        ]);
    }

    /**
     * Update user activity on login
     */
    private function updateUserActivity(int $userId, string $token, string $ip): void
    {
        UserActivity::updateOrCreate(
            ['user_id' => $userId],
            [
                'session_token' => $token,
                'session_expires_at' => now()->addMinutes(auth()->factory()->getTTL()),
                'last_login_at' => now(),
                'last_login_ip' => $ip,
            ]
        );
    }

    /**
     * Logout user - clear session and invalidate token
     */
    public function logout(): void
    {
        // Get authenticated user
        $user = auth()->user();

        if ($user) {
            // Clear session from users_activity
            UserActivity::where('user_id', $user->id)->update([
                'session_token' => null,
                'session_expires_at' => null,
            ]);

            // Invalidate JWT token
            JWTAuth::invalidate(JWTAuth::getToken());
        }
    }
}
