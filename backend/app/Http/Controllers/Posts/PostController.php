<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\CrudOperationsTrait;
use App\Traits\HandleFile;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class PostController extends Controller
{
    use CrudOperationsTrait;
    use HandleFile;

    /*
    |--------------------------------------------------------------------------
    | Validate Request Data Function
    |--------------------------------------------------------------------------
    */
    private function validator($request)
    {
        $rules = [
            'title' => 'required|string',
            'description' => 'nullable|string',
            'file' => 'required',
            'type' => 'required|in:article,news,letter,data_show',
            'user_id' => 'required|exists:users,id',
        ];
        return $this->validateRequestData($request, $rules);
    }

    /*
    |--------------------------------------------------------------------------
    | Index Function
    |--------------------------------------------------------------------------
    */
    public function index()
    {
        try {
            $posts = $this->getRecord(new Post, 'id', 'title', 'description', 'file', 'file_type', 'type', 'user_id');
            return response()->json($posts, 200);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to fetch posts. Please try again later.'], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Store Function
    |--------------------------------------------------------------------------
    */
    public function store(Request $request)
    {
        try {
            $validationResult = $this->validator($request);
            if ($validationResult !== null) {
                return $validationResult;
            }

            $fileType = GetTypeFile($request->file('file'));
            $data = $request->only(['title', 'description', 'type', 'user_id']);
            $data['file'] = $this->createFile($request, 'file', $request->title, $fileType);
            $data['file_type'] = $fileType;
            $post = $this->createRecord(new Post, $data);

            return response()->json(['post' => $post, 'message' => 'Post created successfully'], 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to create post. Please try again later.'], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Show Function
    |--------------------------------------------------------------------------
    */
    public function show($id)
    {
        try {
            $post = $this->findById(new Post, $id);
            return response()->json($post, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Record not found', 'details' => 'The requested post was not found.'], 404);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to fetch post details. Please try again later.'], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Update Function
    |--------------------------------------------------------------------------
    */
    public function update(Request $request, Post $post)
    {
        try {
            $validationResult = $this->validator($request);
            if ($validationResult !== null) {
                return $validationResult;
            }

            $data = $request->only(['title', 'description', 'type', 'user_id']);
            $fileType = GetTypeFile($request->file('file'));
            $data['file'] = $this->updateFile($request, 'file', $post->file, $request->title, $fileType);

            if ($request->file !== $post->file) {
                $data['file_type'] = $fileType;
            } else {
                $data['file_type'] = $post->file_type;
            }
            $updatedPost = $this->updateRecord(new Post, $post->id, $data);
            if ($updatedPost) {
                return response()->json(['post' => $updatedPost, 'message' => 'Post updated successfully'], 200);
            }

            return response()->json(['error' => 'Failed to update post'], 500);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to update post. Please try again later.'], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Destroy Function
    |--------------------------------------------------------------------------
    */
    public function destroy(Post $post)
    {
        try {
            return $this->deleteRecord($post, 'file');
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to delete post. Please try again later.'], 500);
        }
    }
}
