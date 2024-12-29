"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import styles from "./styles.module.css";
const TopPage: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
      <div className={styles.playButtonDiv}>
        <input
          className={styles.playButton}
          type="button"
          value="プレイ"
          onClick={() => router.push("/select")}
        />
      </div>
    </>
  );
};
export default TopPage;
