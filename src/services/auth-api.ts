import { get, post } from "./axiosConfig";
import { TResponseAuth, TUser } from "@/utils/type-common";
import { RegisterFormType } from "@/app/register/_components/register-form";
import { LoginFormType } from "@/app/login/_components/login-form";

export async function registerApi({
  data,
}: {
  data: RegisterFormType;
}) {
  return await post<TResponseAuth>({
    url: "/auth/register",
    data,
  });
}

export async function loginApi({
  data,
}: {
  data: LoginFormType;
}) {
  return await post<TResponseAuth>({
    url: "/auth/login",
    data,
  });
}

export async function getUser() {
  return await get<TUser>({
    url: "/auth/user"
  })
};
