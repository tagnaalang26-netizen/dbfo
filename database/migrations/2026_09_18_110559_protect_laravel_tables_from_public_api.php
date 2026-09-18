<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const TABLES = [
        'users', 'password_reset_tokens', 'sessions', 'passkeys',
        'cache', 'cache_locks', 'jobs', 'job_batches', 'failed_jobs', 'migrations',
    ];

    public function up(): void
    {
        if (DB::getDriverName() !== 'pgsql') {
            return;
        }

        foreach (self::TABLES as $table) {
            // Laravel owns these tables; browser clients must use its HTTP routes.
            DB::statement('ALTER TABLE "'.$table.'" ENABLE ROW LEVEL SECURITY');

            foreach (['anon', 'authenticated'] as $role) {
                if (DB::selectOne('SELECT 1 FROM pg_roles WHERE rolname = ?', [$role])) {
                    DB::statement('REVOKE ALL ON TABLE "'.$table.'" FROM "'.$role.'"');
                }
            }
        }
    }

    public function down(): void
    {
        // Intentionally retain protections: rollback must not expose credentials.
    }
};
