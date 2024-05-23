"use client";
import { getQuestionData, getQuestionAudio } from "@/api/api";
import YoutubeViewList from "@/components/youtubeViewList";
const test = [
  {
    isCorrect: false,
    id: "n5462bVTJY8",
    title: "怒鳴り返されたん気付かん奴",
    questionIndex: 1,
  },
  {
    isCorrect: false,
    id: "5GCQ1gDU8zk",
    title: "若ハゲサンキューっていう芸名の奴",
    questionIndex: 2,
  },
  {
    isCorrect: true,
    id: "Dyhe_loo6xc",
    title: "手品成功してガッツポーズしまくる奴",
    questionIndex: 3,
  },
  {
    isCorrect: true,
    id: "XC40Vw4quJw",
    title: "フィリピン語で数学数える奴",
    questionIndex: 4,
  },
  {
    isCorrect: false,
    id: "Wp_TIpFbq6M",
    title: "声細い奴と声太い奴",
    questionIndex: 5,
  },
];

const Result = () => {};

const Test = () => {
  return (
    <>
      {/* <div>テストの関数を実行するページ</div>
      <input
        type="button"
        value="問題の作成テスト"
        onClick={() =>
          getQuestionData([
            "PLRdiaanKAFQl3AKF2ruBbuTKj0dZnVqaJ",
            "PLRdiaanKAFQlq6BMs519ix5km2nz49zMb",
          ])
        }
      />
      <input
        type="button"
        value="問題のfetch"
        onClick={() => getQuestionAudio("irMf9PfJtXE")}
      ></input> */}
    </>
  );
};

export default Test;
