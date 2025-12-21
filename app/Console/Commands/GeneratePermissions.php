<?php

namespace App\Console\Commands;

use App\Enums\PermissionsEnum;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;

class GeneratePermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permissions:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate permissions';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        foreach (PermissionsEnum::cases() as $permission) {
            Permission::firstOrCreate([
                'name' => $permission->value,
                'guard_name' => 'admin',
            ]);
        }

        $this->info('Permissions generated successfully.');
    }
}
