import { AppDispatch, selectUser } from "@/libs/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

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
        <label onClick={handleUserInfoClick}>
          {loginedUser.username
            ? `ログイン中：${loginedUser.username}`
            : "未ログイン"}
        </label>
      </div>
    </>
  );
};

export default UserInfo;
