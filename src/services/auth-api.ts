import { post } from "./axiosConfig";
import { ResponseAuth, TUser } from "@/utils/type-common";
import { RegisterFormType } from "@/app/register/_components/RegisterForm";
import { LoginFormType } from "@/app/login/_components/LoginForm";

export async function registerApi({
  data,
}: {
  data: RegisterFormType;
}) {
  return await post<ResponseAuth>({
    url: `/auth/register`,
    data,
  });
}

export async function loginApi({
  data,
}: {
  data: LoginFormType;
}) {
  return await post<ResponseAuth>({
    url: `/auth/login`,
    data,
  });
}

export async function getUser({
  token,
}: {
  token?: string;
  }) {
  return await post<TUser>({
    url: `/auth/user`,
    data: token
  })
};
