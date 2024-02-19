"use client";
import { getQuestionData } from "@/api/api";

const Test = () => {
  return (
    <>
      <input type="button" value="fetch" onClick={()=>getQuestionData("dd",["dd","ww"])}/>
      <div>test</div>
    </>
  );
};

export default Test;
