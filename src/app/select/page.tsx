"use client";
import styles from "./styles.module.css";
import { useRef, useState } from "react";
import {
  JARUJARU_TOWER_PLAYLISTS,
  JARUJARU_ISLAND_PLAYLISTS,
} from "../../../config";
import { VideoInfo } from "@/types/configType";
import React from "react";
import Header from "@/components/header";
import ErrorWindow from "@/components/errorWindow";
import { useRouter } from "next/navigation";

const Select = () => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(10);
  const [isShowError, setIsShowError] = useState(false);

  const router = useRouter();

  const handleQuestionNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value); // 入力値を数値に変換
    setQuestionNumber(value); // 状態を更新
  };

  const handleToQuizButton = () => {
    //選択された問題がない・questionNumberが
    if (selectedPlaylistId.length === 0 || questionNumber === undefined) {
      setIsShowError(true);
      return;
    }
    let queryParameterId: string = selectedPlaylistId.join("&playlistId=");

    //問題数とプレイリストのidをクエリパラメータで渡す
    const url = `/question?questionNumber=${questionNumber}&playlistId=${queryParameterId}`;
    //クイズ画面に遷移
    router.push(url);
  };

  //選択されているプレイリストを更新する
  const updateSelectPlaylistId = (id: string) => {
    // 選択状態を示す新しい配列を作成する
    const updatedSelectedPlaylistId = selectedPlaylistId.includes(id)
      ? selectedPlaylistId.filter((value) => value !== id)
      : [...selectedPlaylistId, id];

    // 新しい配列をセットして状態を更新する
    setSelectedPlaylistId(updatedSelectedPlaylistId);
  };

  const TitleButton = ({
    index,
    id,
    title,
    selected,
  }: {
    index: number;
    id: string;
    title: string;
    selected: boolean;
  }) => {
    return (
      <>
        <div
          className={`${
            selected ? styles.selectedTitleButton : styles.titleButton
          } ${index % 4 !== 3 ? styles.notRightButton : ""}`}
          // {selected ? styles.selectedTitleButton : styles.titleButton}
          onClick={() => updateSelectPlaylistId(id)}
        >
          {title}
        </div>
      </>
    );
  };

  const TitleButtonList = ({
    videoInfoList,
  }: {
    videoInfoList: VideoInfo[];
  }) => {
    return (
      <div className={styles.selectTitleList}>
        {videoInfoList.map((videoInfo, index) => (
          <React.Fragment key={index}>
            <TitleButton
              index={index}
              id={videoInfo.id}
              title={videoInfo.title}
              selected={selectedPlaylistId.includes(videoInfo.id)}
            />
            {index % 4 === 3 && index !== videoInfoList.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  //render
  return (
    <>
      <Header headerTitle={"オプション選択"} />
      <label className={styles.questionNumberInput}>問題数</label>
      <input
        type="number"
        name="questionNumber"
        min={5}
        max={20}
        value={questionNumber} // 状態をバインド
        onChange={handleQuestionNumberChange} // 入力値が変更された時の処理
        className={styles.questionNumberInput}
      />
      <label className={styles.questionNumberInput}>問</label>
      <input
        type="button"
        value={"クイズへ"}
        className={styles.questionNumberInput}
        onClick={() => handleToQuizButton()}
      />
      <h3 className={styles.subtitles}>JARUJARU TOWER</h3>
      <TitleButtonList videoInfoList={JARUJARU_TOWER_PLAYLISTS} />
      <h3 className={styles.subtitles}>JARUJARU ISLAND</h3>
      <TitleButtonList videoInfoList={JARUJARU_ISLAND_PLAYLISTS} />
      {isShowError ? (
        <ErrorWindow
          errorMessage={
            "問題を選択してくださいaaaaaaaaaaaaaaaaaaaaaaaaaaasdgresmdfkgeopfdoijop"
          }
          stateFunction={setIsShowError}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default Select;