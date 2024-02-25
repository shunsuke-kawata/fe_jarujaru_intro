"use client";
import React, { useState, useEffect, useRef } from "react";
import { getQuestionData, getQuestionAudio } from "@/api/api";

const Audio = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true); // 初期値はfalse
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    console.log("init audioContext");
    audioContextRef.current = new AudioContext();
  }, []);

  const handleFetchData = async () => {
    if (!audioContextRef.current) return;

    try {
      const questionData: any = await getQuestionData([
        "PLRdiaanKAFQl3AKF2ruBbuTKj0dZnVqaJ",
        "PLRdiaanKAFQlq6BMs519ix5km2nz49zMb",
      ]);

      const audioData = await getQuestionAudio(questionData.id);
      console.log(questionData);

      audioContextRef.current.decodeAudioData(audioData, (buffer) => {
        audioSourceRef.current = audioContextRef.current!.createBufferSource();
        audioSourceRef.current.buffer = buffer;
        audioSourceRef.current.connect(audioContextRef.current!.destination);
        console.log("fetched");
      });
      setIsDisabled(false);
    } catch (error) {
      console.error("Failed to fetch MP3 data:", error);
    }
  };

  const handlePlay = () => {
    if (audioSourceRef.current && audioContextRef.current) {
      console.log("start");
      audioSourceRef.current.start(0);
    }
  };

  const handlePause = () => {
    if (audioContextRef.current?.state === "running") {
      audioContextRef.current.suspend();
      console.log("suspended");
    }
  };

  const handleRestart = () => {
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
      console.log("restart");
    }
  };

  const handleStop = () => {
    if (audioSourceRef.current && audioContextRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
      console.log("broken context");
      setIsDisabled(true);
    }
  };

  return (
    <>
      <div>オーディオ再生テスト</div>
      <input type="button" value="fetch" onClick={handleFetchData} />
      <input
        type="button"
        value="再生"
        onClick={handlePlay}
        disabled={isDisabled}
      />
      <input
        type="button"
        value="一時停止"
        onClick={handlePause}
        disabled={isDisabled}
      />
      <input
        type="button"
        value="再開"
        onClick={handleRestart}
        disabled={isDisabled}
      />
      <input
        type="button"
        value="停止"
        onClick={handleStop}
        disabled={isDisabled}
      />
    </>
  );
};

export default Audio;
