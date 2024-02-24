"use client";
import { getQuestionAudio } from "@/api/api";
import React, { useState, useEffect, useRef } from "react";

const Audio = () => {
  //audioContextの作成
  var audioContext: AudioContext;
  let audioSource: AudioBufferSourceNode | null;

  //useeffectでcontextの初期化
  useEffect(() => {
    audioContext = new AudioContext();
  }, []);

  const handleFetchData = async (id: string) => {
    console.log(id);
    try {
      const data = await getQuestionAudio(id);
      //decode
      audioContext.decodeAudioData(data, (buffer) => {
        //デコードが完了したら実行されるコールバック関数
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = buffer;

        //オーディオ要素に接続
        audioSource.connect(audioContext.destination);
        console.log("fetched");

        // 音楽を再生
        // handlePlay();
      });
    } catch (error) {
      console.error("Failed to fetch MP3 data:", error);
    }
  };
  const handlePlay = () => {
    // 音楽を再生
    if (audioSource) {
      console.log("start");
      audioSource.start(0);
    }
  };

  const handlePause = () => {
    if (audioContext.state === "running") {
      audioContext.suspend();
      console.log("suspended");
    }
  };
  const handleRestart = () => {
    if (audioContext.state === "suspended") {
      audioContext.resume();
      console.log("restart");
    }
  };

  const handleStop = () => {
    if (audioSource) {
      audioSource.stop();
      audioSource = null; // 一度停止した後は再度startできないのでnullにする
      console.log("broken context");
    }
  };

  return (
    <>
      <div>オーディオ再生テスト</div>
      <input
        type="button"
        value="fetch"
        onClick={() => handleFetchData("irMf9PfJtXE")}
      />
      <input type="button" value="再生" onClick={() => handlePlay()} />
      <input type="button" value="一時停止" onClick={() => handlePause()} />
      <input type="button" value="再開" onClick={() => handleRestart()} />
      <input type="button" value="停止" onClick={() => handleStop()} />
    </>
  );
};

export default Audio;
