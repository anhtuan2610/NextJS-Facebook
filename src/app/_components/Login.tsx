"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginApi } from "../_services/auth-api";
import { useRouter } from "next/navigation";
import { ResponseLogin } from "../_utils/type-common";
import { authStorage } from "../_utils/auth-storage";
import { useEffect } from "react";

const schema = z.object({
  userName: z.string().min(4, "user name min = 4").max(12, "name max = 12"),
  password: z.string().min(3, "password at least 3 characters "),
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
      const response: ResponseLogin = await loginApi({
        stringUrl: "login",
        data: data,
      });
      return response;
    },
    onSuccess: (response) => {
      handleAccessToken(response.accessToken);
      router.push("/home");
    },
    onError: (error) => {
      console.error("Login failed:", error);
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
          <input
            type="text"
            placeholder="Email or phone number"
            className="block w-full h-14 border border-gray-300 rounded-lg px-4 text-base focus:border-[#1877F2] outline-none"
            {...register("userName")}
          />
          <span className="text-red-700">{errors.userName?.message}</span>
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="block w-full h-14 border border-gray-300 rounded-lg px-4 text-base focus:border-[#1877F2] outline-none"
            {...register("password")}
          />
          <span className="text-red-700">{errors.password?.message}</span>
        </div>

        <button className="w-full bg-[#1877F2] py-3 rounded-lg text-white text-lg font-bold hover:bg-[#0d65d9] transition ease-in-out duration-200">
          Login
        </button>
        <div className="text-center mt-4">
          <a href="#" className="text-[#1877F2] text-sm hover:underline">
            Forgot password?
          </a>
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
