"use client";
import React from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "./Modal";
import TaskCreateForm from "./TaskCreateForm";

type Props = {};

export default function CreateTask({}: Props) {
  const showModal = () => {
    const modalElement = document.getElementById(
      "my_modal"
    ) as HTMLDialogElement | null;

    if (modalElement) {
      modalElement.showModal();
    }
  };
  return (
    <>
      <div className="z-10 max-w-2xl w-full flex justify-center">
        <button
          onClick={showModal}
          className="btn btn-outline btn-success btn-md"
        >
          <FiPlus />
        </button>
      </div>
      <Modal>
        <TaskCreateForm />
      </Modal>
    </>
  );
}
