import { QuestionInfoResponse } from "@/types/apiResponseType";
import styles from "./styles.module.css";

const ExplanationWindow = ({
  isCorrect,
  questionData,
  handleFunction,
}: {
  isCorrect: boolean;
  questionData: QuestionInfoResponse;
  handleFunction: any;
}) => {
  return (
    <div className={styles.explanationMainDiv}>
      <div className={styles.innerMainDiv}>
        <h3 className={styles.isCorrectMessage}>
          {isCorrect ? "正解！！" : "残念。。"}
        </h3>
        <p className={styles.explanationTitle}>{questionData.title}</p>
        <input
          type="button"
          value={"次の問題へ"}
          onClick={handleFunction}
        ></input>
      </div>
    </div>
  );
};

export default ExplanationWindow;
