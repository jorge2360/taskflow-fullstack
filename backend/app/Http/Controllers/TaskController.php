<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->tasks()->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
        ]);

        $validated['user_id'] = $request->user()->id;

        $task = Task::create($validated);

        return response()->json([
            'message' => 'Tarea creada correctamente.',
            'task' => $task,
        ], 201);
    }

    public function show(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No autorizado.'
            ], 403);
        }

        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No autorizado.'
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);

        return response()->json([
            'message' => 'Tarea actualizada.',
            'task' => $task,
        ]);
    }

    public function destroy(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No autorizado.'
            ], 403);
        }

        $task->delete();

        return response()->json([
            'message' => 'Tarea eliminada.'
        ]);
    }
}