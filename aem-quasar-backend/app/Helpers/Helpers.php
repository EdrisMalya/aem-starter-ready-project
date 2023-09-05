<?php
namespace App\Helpers;

use Illuminate\Support\Facades\File;

    class Helpers
{
    public static function removeImageFromUrl($url) : void {
        $parsedUrl = parse_url($url);
        $path = $parsedUrl['path'];
        $absolutePath = public_path($path);
        if(File::exists($absolutePath)){
            File::delete($absolutePath);
        }
    }
    public static function formatFileSize($bytes) {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');
        $i = 0;

        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }
}
