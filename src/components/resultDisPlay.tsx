import { AnswerStatus } from "@/types/configType";
import YoutubeViewList from "./youtubeViewList";
import styles from "./components.module.css";

//全ての問題が終了したときに表示する画面コンポーネント
const ResultDisplay = ({
  answerStatusArray,
}: {
  answerStatusArray: AnswerStatus[];
}) => {
  //filterして合っていた問題と間違っていた問題に選別
  const correctAnswerArray: AnswerStatus[] = answerStatusArray.filter(
    (value) => {
      return value.isCorrect === true;
    }
  );
  const incorrectAnswerArray: AnswerStatus[] = answerStatusArray.filter(
    (value) => {
      return value.isCorrect === false;
    }
  );

  return (
    <>
      <div className={styles.youtubeViewListDiv}>
        <YoutubeViewList
          title={"間違えた奴ら"}
          answerArray={incorrectAnswerArray}
        />
        <YoutubeViewList
          title={"あってた奴ら"}
          answerArray={correctAnswerArray}
        />
      </div>
    </>
  );
};

export default ResultDisplay;
