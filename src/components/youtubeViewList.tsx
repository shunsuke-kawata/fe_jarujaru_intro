import { AnswerStatus } from "@/types/configType";
import React, { useRef, useState } from "react";
import styles from "./components.module.css";

const YoutubeViewList = ({
  title,
  answerArray,
}: {
  title: string;
  answerArray: AnswerStatus[];
}) => {
  if (answerArray.length === 0) {
    return <></>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : answerArray.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < answerArray.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className={styles.youtubeViewList}>
      <p className={styles.title}>{title}</p>
      <div className={styles.flexViewlist}>
        <iframe
          id="player"
          width="480"
          height="270"
          src={"https://www.youtube.com/embed/" + answerArray[currentIndex].id}
          allowFullScreen
        />
      </div>
      <div className={styles.controls}>
        <input
          type="button"
          value={"まえ"}
          onClick={handlePrev}
          className={styles.buttons}
        />
        <div className={styles.currentLabel}>
          {currentIndex + 1}/{answerArray.length}
        </div>
        <input
          type="button"
          value={"つぎ"}
          onClick={handleNext}
          className={styles.buttons}
        />
      </div>
    </div>
  );
};

export default YoutubeViewList;
