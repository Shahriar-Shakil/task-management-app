"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TaskCreateForm from "./Form/TaskCreateForm";
import ModalComponent from "./ModalCompoent";

type Props = {};

export default function CreateTask({}: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="z-10 max-w-2xl w-full flex justify-center">
        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-outline btn-success btn-md"
        >
          <FiPlus />
        </button>
      </div>
      <ModalComponent setOpenModal={setOpenModal} openModal={openModal}>
        <TaskCreateForm setOpenModal={setOpenModal} />
      </ModalComponent>
    </>
  );
}
