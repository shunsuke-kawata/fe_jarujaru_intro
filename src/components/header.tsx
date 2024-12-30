import styles from "./styles.module.css";

const Header = ({ headerTitle }: { headerTitle: string }) => {
  return (
    <>
      <h1 className={styles.globalHeader}>{headerTitle}</h1>
    </>
  );
};

export default Header;
