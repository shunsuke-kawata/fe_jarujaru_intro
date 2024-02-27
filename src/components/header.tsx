import styles from "./styles.module.css";

const HeaderFixed = ({ headerTitle }: { headerTitle: string }) => {
  return <div className={styles.globalHeader}>{headerTitle}</div>;
};
const Header = ({ headerTitle }: { headerTitle: string }) => {
  return (
    <>
      <HeaderFixed headerTitle={headerTitle} />
      <p className={styles.topMarginLabel}></p>
    </>
  );
};

export default Header;
