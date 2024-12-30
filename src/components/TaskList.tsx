// task list component for displaying the list of tasks
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import FilterBar from './FilterBar';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const { tasks, filter, searchQuery, sortBy } = useSelector((state: RootState) => state.tasks);

  // filter tasks based on the selected filter, search query, and sort by
  const filteredTasks = tasks
    .filter((task: Task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .filter((task: Task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: Task, b: Task) => {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      return dateA - dateB;
    });

  return (
    <div className="space-y-4">
      {/* filter bar */}
      <div className="sticky top-0 z-10">
        <FilterBar />
      </div>
      <div className="border border-gray-200 rounded-lg p-4 relative bg-white/50">
        <div className="max-h-[calc(100vh-20rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent hover:scrollbar-thumb-gray-400/50">
          {filteredTasks.length > 0 ? (
            <div className="space-y-4">
              {filteredTasks.map((task: Task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          ) : (

            <div className="flex items-center justify-center h-32 text-gray-500">
              {/* if no tasks found, display this message */}
              No tasks found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
