<?php

namespace App\Http\Controllers\Configurations;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Http\Resources\Configurations\BackupResource;
use App\Jobs\RunBackupJob;
use App\Models\BackupHistory;
use Illuminate\Http\Request;

class BackupController extends Controller
{
    public function index(Request $request ){
        $this->allowed('backup-access');
        $query = BackupHistory::query()->with(['user']);
        $datatable = new DatatableBuilder($query, ['name', 'path']);
        return BackupResource::collection($datatable->build());
    }

    public function run(){
        RunBackupJob::dispatch(auth()->id());
        return response()->json([
            'result' => true,
            'message' => 'Backup is running. Once it finishes system will give you notification'
        ]);
    }
}
