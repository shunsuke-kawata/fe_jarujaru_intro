import { AnswerStatus } from "@/types/configType";
import React from "react";
import styles from "./styles.module.css";

const YoutubeViewList = ({ answerArray }: { answerArray: AnswerStatus[] }) => {
  if (answerArray.length === 0) {
    return <></>;
  }
  return (
    <div className={styles.youtubeViewList}>
      <div className={styles.flexViewlist}>
        <iframe
          id="player"
          width="480"
          height="270"
          src={"https://www.youtube.com/embed/" + answerArray[0].id}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YoutubeViewList;
