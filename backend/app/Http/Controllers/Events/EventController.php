<?php

namespace App\Http\Controllers\Events;

use App\Models\Event;
use App\Models\EventMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Traits\CrudOperationsTrait;
use App\Traits\HandleFile;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class EventController extends Controller
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
            'description' => 'required|string',
            'date' => 'nullable|date',
            'user_id' => 'required|exists:users,id',
            'file' => 'required',
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
            // Retrieve all events with related media
            $events = $this->getAllWithRelation(new Event, 'media', 'id', 'title', 'description', 'date');
            $transformedEvents = $events->map(function ($event) {
                $images = $event->media->where('type', 'image')->pluck('file')->toArray();
                $videos = $event->media->where('type', 'video')->pluck('file')->toArray();
                $unknown = $event->media->where('type', null)->pluck('file')->toArray();

                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'date' => $event->date,
                    'images' => $images,
                    'videos' => $videos,
                    'unknown' => $unknown,
                ];
            });
            return response()->json(['events' => $transformedEvents], 200);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to fetch events. Please try again later.'], 500);
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

            $eventData = $request->only(['title', 'description', 'date', 'user_id']);
            $event = $this->createRecord(new Event, $eventData);

            $fileType = GetTypeFile($request->file('file'));
            $mediaData = ['event_id' => $event->id, 'file' => $this->createFile($request, 'file', $request->title, 'file'), 'type' => $fileType];
            $media = $this->createRecord(new EventMedia, $mediaData);

            if ($media) {
                return response()->json(['event' => $event, 'media' => $media, 'message' => 'Event created successfully'], 201);
            } else {
                $event->delete();
                return response()->json(['error' => 'Failed to create media for the event'], 500);
            }
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to create event. Please try again later.'], 500);
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
            // Retrieve events with related media
            $event = $this->findWithRelation(new Event, 'media', $id);
            $images = $event->media->where('type', 'image')->pluck('file')->toArray();
            $videos = $event->media->where('type', 'video')->pluck('file')->toArray();
            $unknown = $event->media->where('type', null)->pluck('file')->toArray();

            $transformedEvent = [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'date' => $event->date,
                'images' => $images,
                'videos' => $videos,
                'unknown' => $unknown,
            ];

            return response()->json(['event' => $transformedEvent], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Record not found', 'details' => 'The requested event was not found.'], 404);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to fetch event details. Please try again later.'], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Update Function
    |--------------------------------------------------------------------------
    */
    public function update(Request $request, Event $event)
    {
        try {
            $validationResult = $this->validator($request);
            if ($validationResult !== null) {
                return $validationResult;
            }

            $eventData = $request->only(['title', 'description', 'date', 'user_id']);
            $updatedEvent = $this->updateRecord(new Event, $event->id, $eventData);
            $fileType = GetTypeFile($request->file('file'));
            $mediaData = ['event_id' => $updatedEvent->id, 'file' => $this->updateFile($request, 'file', $event->file, $request->title, 'file', 'type')];
            $fileUrl = $request->file;
            $existingMedia = EventMedia::find($event->id);

            if ($existingMedia && $fileUrl === $existingMedia->file) {
                $mediaData['type'] = $existingMedia->type;
            } else {
                $mediaData['type'] = $fileType;
            }

            $existingMedia = EventMedia::where('event_id', $updatedEvent->id)->first();

            if ($existingMedia) {
                $media = $this->updateRecord(new EventMedia, $existingMedia->id, $mediaData);
            } else {
                $media = $this->createRecord(new EventMedia, $mediaData);
            }
            return response()->json(['event' => $updatedEvent, 'media' => $media, 'message' => 'Event updated successfully'], 200);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to update event. Please try again later.'], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Destroy Function
    |--------------------------------------------------------------------------
    */
    public function destroy(Event $event)
    {
        try {
            return $this->deleteRecord($event, 'file');
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error', 'details' => 'Failed to delete event. Please try again later.'], 500);
        }
    }
}
