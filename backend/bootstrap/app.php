<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Enable API middleware with CORS
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);

        // Add security headers to all requests
        $middleware->append(\App\Http\Middleware\SecurityHeaders::class);

        // Configure CORS
        $middleware->validateCsrfTokens(except: [
            'api/*', // Disable CSRF for API routes (using JWT)
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
