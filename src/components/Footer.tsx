import React from "react";
import { FaGithub } from "react-icons/fa";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="w-full  p-2 border-t absolute  bottom-0">
      <div className="flex flex-col items-center">
        <a href="https://github.com/Shahriar-Shakil" target="_blank">
          <FaGithub className="w-10 h-10" />
        </a>
        <span>Github: shahriar-shakil</span>
      </div>
    </footer>
  );
}
