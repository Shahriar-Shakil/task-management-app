"use client";
import { changeStatusAction, deleteTaskAction } from "@/app/actions";
import { TaskInterface } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useOptimistic, useTransition } from "react";
import Task from "./Task";

type Props = {
  tasks: any;
};

export default function Tasks({ tasks }: Props) {
  const searchParams = useSearchParams();
  const priority = searchParams.get("priority");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const [isPending, startTransition] = useTransition();
  const [optimisticTask, updateOptimisticTask] = useOptimistic<any>(
    tasks,
    // @ts-ignore
    (state: any[], updateTasks: any) => {
      console.log(updateTasks, "up");
      return [...updateTasks];
    }
  );

  useEffect(() => {
    // filter by priority
    if (priority) {
      const filterPriority = optimisticTask.filter((item: any) => {
        if (priority === "all") {
          return item;
        } else if (item.priority === priority) {
          return item;
        }
      });
      startTransition(() => {
        updateOptimisticTask(filterPriority);
      });
    }
    // filter by status
    if (status) {
      const filterStatus = optimisticTask.filter((item: any) => {
        if (status === "all") {
          return item;
        } else if (item.status == status) {
          return item;
        }
      });
      startTransition(() => {
        updateOptimisticTask(filterStatus);
      });
    }
    // filter by input search
    if (search) {
      const filterSearch = optimisticTask.filter((item: any) => {
        if (item.title.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      });
      startTransition(() => {
        updateOptimisticTask(filterSearch);
      });
    }
  }, [priority, status, search]);

  const handleDeleteTask = async (id: any) => {
    const filterTask = optimisticTask.filter(
      (item: any) => Number(item.id) !== Number(id)
    );
    startTransition(() => {
      updateOptimisticTask(filterTask);
      deleteTaskAction(id);
    });
  };
  const handleChangeStatus = async (data: any) => {
    const updateStatus = optimisticTask.map((item: any) => {
      if (Number(item.id) === Number(data.id)) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    startTransition(() => {
      updateOptimisticTask(updateStatus);
      changeStatusAction(data);
    });
  };

  let taskView;
  if (optimisticTask?.length) {
    taskView = optimisticTask?.map((item: TaskInterface) => (
      <Task
        key={item.id}
        task={item}
        handleDeleteTask={handleDeleteTask}
        handleChangeStatus={handleChangeStatus}
      />
    ));
  } else {
    taskView = <p className="text-center w-full py-5">No Task </p>;
  }

  return <div className="space-y-2">{taskView}</div>;
}
