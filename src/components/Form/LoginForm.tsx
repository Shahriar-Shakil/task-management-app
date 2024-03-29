"use client";
import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  email: string;
  password: string;
};
export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/user/login", { ...data });
      setLoading(false);

      if (res.data.status === "success") {
        router.push(callbackUrl);
      } else {
        toast.error("No user found in this Mail");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <TextInput
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    required
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
                  <TextInput
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    autoComplete="current-password"
                    required
                  />
                  <p className="text-red-500">{errors.password?.message}</p>
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
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
