"use client";

import React from "react";
import { Avatar, Dropdown } from "flowbite-react";

type Props = {};

export default function UserDropdown({}: Props) {
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <span>
          <Avatar placeholderInitials="RR" rounded bordered color="purple" />
        </span>
      )}
    >
      <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">
          bonnie@flowbite.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
