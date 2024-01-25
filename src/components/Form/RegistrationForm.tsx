"use client";
import axios from "axios";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "flowbite-react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};
export default function RegistrationForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const postData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    // Set loading to true before making an asynchronous call
    setLoading(true);
    try {
      let res = await axios.post("/api/user/registration", { ...postData });
      setLoading(false);

      if (res.data.status === "success") {
        toast.success("Registration Success");
        router.replace("/");
      } else {
        toast.error(res.data.data);
      }
    } catch (error) {
      setLoading(false);

      console.log(error, "error in catch");
      toast.error("500-Error during registration");
    }
  };
  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("name", {
                      required: " Name is required",
                    })}
                  />
                  <p className="text-red-500">{errors?.name?.message}</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    autoComplete="username"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500">{errors.email?.message}</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-300">{errors.email?.message}</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    {...register("confirm_password", {
                      required: true,
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Your Password do no match";
                        }
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-300">
                    {errors.confirm_password?.message}
                  </p>
                </div>
              </div>

              <div>
                <Button
                  className="w-full"
                  type="submit"
                  size="md"
                  isProcessing={loading}
                  disabled={loading}
                >
                  Register
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Already a{" "}
                  <Link
                    href="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Member
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
