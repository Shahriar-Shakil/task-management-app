import { headers } from "next/headers";
import queryString from "query-string";

export const getTasks = async (
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
  const response = await fetch(url, {
    cache: "no-store",
  });
  if (!response.ok) {
    console.log("unable to fetch data");
    return [];
  }
  return await response.json();
};
