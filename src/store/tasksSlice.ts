// tasksSlice file for the Redux store
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, FilterOption, SortOption } from '../types';

// the initial state using that type
interface TasksState {
  tasks: Task[];
  filter: FilterOption;
  searchQuery: string;
  sortBy: SortOption;
}

// the initial state
const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  filter: 'all',
  searchQuery: '',
  sortBy: 'createdAt'
};

// CRUD, search, filter & sort reducers 
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {

    // adds a new task to the state and local storage
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    // updates an existing task in the state and local storage
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },

    // deletes the task from the state and local storage
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    // toggles the completed status of the task in the state and local storage
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },

    // sets the filter option in the state
    setFilter: (state, action: PayloadAction<FilterOption>) => {
      state.filter = action.payload;
    },

    // sets the search query in the state
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // sets the sort option in the state
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    }
  }
});

export const { 
  addTask, 
  updateTask, 
  deleteTask, 
  toggleComplete, 
  setFilter,
  setSearchQuery,
  setSortBy 
} = tasksSlice.actions;
export default tasksSlice.reducer;
