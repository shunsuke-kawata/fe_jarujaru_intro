"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import Header from "@/components/header";
import { getQuestionAudio, getQuestionData } from "@/api/api";

const Question = () => {
  const searchParams = useSearchParams();
  const questionNumberParam = searchParams.get("questionNumber");
  const playlistIdParam = searchParams.getAll("playlistId");
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [audioStatus, setAudioStatus] = useState<number>(0);

  //現在の問題数
  const [questionIndex, setQuestionIndex] = useState<number>(1);

  const [playlistIds, setPlaylistIds] = useState<string[]>(playlistIdParam);

  useEffect(() => {
    //contextの初期化・生成
    handleFetchData();
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
      questionIndex < Number(questionNumberParam)
    ) {
      incrementIndex();
    } else {
      console.log("end");
    }
  };

  const handleFetchData = async () => {
    //contextファイルの更新
    console.log("downloadの開始");
    console.log(playlistIds);
    audioContextRef.current = new AudioContext();
    if (!audioContextRef.current) return;

    try {
      setAudioStatus(0);
      const questionData: any = await getQuestionData(playlistIds);

      const audioData = await getQuestionAudio(questionData.id);
      console.log(questionData);

      audioContextRef.current.decodeAudioData(audioData, (buffer) => {
        audioSourceRef.current = audioContextRef.current!.createBufferSource();
        audioSourceRef.current.buffer = buffer;
        audioSourceRef.current.connect(audioContextRef.current!.destination);
        setAudioStatus(1);
      });
    } catch (error) {
      console.error("Failed to fetch MP3 data:", error);
    }
  };

  const handlePlay = () => {
    if (audioStatus !== 1) {
      return;
    }
    if (audioSourceRef.current && audioContextRef.current) {
      setAudioStatus(2);
      console.log("start");
      audioSourceRef.current.start(0);
    }
  };

  const handleStop = () => {
    if (audioSourceRef.current && audioContextRef.current) {
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
      console.log("broken context");
    }
  };

  return (
    <>
      <Header headerTitle={"クイズ画面"} />
      <p className={styles.secondTitle}>{questionIndex}問目</p>
      <div className={styles.phoneDisplayDiv}>
        {audioStatus === 0 ? (
          <p className={styles.phoneSentence}>接続中...</p>
        ) : audioStatus === 1 ? (
          <p className={styles.phoneSentence}>着信中</p>
        ) : audioStatus === 2 ? (
          <p className={styles.phoneSentence}>通話中</p>
        ) : (
          ""
        )}
        {audioStatus === 1 || audioStatus === 2 ? (
          <input
            type={"text"}
            autoComplete={"off"}
            className={styles.answerTitleInput}
          ></input>
        ) : (
          ""
        )}

        <div
          className={`
            ${
              audioStatus === null
                ? ""
                : audioStatus === 0
                ? styles.isFetching
                : audioStatus === 1
                ? styles.isWaiting
                : audioStatus === 2
                ? styles.isStarted
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
      </div>
      <input
        type="button"
        value={"次の問題へ"}
        className={styles.nextQuestionButton}
        onClick={() => handleNextQuestion()}
      ></input>
    </>
  );
};

export default Question;
