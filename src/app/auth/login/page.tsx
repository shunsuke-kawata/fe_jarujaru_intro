"use client";
import { executeLogin } from "@/api/api";
import Header from "@/components/header";
import { loginParams } from "@/types/apiParamsType";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/libs/store";
import { LoginUserState, setLoginedUser } from "@/libs/userReducer";
import { setCookie } from "cookies-next";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import authStyles from "../auth.module.css";
import { executeLogout } from "@/utils/userInfoUtil";
import CommonButton from "@/components/commons/commonButton";
import CommonFormButton from "@/components/commons/commonFormButton";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginParams>();
  const router = useRouter();

  const onSubmit = async (data: loginParams) => {
    const res = await executeLogin(data.username, data.password);
    if (res.status === 200) {
      // ログイン成功時にStore,Cookieにユーザー情報を保存する
      setCookie("userId", res.data.user_id);
      setCookie("username", res.data.username);

      const tmpUser: LoginUserState = {
        userId: res.data.user_id,
        username: res.data.username,
      };
      dispatch(setLoginedUser(tmpUser));
      console.log("ログイン成功");
    } else {
      console.log("ログイン失敗");
    }
    router.push("/select"); // ログイン成功後にリダイレクト
  };

  return (
    <>
      <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
      <div className={authStyles.formDiv}>
        <label className={authStyles.formTitle}>ログイン</label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={authStyles.formElementDiv}>
            <label className={authStyles.formElementLabel}>
              ユーザー名
              <input
                className={authStyles.formElementInput}
                type="text"
                {...register("username", {
                  required: { value: true, message: "ユーザー名は必須です" },
                  maxLength: {
                    value: 10,
                    message: "10文字以下で入力してください",
                  },
                  minLength: { value: 4, message: "4文字以上入力してください" },
                })}
              />
            </label>
            <div className={authStyles.formErrorDiv}>
              {errors.username && <p>{errors.username.message}</p>}
            </div>
          </div>
          <div className={authStyles.formElementDiv}>
            <label className={authStyles.formElementLabel}>
              パスワード
              <input
                className={authStyles.formElementInput}
                type="password"
                {...register("password", {
                  required: { value: true, message: "パスワードは必須です" },
                  maxLength: {
                    value: 10,
                    message: "10文字以下で入力してください",
                  },
                  minLength: { value: 4, message: "4文字以上入力してください" },
                })}
              />
            </label>
            <div className={authStyles.formErrorDiv}>
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <div className={authStyles.mainButtonDiv}>
            <CommonFormButton
              text="ログイン"
              width={240}
              height={48}
              color="#FFFFFF"
              type="submit"
            />
          </div>
        </form>
        <div className={authStyles.otherButtonDiv}>
          <CommonButton
            text="トップへ"
            width={120}
            height={48}
            onClick={() => router.push("/top")} // ボタンがクリックされた時の処理
            color="#000000"
            backgroundColor="#FFFFFF"
          />
          <CommonButton
            text="新規登録する"
            width={120}
            height={48}
            onClick={() => router.push("/auth/signup")} // ボタンがクリックされた時の処理
            color="#000000"
            backgroundColor="#FFFFFF"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
