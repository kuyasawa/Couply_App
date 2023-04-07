<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private $post;

	public function __construct(Post $post)
	{
		$this->post = $post;
	}

    public function index()
    {
        $posts = $this->post->all();
        return view('welcome', ['posts' => $posts]);

    }

    public function store(Request $request)
    {
        $inputs = $request->all();
        $this->post->fill($input);
        $this->post->save;
        return response()->json([
            "message" => "投稿しました",
        ], 201);
    }
}
