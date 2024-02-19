"use client";
import { getQuestionData } from "@/api/api";

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
    </>
  );
};

export default Test;
