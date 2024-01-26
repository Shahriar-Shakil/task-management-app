import FilterUI from "@/components/FilterUI";
import PageWrapper from "@/components/PageWrapper";
import Tasks from "@/components/Tasks";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { priority, status, search } = searchParams ?? {};
  return (
    <PageWrapper>
      <main className=" min-h-screen  p-3 md:p-16  ">
        <div className="flex flex-col items-center space-y-8   px-4">
          <div className=" max-w-2xl w-full items-center justify-between font-mono text-sm lg:flex">
            <div className="w-full space-y-3">
              <FilterUI />
              <Tasks priority={priority} status={status} search={search} />
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
