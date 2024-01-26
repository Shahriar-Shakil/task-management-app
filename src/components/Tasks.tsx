import { TaskInterface } from "@/lib/types";
import { headers } from "next/headers";
import Task from "./Task";
import { getTasks } from "@/lib/get-task";

type Props = {
  priority?: string | string[];
  status?: string | string[];
  search?: string | string[];
};

export default async function Tasks({ priority, status, search }: Props) {
  const taskResult = await getTasks(priority, status, search);
  // console.log(taskResult, "taskresult");
  let taskView;
  if (taskResult?.length) {
    taskView = taskResult?.map((item: TaskInterface) => (
      <Task key={item.id} task={item} />
    ));
  } else {
    taskView = <p className="text-center w-full py-5">No Task </p>;
  }

  return <div className="space-y-2">{taskView}</div>;
}
