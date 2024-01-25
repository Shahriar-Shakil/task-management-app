"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";

type Props = {};

export default function FilterUI({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = React.useState("");
  // const [isSearching, setIsSearching] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (searchTerm?.length) {
      router.push(
        pathname + "?" + createQueryString("search", debouncedSearchTerm)
      );
    } else {
      router.replace("/dashboard", undefined);
    }
  }, [debouncedSearchTerm]);
  const handlePriority = (e: any) => {
    router.push(pathname + "?" + createQueryString("priority", e.target.value));
  };
  const handleStatus = (e: any) => {
    router.push(pathname + "?" + createQueryString("status", e.target.value));
  };
  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={handleChange}
            type="search"
            id="default-search"
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search "
            required
          />
        </div>
      </form>
      <div className=" col-start-2 md:col-start-3 col-span-3 md:col-span-2 flex	gap-2">
        <select
          onChange={handlePriority}
          className="select select-bordered select-md w-full max-w-xs"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          onChange={handleStatus}
          className="select select-bordered select-md w-full max-w-xs"
        >
          <option value="all">All</option>
          <option value="1">Complete</option>
          <option value="0">Not Complete</option>
        </select>
      </div>
    </div>
  );
}
