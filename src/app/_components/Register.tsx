"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi } from "@/services/auth-api";
import Input from "../_components/common/Input";

const schema = z
  .object({
    userName: z
      .string()
      .min(4, "user name at least 4 characters")
      .max(12, "name max has limit 12 characters"),
    email: z.string().email(),
    password: z.string().min(3, "password at least 3 characters"),
    rePassword: z.string().min(3, "password at least 3 characters"),
    fullName: z.string().min(3, "full name at least 3 characters"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password do not match",
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
      rePassword: "",
      fullName: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });
  
  const onSubmitHandle = async (data: RegisterFormType) => {
    try {
      await registerApi({
        stringUrl: "register",
        data: data,
      });

      toast.success("Register success, let's login!");
      router.push("/login");
    } catch (error: any) {
      toast.error("Registration failed !! " + error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full xl:w-[400px]">
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <div className="mb-4">
          <Input
            scale="medium"
            variant="primary"
            placeholder="User name"
            {...register("userName")}
          />
          <span className="text-red-700">{errors.userName?.message}</span>
        </div>

        <div className="mb-4">
          <Input
            scale="medium"
            variant="primary"
            placeholder="Email"
            {...register("email")}
          />
          <span className="text-red-700">{errors.email?.message}</span>
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

        <div className="mb-4">
          <Input
            scale="medium"
            variant="primary"
            placeholder="Repeat password"
            {...register("rePassword")}
            type="password"
          />
          <span className="text-red-700">{errors.rePassword?.message}</span>
        </div>

        <div className="mb-4">
          <Input
            scale="medium"
            variant="primary"
            placeholder="Full name"
            {...register("fullName")}
          />
          <span className="text-red-700">{errors.fullName?.message}</span>
        </div>

        <button className="w-full bg-[#1877F2] py-3 rounded-lg text-white text-lg font-bold hover:bg-[#0d65d9] transition ease-in-out duration-200">
          Register
        </button>
        <div className="text-center mt-4">
          <div className="text-[#1877F2] text-sm hover:underline">
            Already has account ?
          </div>
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
