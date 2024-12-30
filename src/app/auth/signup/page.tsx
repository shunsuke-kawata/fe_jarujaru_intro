"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { createUser } from "@/api/api";
import { signupParams } from "@/types/apiParamsType";
import { useForm } from "react-hook-form";
import authStyles from "../auth.module.css";

const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupParams>();

  const onSubmit = async (data: signupParams) => {
    if (data.password !== data.confirmPassword) {
      console.log("パスワードが一致しません");
      return;
    }
    console.log(data);
    const res = await createUser(data.username, data.password);
    if (res.status === 200) {
      console.log("登録に成功しました");
    } else {
      console.log("登録に失敗しました");
    }
    router.push("/auth/login");
  };

  const router = useRouter();
  return (
    <>
      <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
      <div className={authStyles.formDiv}>
        <label className={authStyles.formTitle}>新規登録</label>
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
          <div className={authStyles.formElementDiv}>
            <label className={authStyles.formElementLabel}>
              確認用パスワード
              <input
                className={authStyles.formElementInput}
                type="password"
                {...register("confirmPassword", {
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
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <button type="submit">新規登録</button>
        </form>
        <div>
          <button type="button" onClick={() => router.push("/top")}>
            トップへ
          </button>
          <button type="button" onClick={() => router.push("/auth/login")}>
            ログインする
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
