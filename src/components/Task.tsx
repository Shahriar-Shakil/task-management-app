"use client";
import { TaskInterface } from "@/lib/types";
import axios from "axios";
import { Badge, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { ImCheckboxUnchecked } from "react-icons/im";
import TaskEditForm from "./Form/TaskEditForm";
import ModalComponent from "./ModalCompoent";

type Props = {
  task: TaskInterface;
};

export default function Task({ task }: Props) {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (id: any) => {
    setDeleteLoading(true);
    try {
      const result = await axios.delete("/api/dashboard/tasks", {
        data: {
          id,
        },
      });
      setDeleteLoading(false);
      if (result.data.status === "success") {
        toast.success("Task Delete Successfully");
        router.refresh();
      } else {
        toast.error(result.data.data);
      }
    } catch (error: any) {
      setDeleteLoading(false);

      toast.error(error.toString());
    }
  };
  const handleChangeStatus = async (data: TaskInterface) => {
    setStatusLoading(true);
    try {
      const result = await axios.put("/api/dashboard/tasks", {
        id: data.id,
        status: !data.status,
      });
      setStatusLoading(false);

      if (result.data.status === "success") {
        toast.success("Update Successfully");

        router.refresh();
      } else {
        toast.error(result.data.data);
      }
    } catch (error: any) {
      setStatusLoading(false);

      toast.error(error.toString());
    }
  };
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
            <Button
              onClick={() => handleChangeStatus(task)}
              color="light"
              size="xs"
              disabled={statusLoading}
              isProcessing={statusLoading}
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
              onClick={() => handleDelete(task.id)}
              color="failure"
              size="xs"
              disabled={deleteLoading}
              isProcessing={deleteLoading}
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
