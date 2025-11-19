'use client';

import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, isLoading, isError, onRefresh }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-gray-600 mt-4">Loading tasks...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-semibold">Error loading tasks</p>
        <p className="text-sm mt-2">Please check your connection and try again.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-4xl mb-3">📝</div>
        <p className="text-gray-600">No tasks yet. Create your first task to get started!</p>
      </div>
    );
  }

  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-yellow-700 mb-3">
            📋 Pending ({pendingTasks.length})
          </h3>
          {pendingTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onRefresh}
              onTaskDeleted={onRefresh}
            />
          ))}
        </div>
      )}

      {inProgressTasks.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-blue-700 mb-3">
            ⏳ In Progress ({inProgressTasks.length})
          </h3>
          {inProgressTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onRefresh}
              onTaskDeleted={onRefresh}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-3">
            ✅ Completed ({completedTasks.length})
          </h3>
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onRefresh}
              onTaskDeleted={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}
