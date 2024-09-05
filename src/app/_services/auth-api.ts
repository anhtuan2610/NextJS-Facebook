import { LoginFormType } from "../_components/Login";
import { RegisterFormType } from "../_components/Register";
import { ResponseLogin, User } from "../_utils/type-common";
import { post } from "./axiosConfig";

export async function registerApi({
  stringUrl,
  data,
}: {
  stringUrl: string;
  data: RegisterFormType;
}) {
  await post({
    url: `/Auth/${stringUrl}`,
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
  return await post<ResponseLogin>({
    url: `/Auth/${stringUrl}`,
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
  return await post<User>({
    url: `/Auth/${stringUrl}`,
    data: token
  })
};