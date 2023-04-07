<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     // return $request->user();
// });
    # 投稿作成
    Route::post('/posts/store', 'PostController@store')->name('post.create');
    # 投稿一覧表示
    Route::get('/posts', 'PostController@index')->name('post.index');
    # 投稿編集
    Route::patch('/posts/update/{id}' , 'PostController@update')->name('post.update');
    # 投稿削除
    Route::delete('/posts/{id}', 'PostController@delete')->name('post.delete');

