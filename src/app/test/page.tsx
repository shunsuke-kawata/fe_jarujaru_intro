"use client";
import { getQuestionData, getQuestionAudio } from "@/api/api";

const Test = () => {
  return (
    <>
      <div>テストの関数を実行するページ</div>
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
      ></input>
    </>
  );
};

export default Test;
