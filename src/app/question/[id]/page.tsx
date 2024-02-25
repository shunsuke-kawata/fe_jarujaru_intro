"use client";
import { useState } from "react";

const Question = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div>{params.id}</div>
    </>
  );
};

export default Question;
