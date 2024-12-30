// colors for each task Background and text color
import { Task } from '../types';

export interface ColorScheme {
  background: string;
  text: string;
}

// color schemes
export const colorSchemes: ColorScheme[] = [
  { background: 'bg-blue-100', text: 'text-gray-800' },
  { background: 'bg-purple-100', text: 'text-gray-800' },
  { background: 'bg-green-100', text: 'text-gray-800' },
  { background: 'bg-yellow-100', text: 'text-gray-800' },
  { background: 'bg-pink-100', text: 'text-gray-800' },
  { background: 'bg-indigo-600', text: 'text-white' },
  { background: 'bg-blue-600', text: 'text-white' },
  { background: 'bg-purple-600', text: 'text-white' },
  { background: 'bg-teal-600', text: 'text-white' },
];

// get random color scheme
export const getRandomColorScheme = (lastUsedColors: ColorScheme[] = []): ColorScheme => {
  const availableColors = colorSchemes.filter(color =>
    !lastUsedColors.some(usedColor =>
      usedColor.background === color.background
    )
  );
  
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  return availableColors[randomIndex] || colorSchemes[0];
};

// get last used colors so that they are not repeated
export const getLastUsedColors = (tasks: Task[]): ColorScheme[] => {
  return tasks.slice(-2).map(task => task.colorScheme);
};
