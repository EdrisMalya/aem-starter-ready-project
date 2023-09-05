<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolePermissionsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('role_permissions')->delete();
        
        \DB::table('role_permissions')->insert(array (
            0 => 
            array (
                'role_id' => 14,
                'permission_id' => 33,
            ),
            1 => 
            array (
                'role_id' => 14,
                'permission_id' => 34,
            ),
        ));
        
        
    }
}