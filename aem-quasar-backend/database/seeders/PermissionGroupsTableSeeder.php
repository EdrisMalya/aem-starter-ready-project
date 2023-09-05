<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PermissionGroupsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('permission_groups')->delete();
        
        \DB::table('permission_groups')->insert(array (
            0 => 
            array (
                'id' => 34,
                'name' => 'User management',
                'icon' => 'people',
                'permission_group_id' => 0,
                'created_at' => '2023-08-03 14:33:39',
                'updated_at' => '2023-08-03 14:33:39',
            ),
            1 => 
            array (
                'id' => 53,
                'name' => 'Users',
                'icon' => 'person',
                'permission_group_id' => 34,
                'created_at' => '2023-08-08 14:02:02',
                'updated_at' => '2023-08-08 14:07:54',
            ),
            2 => 
            array (
                'id' => 54,
                'name' => 'Log',
                'icon' => 'engineering',
                'permission_group_id' => 53,
                'created_at' => '2023-08-08 14:21:15',
                'updated_at' => '2023-08-08 14:23:40',
            ),
            3 => 
            array (
                'id' => 56,
                'name' => 'Configurations',
                'icon' => 'settings',
                'permission_group_id' => 0,
                'created_at' => '2023-08-11 13:18:39',
                'updated_at' => '2023-08-11 13:18:39',
            ),
            4 => 
            array (
                'id' => 57,
                'name' => 'Test',
                'icon' => NULL,
                'permission_group_id' => 56,
                'created_at' => '2023-08-11 13:18:57',
                'updated_at' => '2023-08-11 13:18:57',
            ),
            5 => 
            array (
                'id' => 58,
                'name' => 'Test',
                'icon' => NULL,
                'permission_group_id' => 57,
                'created_at' => '2023-08-11 13:19:03',
                'updated_at' => '2023-08-11 13:19:03',
            ),
        ));
        
        
    }
}