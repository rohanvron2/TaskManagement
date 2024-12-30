// Task item component for displaying individual tasks in the task list (resuable component)
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleComplete, updateTask } from "../store/tasksSlice";
import { Task } from "../types";
import { format } from "date-fns";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Button } from '@headlessui/react'

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleUpdate = () => {
    dispatch(
      updateTask({
        ...task,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate,
      })
    );
    setIsEditing(false);
  };

  // color scheme for the each task item described in ./utils/colors.ts
  const colorScheme = task.colorScheme || { background: 'bg-gray-100', text: 'text-gray-800' };

  return (
    <div className={`rounded-lg shadow-md p-4 ${task.completed ? 'opacity-40' : ''} ${colorScheme.background}`}>

    {/* if completed, lowers the opacity of the background and text */}

      {!isEditing ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleComplete(task.id))}
                className="h-4 w-4 rounded border-gray-300"
              />
              <h3
                className={`text-lg font-medium ${task.colorScheme.text} ${task.completed ? "line-through opacity-70" : ""}`}
              >
                {/* displays the title */}
                {task.title}
              </h3>
            </div>

            <div className="flex space-x-2">
              {/* edit task button */}
              <button
                onClick={() => setIsEditing(true)}
                className={`p-1 ${task.colorScheme.text} opacity-70 hover:opacity-100`}
              >
                <PencilIcon className="h-5 w-5 hover:text-blue-400" />
              </button>

              {/* delete task button*/}
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className={`p-1 ${task.colorScheme.text} opacity-70 hover:opacity-100`}
              >
                <TrashIcon className="h-5 w-5 hover:text-red-400" />
              </button>

            </div>
          </div>
        
         {/* displays the description and due date */}
          <p className={`${task.colorScheme.text} opacity-90`}>
            {task.description}
          </p>
          <div className={`text-sm ${task.colorScheme.text} opacity-75`}>
            Due: {format(new Date(task.dueDate), "PPP")}
          </div>
        </div>

      ) : (

        <div className="space-y-3">
          {/* edit task form */}
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="block p-1 w-full rounded-md border-gray-300 shadow-sm"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="block p-1 w-full rounded-md border-gray-300 shadow-sm"
            rows={2}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="block p-1 w-full rounded-md border-gray-300 shadow-sm"
          />

          {/* save and cancel buttons */}
          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleUpdate}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 data-[hover]:bg-teal-500"
            >
              <CheckIcon className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-red-400"
            >
              <XMarkIcon className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
