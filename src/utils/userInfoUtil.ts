import { deleteCookie, getCookie } from "cookies-next";
const executeLogout = () => {
  console.log("bye", getCookie("username"));
  //cokkie削除することでログアウト処理を実行
  deleteCookie("userId");
  deleteCookie("username");
};

export { executeLogout };
