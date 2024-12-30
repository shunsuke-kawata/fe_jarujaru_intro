import styles from "./styles.module.css";
import UserInfo from "./userInfo";

const Header = ({ headerTitle }: { headerTitle: string }) => {
  return (
    <>
      <h1 className={styles.globalHeader}>{headerTitle}</h1>
      <UserInfo />
    </>
  );
};

export default Header;
