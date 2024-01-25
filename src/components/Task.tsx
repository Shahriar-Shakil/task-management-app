"use client";
import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import Modal from "./ModalCompoent";
import TaskCreateForm from "./Form/TaskCreateForm";
import { Badge } from "flowbite-react";
import { Checkbox, Label } from "flowbite-react";
import TaskEditForm from "./Form/TaskEditForm";
import { TaskInterface } from "@/lib/types";
import ModalComponent from "./ModalCompoent";

type Props = {
  task: TaskInterface;
};

export default function Task({ task }: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        className={` border rounded-md border-gray-400 w-full p-4 ${
          !task.status ? "opacity-55" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="w-24 md:w-52">
            <h2
              className={`text-sm font-bold line-clamp-1 hover:line-clamp-3 capitalize ${
                !task.status ? "line-through" : ""
              }`}
            >
              {task.title}
            </h2>
          </div>
          <div>
            <Badge
              className="capitalize"
              color={
                task.priority === "low"
                  ? "green"
                  : task.priority === "medium"
                  ? "yellow"
                  : task.priority === "high"
                  ? "red"
                  : ""
              }
            >
              {task.priority}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox className="w-6 h-6" checked={!task.status} />

            <button
              onClick={() => setOpenModal(true)}
              className="btn btn-outline btn-primary btn-xs"
            >
              <FiEdit />
            </button>
            <button className="btn btn-outline btn-error btn-xs">
              <FiTrash />
            </button>
          </div>
        </div>
      </div>

      <ModalComponent setOpenModal={setOpenModal} openModal={openModal}>
        <TaskEditForm setOpenModal={setOpenModal} data={task} />
      </ModalComponent>
    </>
  );
}
