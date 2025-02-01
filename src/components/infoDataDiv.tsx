import styles from "./components.module.css";

const InfoDataDiv = ({ title, score }: { title: string; score: number }) => {
  return (
    <>
      <div className={styles.containerElement}>
        <p className={styles.dataTitle}>{title}</p>
        <p className={styles.dataScore}>{score === 0 ? "-" : score}</p>
      </div>
    </>
  );
};

export default InfoDataDiv;
