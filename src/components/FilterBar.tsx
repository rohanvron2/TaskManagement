// filter bar component where the search, filter and sort options are present
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery, setSortBy } from '../store/tasksSlice';
import { RootState } from '../store/store';
import { FilterOption, SortOption } from '../types';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

// filter and sort options
const filterOptions: FilterOption[] = ['all', 'completed', 'pending'];
const sortOptions: SortOption[] = ['dueDate', 'createdAt'];

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const { filter, searchQuery, sortBy } = useSelector((state: RootState) => state.tasks);

  // updates the filter option
  const getDisplayText = (value: string) => {
    switch(value) {
      case 'all': return 'All Tasks';
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'dueDate': return 'Due Date';
      case 'createdAt': return 'Creation Date';
      default: return value;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* search Bar */}
      <div className="relative z-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search tasks..."
            className="block w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative z-30">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter
          </label>
          <Listbox value={filter} onChange={(value) => dispatch(setFilter(value as FilterOption))}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400">
                <span className="block truncate">{getDisplayText(filter)}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/90 backdrop-blur-sm py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filterOptions.map((option) => (
                    <Listbox.Option
                      key={option}
                      value={option}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {getDisplayText(option)}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* sort Dropdown */}
        <div className="relative z-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <Listbox value={sortBy} onChange={(value) => dispatch(setSortBy(value as SortOption))}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400">
                <span className="block truncate">{getDisplayText(sortBy)}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/90 backdrop-blur-sm py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sortOptions.map((option) => (
                    <Listbox.Option
                      key={option}
                      value={option}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {getDisplayText(option)}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
