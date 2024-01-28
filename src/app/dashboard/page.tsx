import FilterUI from "@/components/FilterUI";
import PageWrapper from "@/components/PageWrapper";
import Tasks from "@/components/Tasks";
import { getTasks } from "@/lib/get-task";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { priority, status, search } = searchParams ?? {};
  const taskResult = await getTasks(priority, status, search);

  return (
    <PageWrapper>
      <div className="flex flex-col items-center space-y-8   px-4">
        <div className=" max-w-2xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="w-full space-y-3">
            <FilterUI />
            <Tasks tasks={taskResult} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
