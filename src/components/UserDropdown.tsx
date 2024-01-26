"use client";

import React, { useState } from "react";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { extractFirstLetters } from "@/utils/utility";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  user: { name: string; email: string };
};

export default function UserDropdown({ user }: Props) {
  const name: string = extractFirstLetters(user.name);
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    try {
      let res = await axios.get("/api/user/login");
      setLoading(false);

      if (res.data["status"] === "success") {
        toast.success("Logout success");
        window.location.href = "/";
      } else {
        toast.error("Request Fail");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Request Fail");
    }
  };
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <span>
          <Avatar placeholderInitials={name} rounded bordered color="gray" />
        </span>
      )}
    >
      <Dropdown.Header>
        <span className="block text-sm">{user.name}</span>
        <span className="block truncate text-sm font-medium">{user.email}</span>
      </Dropdown.Header>
      <Button
        outline
        color="gray"
        className="w-full border-0 outline-none"
        onClick={handleSignOut}
        isProcessing={loading}
        disabled={loading}
      >
        Sign out
      </Button>
    </Dropdown>
  );
}
