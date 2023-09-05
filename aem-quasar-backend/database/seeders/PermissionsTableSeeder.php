<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('permissions')->delete();
        
        \DB::table('permissions')->insert(array (
            0 => 
            array (
                'id' => 26,
                'name' => 'Access',
                'key' => 'user-management-access',
                'permission_group_id' => 34,
                'created_at' => '2023-08-07 14:23:38',
                'updated_at' => '2023-08-07 14:23:38',
            ),
            1 => 
            array (
                'id' => 27,
                'name' => 'Tset 1',
                'key' => 'user-management-tset-1',
                'permission_group_id' => 34,
                'created_at' => '2023-08-08 14:08:05',
                'updated_at' => '2023-08-08 14:08:05',
            ),
            2 => 
            array (
                'id' => 29,
                'name' => 'Access',
                'key' => 'users-access',
                'permission_group_id' => 53,
                'created_at' => '2023-08-08 14:13:26',
                'updated_at' => '2023-08-08 14:13:26',
            ),
            3 => 
            array (
                'id' => 30,
                'name' => 'Create',
                'key' => 'users-create',
                'permission_group_id' => 53,
                'created_at' => '2023-08-08 14:13:32',
                'updated_at' => '2023-08-08 14:13:32',
            ),
            4 => 
            array (
                'id' => 31,
                'name' => 'Access log activity',
                'key' => 'log-access-log-activity',
                'permission_group_id' => 54,
                'created_at' => '2023-08-08 14:24:00',
                'updated_at' => '2023-08-08 14:24:00',
            ),
            5 => 
            array (
                'id' => 32,
                'name' => 'Access login log',
                'key' => 'log-access-login-log',
                'permission_group_id' => 54,
                'created_at' => '2023-08-08 14:24:13',
                'updated_at' => '2023-08-08 14:24:13',
            ),
            6 => 
            array (
                'id' => 33,
                'name' => 'Accss',
                'key' => 'configurations-accss',
                'permission_group_id' => 56,
                'created_at' => '2023-08-11 13:18:50',
                'updated_at' => '2023-08-11 13:18:50',
            ),
            7 => 
            array (
                'id' => 34,
                'name' => 'Tset2',
                'key' => 'test-tset2',
                'permission_group_id' => 58,
                'created_at' => '2023-08-11 13:19:13',
                'updated_at' => '2023-08-11 13:19:13',
            ),
        ));
        
        
    }
}