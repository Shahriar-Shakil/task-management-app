import React from "react";

type Props = {};

export default function FilterUI({}: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <form className="col-span-4 md:col-span-1">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search "
            required
          />
        </div>
      </form>
      <div className=" col-start-2 md:col-start-3 col-span-3 md:col-span-2 flex	gap-2">
        <select className="select select-bordered select-md w-full max-w-xs">
          <option value="" selected>
            All
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select className="select select-bordered select-md w-full max-w-xs">
          <option value="" selected>
            All
          </option>
          <option value="1">Complete</option>
          <option value="0">In Complete</option>
        </select>
      </div>
    </div>
  );
}
