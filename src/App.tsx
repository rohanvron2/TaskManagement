import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from '@headlessui/react'

// App component
const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Provider store={store}>

      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-pattern  pointer-events-none" />
        <div className="relative">
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto bg-blue-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 rounded-lg sm:px-8 sm:py-2">
              <div className="flex md:justify-center items-center mb-8 relative">
                <h2 className="text-2xl sm:text-4xl font-bold text-white sm:pl-0 sm:pt-0 pl-4 pt-4 md:absolute">
                  Tasks
                </h2>

                {/* add new task button */}
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center rounded bg-teal-500 py-2 px-4 text-sm text-white data-[hover]:bg-teal-600 data-[active]:bg-cyan-700 ml-auto border border-gray-50"
                >
                  <span className="relative z-10 flex items-center">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    New Task
                  </span>
                </Button>
              </div>

              <TaskList />
            </div>
          </main>
        </div>

        {/* add new task form pop up*/}
        {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="rounded-lg w-full max-w-2xl bg-blue-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 border border-gray-200">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Add New Task
                      </h3>
                      <TaskForm onClose={() => setIsFormOpen(false)} />
                    </div>
                  </div>
                </div>
              )}

      </div>
    </Provider>
  );
};

export default App;
