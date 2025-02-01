import { PlayData } from "@/types/apiResponseType";
import { deleteCookie, getCookie } from "cookies-next";

const executeLogout = () => {
  console.log("bye", getCookie("username"));
  //cookie削除することでログアウト処理を実行
  deleteCookie("userId");
  deleteCookie("username");
};

const countTandF = (playData: PlayData[]) => {
  let trueCount: number = 0;
  let falseCount: number = 0;

  for (const item of playData) {
    for (const dataItem of item.data) {
      if (dataItem.isCorrect) {
        trueCount++;
      } else {
        falseCount++;
      }
    }
  }

  return { trueCount, falseCount };
};

export { executeLogout, countTandF };
