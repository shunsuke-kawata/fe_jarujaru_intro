/**
 * ユーザの回答と正解を比較する関数
 * @param userAnswer
 * @param correctAnswer
 * @returns
 */
const checkUserAnswerTitle = (
  userAnswer: string,
  correctAnswer: string
): boolean => {
  const normalize = (input: string): string => {
    return input
      .toLowerCase() // 小文字に変換
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) - 0xfee0)
      ) // 全角英数字を半角に変換
      .replace(/[，、]/g, ",") // 全角・半角の読点を統一
      .replace(/[。．]/g, ".") // 全角・半角の句点を統一
      .replace(/[「『]/g, "「") // 開きカッコを統一
      .replace(/[」』]/g, "」") // 閉じカッコを統一
      .replace(/[\u30a1-\u30f6]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) - 0x60)
      ) // カタカナをひらがなに変換
      .replace(/\s+/g, "") // スペースを削除
      .normalize("NFKC"); // 文字の正規化（濁点付きの文字などを統一）
  };

  // 正規化して比較
  return normalize(userAnswer) === normalize(correctAnswer);
};

export { checkUserAnswerTitle };
