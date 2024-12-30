"use client";
import { executeLogin } from "@/api/api";
import Header from "@/components/header";
import UserForm, { UserFormProps } from "@/components/userForm";
import { loginParams } from "@/types/apiParamsType";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, selectUser } from "@/libs/store";
import { LoginUserState, setLoginedUser } from "@/libs/userReducer";
import { getCookie, setCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { executeLogout } from "@/utils/userInfoUtil";
import { get } from "http";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formProps: UserFormProps = {
    fields: [
      { name: "username", type: "text", labelname: "ユーザー名" },
      { name: "password", type: "password", labelname: "パスワード" },
    ],
    onSubmit: async (data: loginParams) => {
      const res = await executeLogin(data.username, data.password);
      if (res.status === 200) {
        // ログイン成功時にStore,Cookieにユーザー情報を保存する
        setCookie("userId", res.data.user_id);
        setCookie("username", res.data.username);

        console.log(getCookie("userId"));
        console.log(getCookie("username"));

        const tmpUser: LoginUserState = {
          userId: res.data.user_id,
          username: res.data.username,
        };
        dispatch(setLoginedUser(tmpUser));
        console.log(getCookie("username"));
        return "ログインに成功しました";
      } else {
        return "ログインに失敗しました";
      }
    },
  };
  return (
    <>
      <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
      <UserForm fields={formProps.fields} onSubmit={formProps.onSubmit} />
      <button onClick={executeLogout}>ログアウト</button>
    </>
  );
};

export default LoginPage;
