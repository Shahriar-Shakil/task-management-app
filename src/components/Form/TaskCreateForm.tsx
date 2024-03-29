"use client";
import axios from "axios";
import { Button, Select, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  title: string;
  priority: string;
};
type Props = {};
export default function TaskCreateForm({}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const result = await axios.post("/api/dashboard/tasks", {
        ...data,
        status: true,
      });
      setLoading(false);

      if (result.data.status === "success") {
        toast.success("Task Create Successfully");
        reset();
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(result.data.data);
      }
    } catch (error: any) {
      setLoading(true);

      toast.error(error.toString());
    }
  };

  return (
    <div className="max-w-2xl w-full">
      <form
        // action={createTaskAction}
        onSubmit={handleSubmit(onSubmit)}
        className=" shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl "
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <TextInput
                  type="text"
                  {...register("title", { required: "This is required." })}
                />
                <p className="text-red-500 text-xs">{errors?.title?.message}</p>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Priority
              </label>
              <div className="mt-2">
                <Select
                  {...register("priority", { required: "This is required." })}
                  className=" w-full"
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Pick one
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
                <p className="text-red-500 text-xs">
                  {errors?.priority?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-2 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Link href="/dashboard">
            <Button size={"xs"} outline>
              Back
            </Button>
          </Link>

          <Button
            className=""
            type="submit"
            size="xs"
            isProcessing={loading}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
