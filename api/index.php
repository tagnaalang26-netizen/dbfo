<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

require __DIR__.'/../vendor/autoload.php';

// Only this serverless entry point sits behind Vercel's HTTPS proxy.
TrustProxies::at('*');

// Vercel's function filesystem is read-only except for /tmp.
$storage = '/tmp/dfbo';

foreach (['', '/framework/views', '/framework/cache/data', '/framework/sessions', '/logs'] as $directory) {
    $path = $storage.$directory;

    if (! is_dir($path) && ! mkdir($path, 0700, true) && ! is_dir($path)) {
        throw new RuntimeException('Unable to create Laravel runtime storage.');
    }
}

/** @var Application $app */
$app = require __DIR__.'/../bootstrap/app.php';
$app->useStoragePath($storage);
$app->handleRequest(Request::capture());
