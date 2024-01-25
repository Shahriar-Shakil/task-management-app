import { TaskInterface } from "@/lib/types";
import axios from "axios";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  title: string;
  priority: string;
};
type Props = {
  data: TaskInterface;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
export default function TaskEditForm({ data, setOpenModal }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    reset(data);
  }, [data, reset]);
  const closeModal = () => {
    setOpenModal(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const result = await axios.put("/api/dashboard/tasks", {
        ...data,
      });
      setLoading(false);
      if (result.data.status === "success") {
        toast.success("Update Successfully");
        reset();
        closeModal();
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
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("title", { required: "This is required." })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500 text-xs">{errors?.title?.message}</p>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Priority
              </label>
              <div className="mt-2">
                <select
                  {...register("priority", { required: "This is required." })}
                  className="select select-bordered w-full "
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Pick one
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <p className="text-red-500 text-xs">
                  {errors?.priority?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={closeModal}
          >
            Cancel
          </button>
          <Button
            className=""
            type="submit"
            size="md"
            isProcessing={loading}
            disabled={loading}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
