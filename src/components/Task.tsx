"use client";
import { TaskInterface } from "@/lib/types";
import { Badge, Button } from "flowbite-react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { ImCheckboxUnchecked } from "react-icons/im";
import TaskEditForm from "./Form/TaskEditForm";
import ModalComponent from "./ModalCompoent";

type Props = {
  task: TaskInterface;
  handleDeleteTask: (data: any) => void;
  handleChangeStatus: (data: any) => void;
};

export default function Task({
  task,
  handleDeleteTask,
  handleChangeStatus,
}: Props) {
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

          <div className="flex items-center gap-1 md:gap-2">
            <Button
              onClick={() => handleChangeStatus(task)}
              color="light"
              size="xs"
            >
              {task.status ? (
                <ImCheckboxUnchecked className="" />
              ) : (
                <FaCheck className="" />
              )}
            </Button>

            <Button onClick={() => setOpenModal(true)} color="blue" size="xs">
              <FiEdit />
            </Button>
            <Button
              onClick={() => handleDeleteTask(task.id)}
              color="failure"
              size="xs"
            >
              <FiTrash />
            </Button>
          </div>
        </div>
      </div>

      <ModalComponent setOpenModal={setOpenModal} openModal={openModal}>
        <TaskEditForm setOpenModal={setOpenModal} data={task} />
      </ModalComponent>
    </>
  );
}
