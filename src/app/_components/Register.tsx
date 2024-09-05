"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../_services/auth-api";
import { useRouter } from "next/navigation";

const schema = z.object({
  userName: z.string().min(4, "user name min = 4").max(12, "name max = 12"),
  email: z.string().email(),
  password: z.string().min(3, "password at least 3 characters "),
  fullName: z.string().min(3, "full name min = 3"),
});

export type RegisterFormType = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      fullName: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationKey: ["authRegister"],
    mutationFn: async (data: RegisterFormType) => {
      await registerApi({
        stringUrl: "register",
        data: data,
      });
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const onSubmitHandle = (data: RegisterFormType) => {
    mutate(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full xl:w-[400px]">
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="User name"
            className="block w-full h-14 border border-gray-300 rounded-lg px-4 text-base focus:border-[#1877F2] outline-none"
            {...register("userName")}
          />
          <span className="text-red-700">{errors.userName?.message}</span>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            className="block w-full h-14 border border-gray-300 rounded-lg px-4 text-base focus:border-[#1877F2] outline-none"
            {...register("email")}
          />
          <span className="text-red-700">{errors.email?.message}</span>
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

        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="block w-full h-14 border border-gray-300 rounded-lg px-4 text-base focus:border-[#1877F2] outline-none"
            {...register("fullName")}
          />
          <span className="text-red-700">{errors.fullName?.message}</span>
        </div>

        <button className="w-full bg-[#1877F2] py-3 rounded-lg text-white text-lg font-bold hover:bg-[#0d65d9] transition ease-in-out duration-200">
          Register
        </button>
        <div className="text-center mt-4">
          <a href="#" className="text-[#1877F2] text-sm hover:underline">
            Already has account ?
          </a>
        </div>
        <div className="py-5">
          <hr className="bg-[#CCCCCC]" />
        </div>
        <div className="w-full flex justify-center items-center">
          <Link
            className="flex justify-center items-center w-2/3 bg-[#42B72A] py-4 px-3 text-white font-bold text-base rounded-lg hover:bg-[#439e31] transition ease-in-out duration-200"
            href="/login"
          >
            Let's Login
          </Link>
        </div>
      </form>
    </div>
  );
}
