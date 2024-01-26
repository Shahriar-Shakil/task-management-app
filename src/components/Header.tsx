import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import UserDropdown from "./UserDropdown";
import { FiEdit } from "react-icons/fi";

type Props = {
  user: { name: string; email: string };
};

export default function Header({ user }: Props) {
  return (
    <header className="max-w-5xl mx-auto flex justify-between items-center p-4">
      <Link
        className="text-3xl font-bold text-gray-800 hover:text-gray-600"
        href="/"
      >
        Next <br />
        Todo App
      </Link>
      <nav className="flex gap-2 items-center">
        <Link href="/dashboard/createTask">
          <Button outline size={"xs"}>
            <FiEdit /> Create Task
          </Button>
        </Link>
        <UserDropdown user={user} />
      </nav>
    </header>
  );
}
