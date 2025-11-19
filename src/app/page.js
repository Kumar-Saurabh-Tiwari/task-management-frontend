'use client';

import React from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import useTasks from '@/hooks/useTasks';
import '../globals.css';

export default function Home() {
  const { tasks, isLoading, isError, mutate } = useTasks();

  const handleTaskCreated = () => {
    mutate();
  };

  const handleRefresh = () => {
    mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">✓ Task Manager</h1>
              <p className="text-blue-100 mt-2">Organize and track your tasks efficiently</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50 font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>

          {/* Tasks Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Your Tasks ({tasks.length})
              </h2>
              <TaskList
                tasks={tasks}
                isLoading={isLoading}
                isError={isError}
                onRefresh={handleRefresh}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
          <p>© 2024 Task Management System. All rights reserved.</p>
          <p className="text-sm mt-2">Built with Next.js, React, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
