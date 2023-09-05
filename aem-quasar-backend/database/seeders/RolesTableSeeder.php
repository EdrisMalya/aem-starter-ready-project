<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('roles')->delete();
        
        \DB::table('roles')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Admin',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => '2023-08-07 16:22:39',
                'updated_at' => '2023-08-10 13:39:16',
            ),
            1 => 
            array (
                'id' => 13,
                'name' => 'Sales manager',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => '2023-08-10 13:39:31',
                'updated_at' => '2023-08-10 13:39:31',
            ),
            2 => 
            array (
                'id' => 14,
                'name' => 'Purchase manager',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => '2023-08-10 13:39:38',
                'updated_at' => '2023-08-10 13:39:38',
            ),
        ));
        
        
    }
}