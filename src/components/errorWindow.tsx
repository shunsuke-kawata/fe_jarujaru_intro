import styles from "./styles.module.css";

const ErrorWindow = ({
  errorMessage,
  stateFunction,
}: {
  errorMessage: string;
  stateFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.errorMainDiv}>
      <div className={styles.innerMainDiv}>
        <label className={styles.eroorMessage}>{errorMessage}</label>
        <div className={styles.batsu} onClick={() => stateFunction(false)}>
          ×
        </div>
      </div>
    </div>
  );
};
export default ErrorWindow;
