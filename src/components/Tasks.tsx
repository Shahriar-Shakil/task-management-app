import axios from "axios";
import { headers } from "next/headers";
import Task from "./Task";
import { TaskInterface } from "@/lib/types";

type Props = {};

const getTasks = async () => {
  const headerList = headers();
  const user_id = parseInt(headerList.get("id") || "");
  const tasks = await fetch(
    `${process.env.BACKEND_URL}/users/${user_id}/tasks`,
    { next: { revalidate: 0 } }
  );
  return await tasks.json();
};

export default async function Tasks({}: Props) {
  const taskResult = await getTasks();
  let taskView;
  if (taskResult?.length) {
    taskView = taskResult.map((item: TaskInterface) => (
      <Task key={item.id} task={item} />
    ));
  } else {
    taskView = <p className="text-center w-full py-5">No Task </p>;
  }

  return <div className="space-y-2">{taskView}</div>;
}
