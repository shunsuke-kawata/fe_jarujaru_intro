"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import styles from "./top.module.css";
import CommonButton from "@/components/commons/commonButton";
const TopPage: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
      <div className={styles.playButtonDiv}>
        <CommonButton
          text="プレイ"
          width={300}
          height={120}
          onClick={() => router.push("/select")} // ボタンがクリックされた時の処理
        />
      </div>
    </>
  );
};
export default TopPage;
