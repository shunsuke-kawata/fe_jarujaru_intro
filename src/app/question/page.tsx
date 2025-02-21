"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./question.module.css";
import Header from "@/components/header";
import { getQuestionAudio, getQuestionData, postPlayData } from "@/api/api";
import { QuestionInfoResponseData } from "@/types/apiResponseType";
import { AnswerStatus } from "@/types/configType";
import ExplanationWindow from "@/components/explanationWindow";
import ResultDisplay from "@/components/resultDisPlay";
import { checkUserAnswerTitle } from "@/utils/stringUtils";
import CommonButton from "@/components/commons/commonButton";
import { selectUser } from "@/libs/store";
import { useSelector } from "react-redux";

type audioStatusString = "fetching" | "waiting" | "started" | "finished";

const QuestionPage: React.FC = () => {
  const searchParams = useSearchParams();
  const questionNumberParam: string | null = searchParams.get("questionNumber");
  const playlistIdParam: string[] = searchParams.getAll("playlistId");
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const questionDataRef = useRef<QuestionInfoResponseData | null>(null);

  const [audioStatus, setAudioStatus] = useState<audioStatusString>("fetching");
  const [questionIndex, setQuestionIndex] = useState<number>(1);
  const [isOpenAssistive, setIsOpenAssistive] = useState<boolean>(false);
  const [audioEnded, setAudioEnded] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const loginedUser = useSelector(selectUser);

  //オーディオが終了した時に
  const isCorrectRef = useRef<boolean>(false);
  const answerStatusArrray = useRef<AnswerStatus[]>([]);
  const router = useRouter();

  useEffect(() => {
    //contextの初期化・生成
    if (!isFinished) {
      handleFetchData();
    }
    return () => {
      handleStop(); // コンポーネントがアンマウントされる際に音声を停止
    };
  }, [questionIndex]);

  useEffect(() => {
    if (isFinished && loginedUser.userId) {
      console.log(answerStatusArrray.current);
      const tmpPlayData = {
        play_datum: answerStatusArrray.current,
      };
      console.log(tmpPlayData);
      postPlayData(loginedUser.userId, tmpPlayData);
    }
  }, [isFinished]);

  // 画面遷移時に処理を追加
  const handleNavigation = () => {
    if (audioSourceRef.current !== null) {
      audioSourceRef.current.disconnect(); // 音声を停止
    }
  };

  //次の問題にいく関数
  const handleNextQuestion = () => {
    if (
      questionNumberParam !== null &&
      questionIndex < Number(questionNumberParam) &&
      isFinished === false
    ) {
      //現在の問題のインデックスをインクリメント
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setAudioEnded(null);
      handleNavigation();
    } else {
      setIsFinished(true);
    }
    setIsOpenAssistive(false);
  };

  //データをダウンロードする
  const handleFetchData = async () => {
    if (isFinished) return;
    //contextファイルの更新
    console.log("downloadの開始");
    audioContextRef.current = null;
    audioSourceRef.current = null;
    audioContextRef.current = new AudioContext();
    if (!audioContextRef.current) {
      console.error("Failed to create AudioContext");
      return;
    }

    try {
      setAudioStatus("fetching");
      const questionData: any = await getQuestionData(playlistIdParam);
      questionDataRef.current = questionData;

      setAudioEnded(null);
      isCorrectRef.current = false;
      const audioData = await getQuestionAudio(
        questionData.id,
        questionData.tmp_id
      );
      audioContextRef.current.decodeAudioData(audioData, (buffer) => {
        audioSourceRef.current = audioContextRef.current!.createBufferSource();
        audioSourceRef.current.buffer = buffer;
        audioSourceRef.current.connect(audioContextRef.current!.destination);
        audioSourceRef.current.onended = () => handleAudioEnded();
        setAudioStatus("waiting");
      });
    } catch (error) {
      console.error("Failed to fetch MP3 data:", error);
    }
  };

  //再生を開始する関数
  const handlePlay = () => {
    if (isFinished) return;
    console.log("play");
    if (audioStatus !== "waiting") {
      console.log("not ready");
      return;
    }
    if (audioSourceRef.current && audioContextRef.current) {
      setAudioStatus("started");
      setAudioEnded(false);
      audioSourceRef.current.start(0);
    }
  };

  //オーディオを停止する関数
  const handleStop = () => {
    console.log("stop");
    if (audioSourceRef.current && audioContextRef.current) {
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
      handleAudioEnded();
    }
  };

  //オーディオ再生が終了した時の関数
  const handleAudioEnded = () => {
    console.log("finished");
    setAudioStatus("finished");
    setAudioEnded(true);
    if (questionDataRef.current !== null) {
      let tmpAnswerStatus: AnswerStatus = {
        isCorrect: isCorrectRef.current,
        id: questionDataRef.current?.id,
        title: questionDataRef.current?.title,
        questionIndex: questionIndex,
      };
      if (answerStatusArrray.current.length === questionIndex - 1) {
        answerStatusArrray.current.push(tmpAnswerStatus);
      }
    }
  };

  //入力した回答が正しいかを判定する
  const checkAnswerIsCorrect = () => {
    if (
      answerRef.current !== null &&
      questionDataRef.current !== null &&
      checkUserAnswerTitle(
        answerRef.current?.value,
        questionDataRef.current?.title
      )
    ) {
      isCorrectRef.current = true;
      handleStop();
    }
  };

  return (
    <>
      <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
      {isFinished ? (
        <>
          <ResultDisplay answerStatusArray={answerStatusArrray.current} />
          <div className={styles.linkButtonsDiv}>
            <CommonButton
              text="トップへ"
              width={120}
              height={48}
              onClick={() => router.push("/top")}
            />
            <CommonButton
              text="プレイリスト選択へ"
              width={186}
              height={48}
              onClick={() => router.push("/select")}
            />
          </div>
        </>
      ) : (
        <>
          <p className={styles.secondTitle}>{questionIndex}問目</p>
          <div className={styles.phoneDisplayDiv}>
            {audioStatus === "fetching" ? (
              <p className={styles.phoneSentence}>接続中...</p>
            ) : audioStatus === "waiting" ? (
              <p className={styles.phoneSentence}>着信中</p>
            ) : audioStatus === "started" ? (
              <p className={styles.phoneSentence}>通話中</p>
            ) : audioStatus === "finished" ? (
              <p className={styles.phoneSentence}>通話終了</p>
            ) : (
              <></>
            )}
            {audioStatus === "waiting" || audioStatus === "started" ? (
              <input
                type={"text"}
                autoComplete={"off"}
                className={styles.answerTitleInput}
                ref={answerRef}
                onChange={() => checkAnswerIsCorrect()}
              ></input>
            ) : (
              <></>
            )}

            <div
              className={`
            ${
              audioStatus === null
                ? ""
                : audioStatus === "fetching"
                ? styles.isFetching
                : audioStatus === "waiting"
                ? styles.isWaiting
                : audioStatus === "started"
                ? styles.isStarted
                : audioStatus === "finished"
                ? styles.isFetching
                : ""
            } ${styles.startButtonDiv}`}
              onClick={() => handlePlay()}
            >
              <img
                className={styles.phoneButton}
                src="/phone.svg"
                alt="再生ボタン"
              />
            </div>
            <div
              className={`${styles.assistiveTouch}`}
              onClick={() => setIsOpenAssistive(!isOpenAssistive)}
            >
              <div className={styles.innerCircle}>
                <div className={styles.core}></div>
              </div>
            </div>
            <div
              className={`${styles.assistiveMenu} ${
                isOpenAssistive ? styles.open : ""
              }`}
            >
              <div onClick={handleStop}>この問題を諦める</div>
              <div onClick={() => router.push("/select")}>
                プレイリスト選択へ
              </div>
              <div onClick={() => router.push("/top")}>トップへ</div>
              <div onClick={() => setIsOpenAssistive(false)}>閉じる</div>
            </div>
          </div>

          {audioEnded && questionDataRef.current !== null ? (
            <ExplanationWindow
              isCorrect={isCorrectRef.current}
              questionData={questionDataRef.current}
              handleFunction={handleNextQuestion}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default QuestionPage;
