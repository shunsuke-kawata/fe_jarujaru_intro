"use client";
import { AppDispatch, selectUser } from "@/libs/store";
import { LoginUserState, setLoginedUser } from "@/libs/userReducer";
import { executeLogout } from "@/utils/userInfoUtil";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/header";
import styles from "./user.module.css";
import { use, useEffect, useState } from "react";
import CommonButton from "@/components/commons/commonButton";
import { deleteUser, getPlayData } from "@/api/api";
import { PlayData } from "@/types/apiResponseType";
import { countTandF } from "@/utils/userInfoUtil";
import InfoDataDiv from "@/components/infoDataDiv";

const UserInfoPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();
  const router = useRouter();
  const loginedUser = useSelector(selectUser);
  const [playData, setPlayData] = useState<PlayData[]>([]);

  const [countDict, setCountDict] = useState<{
    playNum: { value: number; title: string };
    correctNum: { value: number; title: string };
    inCorrectNum: { value: number; title: string };
  }>({
    playNum: { value: 0, title: "プレイ総数" },
    correctNum: { value: 0, title: "今までにあってた奴ら" },
    inCorrectNum: { value: 0, title: "今までに間違えた奴ら" },
  });

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

  const handleDeleteUser = () => {
    if (!userId) return;
    if (typeof userId === "string") {
      deleteUser(userId);
    }
    const initUser: LoginUserState = {
      userId: null,
      username: null,
    };
    dispatch(setLoginedUser(initUser));
    router.push("/top");
  };

  useEffect(() => {
    //ユーザーのプレイデータを取得

    const fetchPlayData = async () => {
      if (!userId) return;
      if (typeof userId === "string") {
        const data = await getPlayData(userId);
        setPlayData(data);
      }
    };

    fetchPlayData();
  }, []);

  useEffect(() => {
    const countTmp = countTandF(playData);
    setCountDict((prev) => ({
      playNum: { ...prev.playNum, value: playData.length },
      correctNum: { ...prev.correctNum, value: countTmp.trueCount },
      inCorrectNum: { ...prev.inCorrectNum, value: countTmp.falseCount },
    }));
  }, [playData]);

  useEffect(() => {
    console.log(countDict);
  }, [countDict]);

  return (
    <>
      <div>
        <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
        <div className={styles.userInfoDiv}>
          <p>ID: {loginedUser.userId}</p>
          <div className={styles.userInfoMainDiv}>
            <p className={styles.usernameP}>{loginedUser.username}</p>
            <div className={styles.flexContainer}>
              {Object.entries(countDict).map(([key, value]) => (
                <InfoDataDiv
                  key={key}
                  title={value.title}
                  score={value.value}
                />
              ))}
            </div>
          </div>
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
      <div className={styles.buttonDiv}>
        <CommonButton
          text="ユーザー削除"
          width={400}
          height={48}
          onClick={handleDeleteUser}
          backgroundColor="#FF0000"
        />
      </div>
    </>
  );
};

export default UserInfoPage;
