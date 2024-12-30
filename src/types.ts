export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  colorScheme: {
    background: string;
    text: string;
  };
}

// type for the sort and filter options
export type SortOption = 'dueDate' | 'createdAt';
export type FilterOption = 'all' | 'completed' | 'pending';