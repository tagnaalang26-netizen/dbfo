<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('home displays the login page', function () {
    $response = $this->get(route('home'));

    $response->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('auth/login')
        ->has('canResetPassword')
        ->has('status')
    );
});

test('home redirects authenticated users to the dashboard', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('home'))
        ->assertRedirect(route('dashboard'));
});
