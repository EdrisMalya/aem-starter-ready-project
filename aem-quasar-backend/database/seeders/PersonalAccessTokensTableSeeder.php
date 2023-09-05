<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PersonalAccessTokensTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('personal_access_tokens')->delete();
        
        \DB::table('personal_access_tokens')->insert(array (
            0 => 
            array (
                'id' => 12,
                'tokenable_type' => 'App\\Models\\User',
                'tokenable_id' => 1,
                'name' => 'user_token',
                'token' => '2819729a71fd9756f1938450b292ca03d1ffe4ba0af36b321e7e7a681edc7fd5',
                'abilities' => '["*"]',
                'last_used_at' => '2023-08-14 15:32:44',
                'expires_at' => NULL,
                'created_at' => '2023-08-03 03:47:47',
                'updated_at' => '2023-08-14 15:32:44',
            ),
            1 => 
            array (
                'id' => 13,
                'tokenable_type' => 'App\\Models\\User',
                'tokenable_id' => 1,
                'name' => 'user_token',
                'token' => 'd4f2724383301d9dca6b7d2b071253d5259607959bf31c1964e6a6804a96ea38',
                'abilities' => '["*"]',
                'last_used_at' => '2023-08-03 14:33:17',
                'expires_at' => NULL,
                'created_at' => '2023-08-03 14:27:40',
                'updated_at' => '2023-08-03 14:33:17',
            ),
            2 => 
            array (
                'id' => 14,
                'tokenable_type' => 'App\\Models\\User',
                'tokenable_id' => 1,
                'name' => 'user_token',
                'token' => '3b338013ed32f5bfd0ecd0b18889f85eb84adbb79dce9908403ac582399c7e0c',
                'abilities' => '["*"]',
                'last_used_at' => '2023-08-09 14:47:30',
                'expires_at' => NULL,
                'created_at' => '2023-08-09 14:46:32',
                'updated_at' => '2023-08-09 14:47:30',
            ),
        ));
        
        
    }
}