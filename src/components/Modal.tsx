import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Modal({ children }: Props) {
  return (
    <dialog id="my_modal" className="modal">
      <div className="modal-box w-8/12 ">{children}</div>
    </dialog>
  );
}
