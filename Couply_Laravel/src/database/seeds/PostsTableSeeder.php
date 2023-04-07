<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            [
                'user' => 'テスト１',
                'content' => 'お腹すいた',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user' => 'テスト２',
                'content' => '眠い',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
