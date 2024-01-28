import TaskCreateForm from "@/components/Form/TaskCreateForm";
import PageWrapper from "@/components/PageWrapper";

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
      <div className="flex flex-col items-center space-y-8   px-4">
        <TaskCreateForm />
      </div>
    </PageWrapper>
  );
}
