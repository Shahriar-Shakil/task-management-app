import { TaskInterface } from "@/lib/types";
import { headers } from "next/headers";
import Task from "./Task";
import queryString from "query-string";

type Props = {
  priority?: string | string[];
  status?: string | string[];
  search?: string | string[];
};

const getTasks = async (
  priority?: string | string[],
  status?: string | string[],
  search?: string | string[]
) => {
  const headerList = headers();
  const user_id = parseInt(headerList.get("id") || "");
  let url = `${process.env.BACKEND_URL}/users/${user_id}/tasks`;

  let queryParams: any = {};
  // priority
  if (priority && priority !== "all") {
    const priorityValue = Array.isArray(priority)
      ? priority.join(",")
      : priority;
    queryParams.priority = priorityValue;
  }
  // status
  if (status && status !== "all") {
    const statusValue = Array.isArray(status) ? status.join(",") : status;
    queryParams.status = parseInt(statusValue) ? true : false;
  }
  // search
  if (search) {
    queryParams.search = search;
  }

  const queryStringParams = queryString.stringify(queryParams);
  if (queryStringParams) {
    url += `?${queryStringParams}`;
  }

  // console.log(url, queryParams);
  const response = await fetch(url, { next: { revalidate: 0 } });
  if (!response.ok) {
    console.log("unable to fetch data");
    return [];
  }
  return await response.json();
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
