import CreateTask from "@/components/CreateTask";
import FilterUI from "@/components/FilterUI";
import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <main className=" min-h-screen  p-8 md:p-24  ">
      <div className="flex flex-col items-center space-y-8 border border-black   py-8 px-4">
        <div className="z-10 max-w-2xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="w-full">
            <h2 className="text-center text-3xl">Easy Task Manager</h2>
          </div>
        </div>
        <div className="z-10 max-w-2xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="w-full space-y-3">
            <FilterUI />
            <Tasks />
          </div>
        </div>
        <CreateTask />
      </div>
    </main>
  );
}
