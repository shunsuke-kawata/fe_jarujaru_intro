"use client";
import { makeStore, AppStore } from "@/libs/store";
import { useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, selectUser } from "@/libs/store";
import { LoginUserState, setLoginedUser } from "@/libs/userReducer";
import { getCookie, setCookie } from "cookies-next";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // storeRef.currentが未定義の場合、makeStore()を実行してstoreRef.currentに代入する
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  // Redux ストアの初期化処理を useEffect 内で実行
  useEffect(() => {
    const userId = getCookie("userId") as string | null;
    const username = getCookie("username") as string | null;
    console.log(userId);
    console.log(username);

    if (userId && username) {
      // Redux ストアにユーザー情報をセット
      storeRef.current?.dispatch(setLoginedUser({ userId, username }));
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
