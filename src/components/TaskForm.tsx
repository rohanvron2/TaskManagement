// task form / popup component for adding new tasks
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { getRandomColorScheme, getLastUsedColors } from '../utils/colors';
import { RootState } from '../store/store';
import { Button } from '@headlessui/react'

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // handles the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedDate = format(new Date(dueDate), 'yyyy-MM-dd');
    const lastUsedColors = getLastUsedColors(tasks);

    // creates a new task object
    const newTask = {
      id: uuidv4(),
      title,
      description,
      dueDate: formattedDate,
      completed: false,
      createdAt: new Date().toISOString(),
      colorScheme: getRandomColorScheme(lastUsedColors),
    };

    // dispatches the addTask action
    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  // design and layout of the form
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-white hover:bg-red-400"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded bg-teal-500 py-2 px-4 text-sm text-white data-[hover]:bg-teal-600 data-[active]:bg-cyan-700"
        >
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
