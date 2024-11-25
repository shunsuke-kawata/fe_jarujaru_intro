"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import Header from "@/components/header";
import { getQuestionAudio, getQuestionData } from "@/api/api";
import { QuestionInfoResponse } from "@/types/apiResponseType";
import { AnswerStatus } from "@/types/configType";
import ExplanationWindow from "@/components/explanationWindow";
import YoutubeViewList from "@/components/youtubeViewList";

type audioStatusString = "fetching" | "waiting" | "started" | "finished";
const ResultDisplay = ({
  answerStatusArray,
}: {
  answerStatusArray: AnswerStatus[];
}) => {
  //filterして合っていた問題と間違っていた問題に選別
  const correctAnswerArray: AnswerStatus[] = answerStatusArray.filter(
    (value) => {
      return value.isCorrect === true;
    }
  );
  const incorrectAnswerArray: AnswerStatus[] = answerStatusArray.filter(
    (value) => {
      return value.isCorrect === false;
    }
  );

  return (
    <>
      <div className={styles.youtubeViewListDiv}>
        <YoutubeViewList
          title={"間違えた奴ら"}
          answerArray={incorrectAnswerArray}
        />
        <YoutubeViewList
          title={"あってた奴ら"}
          answerArray={correctAnswerArray}
        />
      </div>
    </>
  );
};

const Question = () => {
  const searchParams = useSearchParams();
  const questionNumberParam: string | null = searchParams.get("questionNumber");
  const playlistIdParam: string[] = searchParams.getAll("playlistId");
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const questionDataRef = useRef<QuestionInfoResponse | null>(null);
  const [audioStatus, setAudioStatus] = useState<audioStatusString>("fetching");
  const [questionIndex, setQuestionIndex] = useState<number>(1);

  //オーディオが終了した時に
  const [audioEnded, setAudioEnded] = useState<boolean | null>(null);
  const isCorrectRef = useRef<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const answerStatusArrray = useRef<AnswerStatus[]>([]);
  const [isOpenAssistive, setIsOpenAssistive] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    //contextの初期化・生成
    if (isFinished) {
      return;
    }
    handleFetchData();
    console.log(answerStatusArrray);
    return () => {
      handleStop(); // コンポーネントがアンマウントされる際に音声を停止
    };
  }, [questionIndex]);

  // 画面遷移時に処理を追加
  const handleNavigation = () => {
    if (audioSourceRef.current !== null) {
      audioSourceRef.current.disconnect(); // 音声を停止
    }
  };
  const incrementIndex = () => setQuestionIndex((prevIndex) => prevIndex + 1);

  const handleNextQuestion = () => {
    if (
      questionNumberParam !== null &&
      questionIndex < Number(questionNumberParam) &&
      isFinished === false
    ) {
      incrementIndex();
      setAudioEnded(null);
      handleNavigation();
    } else {
      setIsFinished(true);
    }
    setIsOpenAssistive(false);
  };

  const giveUpQuestion = () => {
    handleNextQuestion();
  };
  const handleFetchData = async () => {
    //contextファイルの更新
    console.log("downloadの開始");
    audioContextRef.current = null;
    audioSourceRef.current = null;
    audioContextRef.current = new AudioContext();
    if (!audioContextRef.current) return;

    try {
      setAudioStatus("fetching");
      const questionData: any = await getQuestionData(playlistIdParam);
      questionDataRef.current = questionData;

      setAudioEnded(null);
      isCorrectRef.current = false;
      const audioData = await getQuestionAudio(questionData.id);
      audioContextRef.current.decodeAudioData(audioData, (buffer) => {
        audioSourceRef.current = audioContextRef.current!.createBufferSource();
        audioSourceRef.current.buffer = buffer;
        audioSourceRef.current.connect(audioContextRef.current!.destination);
        audioSourceRef.current.onended = handleAudioEnded;
        setAudioStatus("waiting");
      });
    } catch (error) {
      console.error("Failed to fetch MP3 data:", error);
    }
  };

  const handlePlay = () => {
    if (audioStatus !== "waiting") {
      return;
    }
    if (audioSourceRef.current && audioContextRef.current) {
      setAudioStatus("started");
      setAudioEnded(false);
      audioSourceRef.current.start(0);
    }
  };

  const handleStop = () => {
    if (audioSourceRef.current && audioContextRef.current) {
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
      handleAudioEnded();
    }
  };

  const checkAnswerIsCorrect = () => {
    if (answerRef.current?.value === questionDataRef.current?.title) {
      isCorrectRef.current = true;
      handleStop();
    }
  };

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

  return (
    <>
      <Header headerTitle={"ジャルジャルでイントロクイズする奴"} />
      {isFinished ? (
        <>
          <ResultDisplay answerStatusArray={answerStatusArrray.current} />
          <div className={styles.linkButtonsDiv}>
            <input
              className={styles.linkButtons}
              onClick={() => router.push("/select")}
              value={"プレイリスト選択へ"}
            />
            <input
              className={styles.linkButtons}
              onClick={() => router.push("/top")}
              value={"トップへ"}
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

export default Question;
