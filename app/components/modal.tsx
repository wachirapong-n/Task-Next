import { METHODS } from 'http';
import React, { ReactNode, useState } from 'react';

const date = new Date();
const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
const localDate = new Date(date.getTime() - timezoneOffset);
const minDate = localDate.toISOString().slice(0, 16)

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}



const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [newTaskForm, setNewTaskForm] = useState({
    taskName: "",
    description: "",
    dueDate: ""
  });


  const handleChange = (e) => {
    const name = e.target.value
    newTaskForm.taskName = name;
    setNewTaskForm({ ...newTaskForm })

  }

  const handleSubmit = async () => {

    try {
      const res = await fetch("/api/add-new-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTaskForm)
      })

    } catch (error) {
      console.log(error)
    }
  }


  if (!isOpen) return null;

  return (
    <div>


      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        aria-hidden="true"
        onClick={onClose}
      >
        <div
          className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add New Task
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>

            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Task
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type task name"
                  required
                />
              </div>

            </div>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Task description"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="start"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Due Date
              </label>
              <input
                type="datetime-local"
                min={minDate}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >

              Add task
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default Modal;