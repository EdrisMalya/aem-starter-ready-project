<?php

namespace App\Jobs;

use App\Events\SystemConfigurationEvents;
use App\Models\BackupHistory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class RunBackupJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function handle(): void
    {
        Artisan::call('backup:run');

        $files = Storage::disk('public')->files('backups');
        $last_file = end($files);
        $file_size = Storage::disk('public')->size($last_file);
        $path = asset('storage/'.$last_file);
        $file_name_array = explode('/', $last_file);
        $file_name = end($file_name_array);

        BackupHistory::query()->create([
            'user_id' => $this->userId,
            'path' => $path,
            'name' => $file_name,
            'size' => $file_size
        ]);
        event(new SystemConfigurationEvents([
            'result' => true,
            'message' => 'Backed up succeed',
            'table' => 'backup_table'
        ]));
    }
}
