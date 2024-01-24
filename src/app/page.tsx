import CreateTask from "@/components/CreateTask";
import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-8 md:p-24">
      <div className="z-10 max-w-2xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="w-full">
          <h2 className="text-center text-3xl">Task Management App</h2>
        </div>
      </div>
      <div className="z-10 max-w-2xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="w-full">
          <Tasks />
        </div>
      </div>
      <CreateTask />
    </main>
  );
}
