"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
const Top = () => {
  const router = useRouter();
  return (
    <>
      <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
      <input
        type="button"
        value="プレイ"
        onClick={() => router.push("/select")}
      ></input>
    </>
  );
};
export default Top;
