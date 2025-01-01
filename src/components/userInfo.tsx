import { AppDispatch, selectUser } from "@/libs/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./components.module.css";
import { useRouter } from "next/navigation";
import CommonButton from "./commons/commonButton";
import { log } from "console";

const UserInfo = () => {
  const router = useRouter();
  const loginedUser = useSelector(selectUser);

  const handleUserInfoClick = () => {
    if (loginedUser.userId) {
      router.push(`/user/${loginedUser.userId}`);
    } else {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    console.log(loginedUser);
  }, [loginedUser]);
  return (
    <>
      <div className={styles.userInfoDiv}>
        <CommonButton
          text={
            loginedUser.username
              ? `ログイン中：${loginedUser.username}`
              : `未ログイン`
          }
          width={
            loginedUser.username
              ? 120 + loginedUser.username.length * 10
              : 40 + "未ログイン".length * 10
          }
          height={40}
          onClick={handleUserInfoClick}
          backgroundColor="#FFFFFF"
          color="#000000"
        />
      </div>
    </>
  );
};

export default UserInfo;
