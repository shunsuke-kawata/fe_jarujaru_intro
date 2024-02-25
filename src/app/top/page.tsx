"use client";
import { useRouter } from "next/navigation";
const Top = () => {
  const router = useRouter();
  return (
    <>
      <h1>ジャルジャルでイントロクイズする奴</h1>
      <input
        type="button"
        value="プレイ"
        onClick={() => router.push("/select")}
      ></input>
    </>
  );
};
export default Top;
