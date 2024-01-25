import CreateTask from "@/components/CreateTask";
import FilterUI from "@/components/FilterUI";
import Tasks from "@/components/Tasks";
import UserDropdown from "@/components/UserDropdown";
import { headers } from "next/headers";

const getUser = async () => {
  const headerList = headers();
  const user_id = parseInt(headerList.get("id") || "");
  const res = await fetch(`${process.env.BACKEND_URL}/users/${user_id}`);
  let userRes = await res.json();
  return {
    name: userRes.name,
    email: userRes.email,
  };
};

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = await getUser();
  const { priority, status, search } = searchParams ?? {};
  return (
    <main className=" min-h-screen  p-8 md:p-24  ">
      <div className="flex flex-col items-center space-y-8 border border-black   py-8 px-4">
        <div className="z-10 max-w-2xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="w-full flex items-center justify-between ">
            <h2 className="text-center text-3xl">Easy Task Manager</h2>
            <div className="z-50">
              <UserDropdown user={user} />
            </div>
          </div>
        </div>
        <div className=" max-w-2xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="w-full space-y-3">
            <FilterUI />
            <Tasks priority={priority} status={status} search={search} />
          </div>
        </div>
        <CreateTask />
      </div>
    </main>
  );
}
