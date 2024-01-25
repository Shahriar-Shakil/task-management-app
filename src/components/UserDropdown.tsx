"use client";

import React from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { extractFirstLetters } from "@/utils/utility";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  user: { name: string; email: string };
};

export default function UserDropdown({ user }: Props) {
  const name: string = extractFirstLetters(user.name);

  const handleSignOut = async () => {
    let res = await axios.get("/api/user/login");

    if (res.data["status"] === "success") {
      toast.success("Logout success");
      window.location.href = "/";
    } else {
      toast.error("Request Fail");
    }
  };
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <span>
          <Avatar placeholderInitials={name} rounded bordered color="purple" />
        </span>
      )}
    >
      <Dropdown.Header>
        <span className="block text-sm">{user.name}</span>
        <span className="block truncate text-sm font-medium">{user.email}</span>
      </Dropdown.Header>
      <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
