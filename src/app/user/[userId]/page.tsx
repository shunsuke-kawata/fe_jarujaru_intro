"use client";
import { AppDispatch } from "@/libs/store";
import { LoginUserState, setLoginedUser } from "@/libs/userReducer";
import { executeLogout } from "@/utils/userInfoUtil";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Header from "@/components/header";
import styles from "./user.module.css";
import { useState } from "react";
import CommonButton from "@/components/commons/commonButton";
import ButtonProps from "@/components/commons/commonButton";
const UserInfoPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();
  const router = useRouter();

  //   const [loginedUserInfo, setLoginedUserInfo] = useState<LoginUserState>();

  const handleLogout = () => {
    //cookieとstoreのユーザー情報を削除
    executeLogout();
    const logoutUser: LoginUserState = {
      userId: null,
      username: null,
    };
    dispatch(setLoginedUser(logoutUser));
    router.push("/auth/login");
  };

  return (
    <>
      <div>
        <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
        <div className={styles.userInfoDiv}>
          <p>ユーザID: {userId}</p>
        </div>
      </div>
      <div className={styles.buttonDiv}>
        <CommonButton
          text="トップへ"
          width={120}
          height={48}
          onClick={() => router.push("/top")}
          backgroundColor="#FFFFFF"
          color="#000000"
        />
        <CommonButton
          text="プレイリスト選択へ"
          width={186}
          height={48}
          onClick={() => router.push("/select")}
          backgroundColor="#FFFFFF"
          color="#000000"
        />

        <CommonButton
          text="ログアウト"
          width={120}
          height={48}
          onClick={handleLogout} // ボタンがクリックされた時の処理
          backgroundColor="#FF0000"
        />
      </div>
    </>
  );
};

export default UserInfoPage;
