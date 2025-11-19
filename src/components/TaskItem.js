'use client';

import React, { useState } from 'react';
import { taskAPI } from '../lib/apiClient';

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const statusOptions = ['pending', 'in-progress', 'completed'];

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await taskAPI.updateTask(task.id, { status: newStatus });
      onTaskUpdated?.();
    } catch (err) {
      console.error('Failed to update task status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await taskAPI.deleteTask(task.id);
      setShowDeleteConfirm(false);
      onTaskDeleted?.();
    } catch (err) {
      console.error('Failed to delete task:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
    };
    return colors[status] || colors.pending;
  };

  const getStatusButtonColor = (status) => {
    if (task.status === status) {
      const colors = {
        pending: 'bg-yellow-500 text-white',
        'in-progress': 'bg-blue-500 text-white',
        completed: 'bg-green-500 text-white',
      };
      return colors[status];
    }
    return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-3 border-l-4 border-blue-500">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ')}
        </span>
      </div>

      <div className="text-xs text-gray-500 mb-3">
        Created: {new Date(task.createdAt).toLocaleDateString()} at{' '}
        {new Date(task.createdAt).toLocaleTimeString()}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            disabled={isUpdating}
            className={`px-3 py-1 text-sm font-medium rounded transition ${getStatusButtonColor(status)} ${
              isUpdating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {status.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isDeleting || showDeleteConfirm}
          className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
        >
          Delete
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded">
          <p className="text-red-800 text-sm mb-2">Are you sure you want to delete this task?</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-1 px-3 rounded text-sm"
            >
              {isDeleting ? 'Deleting...' : 'Confirm Delete'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
