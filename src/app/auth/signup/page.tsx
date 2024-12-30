"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserForm from "@/components/userForm";
import { createUser } from "@/api/api";
import { UserFormProps } from "@/components/userForm";
import { signupParams } from "@/types/apiParamsType";

const SignupPage: React.FC = () => {
  const formProps: UserFormProps = {
    fields: [
      { name: "username", type: "text", labelname: "ユーザー名" },
      { name: "password", type: "password", labelname: "パスワード" },
    ],
    onSubmit: async (data: signupParams) => {
      console.log(data);
      const res = await createUser(data.username, data.password);
      if (res.status === 200) {
        return "登録に成功しました";
      } else {
        return "登録に失敗しました";
      }
    },
  };
  const router = useRouter();
  return (
    <>
      <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
      <UserForm fields={formProps.fields} onSubmit={formProps.onSubmit} />
    </>
  );
};

export default SignupPage;
