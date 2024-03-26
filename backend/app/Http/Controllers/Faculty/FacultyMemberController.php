<?php

namespace App\Http\Controllers\Faculty;

use App\Models\FacultyMember;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Traits\CrudOperationsTrait;
use App\Traits\HandleFile;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class FacultyMemberController extends Controller
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
            'department_id' => 'nullable|exists:departments,id',
            'user_id' => 'required|exists:users,id',
            'faculty_id' => 'nullable|exists:faculties,id',
            'name' => 'required|string',
            'image' => 'required',
            'title' => 'required|string',
            'sub_title' => 'nullable|string',
            'career' => 'nullable|string',
            'experience' => 'nullable|string',
            'scientific_interests' => 'nullable|string',
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
            $facultyMembers = $this->getRecord(new FacultyMember, 'id', 'department_id', 'faculty_id', 'user_id', 'name', 'image', 'title', 'sub_title', 'career', 'experience', 'scientific_interests');
            return response()->json(['data' => $facultyMembers], 200);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to fetch faculty members. Please try again later.'], 500);
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

            $data = $request->only(['department_id', 'faculty_id', 'user_id', 'name', 'title', 'sub_title', 'career', 'experience', 'scientific_interests']);
            $data['image'] = $this->createFile($request, 'image', $request->name, 'image');

            $facultyMember = $this->createRecord(new FacultyMember, $data);

            return response()->json(['data' => $facultyMember, 'message' => 'Faculty member created successfully'], 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to create faculty member. Please try again later.'], 500);
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
            $facultyMember = $this->findById(new FacultyMember, $id);
            return response()->json(['data' => $facultyMember], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Record not found', 'details' => 'The requested faculty member was not found.'], 404);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to fetch faculty member details. Please try again later.'], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Update Function
    |--------------------------------------------------------------------------
    */
    public function update(Request $request, FacultyMember $facultyMember)
    {
        try {
            $validationResult = $this->validator($request);
            if ($validationResult !== null) {
                return $validationResult;
            }

            $data = $request->only(['department_id', 'faculty_id', 'user_id', 'name', 'title', 'sub_title', 'career', 'experience', 'scientific_interests']);
            if ($request->hasFile('image')) {
                $data['image'] = $this->updateFile($request, 'image', $facultyMember->image, $request->name, 'image');
            } else {
                return response()->json(['error' => 'File not found in the request.'], 500);
            }

            $facultyMember = $this->updateRecord(new FacultyMember, $facultyMember->id, $data);

            return response()->json(['data' => $facultyMember, 'message' => 'Faculty member updated successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Record not found', 'details' => 'The requested faculty member was not found.'], 404);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to update faculty member. Please try again later.'], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Destroy Function
    |--------------------------------------------------------------------------
    */
    public function destroy(FacultyMember $facultyMember)
    {
        try {
            return $this->deleteRecord($facultyMember, 'image');
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to delete faculty member. Please try again later.'], 500);
        }
    }
}
