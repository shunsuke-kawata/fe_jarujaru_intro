"use client";
import { AppDispatch } from "@/libs/store";
import { LoginUserState, setLoginedUser } from "@/libs/userReducer";
import { executeLogout } from "@/utils/userInfoUtil";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";

const UserInfoPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();
  const router = useRouter();

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
        <h1>User Info Page</h1>
        {userId ? <p>User ID: {userId}</p> : <p>Loading...</p>}
      </div>
      <div onClick={handleLogout}>ログアウト</div>
    </>
  );
};

export default UserInfoPage;
