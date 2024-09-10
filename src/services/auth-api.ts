
import { LoginFormType } from "@/components/Login";
import { RegisterFormType } from "@/components/Register";
import { ResponseAuth, TUser } from "@/utils/type-common";
import { post } from "./axiosConfig";

export async function registerApi({
  stringUrl,
  data,
}: {
  stringUrl: string;
  data: RegisterFormType;
}) {
  return await post<ResponseAuth>({
    url: `/auth/${stringUrl}`,
    data,
  });
}

export async function loginApi({
  stringUrl,
  data,
}: {
  stringUrl: string;
  data: LoginFormType;
}) {
  return await post<ResponseAuth>({
    url: `/auth/${stringUrl}`,
    data,
  });
}

export async function getUser({
  stringUrl,
  token,
}: {
  stringUrl: string;
  token: string;
  }) {
  return await post<TUser>({
    url: `/auth/${stringUrl}`,
    data: token
  })
};