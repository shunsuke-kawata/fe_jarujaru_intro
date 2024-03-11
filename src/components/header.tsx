import styles from "./styles.module.css";

const Header = ({ headerTitle }: { headerTitle: string }) => {
  return (
    <>
      <h1 className={styles.globalHeader}>{headerTitle}</h1>
      <p className={styles.topMarginLabel}></p>
    </>
  );
};

export default Header;
