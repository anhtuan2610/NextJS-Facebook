"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { loginApi } from "../services/auth-api";
import { authStorage } from "../utils/auth-storage";
import { toast } from "sonner";
import Input from "@/common/Input";

const schema = z.object({
  userName: z
    .string()
    .min(4, "user name at least 4 characters")
    .max(12, "user name has limit 12 characters"),
  password: z.string().min(3, "password at least 3 characters"),
});

export type LoginFormType = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationKey: ["authLogin"],
    mutationFn: async (data: LoginFormType) => {
      const response = await loginApi({
        stringUrl: "login",
        data: data,
      });
      return response;
    },
    onSuccess: (response) => {
      handleAccessToken(response.accessToken);
      toast.success("Login success !");
      router.push("/home");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Login fail !! " + error.message);
    },
  });

  useEffect(() => {
    if (authStorage.getToken()) {
      router.push("/home");
    }
  }, []);

  function handleAccessToken(accessToken: string) {
    authStorage.setToken(accessToken);
  }

  const onSubmitHandle = (data: LoginFormType) => {
    mutate(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full xl:w-[400px]">
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <div className="mb-4">
          <Input
            scale="medium"
            variant="primary"
            placeholder="Email or phone number"
            {...register("userName")}
          />
          <span className="text-red-700">{errors.userName?.message}</span>
        </div>

        <div className="mb-4">
          <Input
            scale="medium"
            variant="primary"
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <span className="text-red-700">{errors.password?.message}</span>
        </div>

        <button className="w-full bg-[#1877F2] py-3 rounded-lg text-white text-lg font-bold hover:bg-[#0d65d9] transition ease-in-out duration-200">
          Login
        </button>
        <div className="text-center mt-4">
          <div className="text-[#1877F2] text-sm hover:underline">
            Forgot password?
          </div>
        </div>
        <div className="py-5">
          <hr className="bg-[#CCCCCC]" />
        </div>
        <div className="w-full flex justify-center items-center">
          <Link
            className="flex justify-center items-center w-2/3 bg-[#42B72A] py-4 px-3 text-white font-bold text-base rounded-lg hover:bg-[#439e31] transition ease-in-out duration-200"
            href="/register"
          >
            Create new account
          </Link>
        </div>
      </form>
    </div>
  );
}
