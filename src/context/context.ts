import { createContext } from "react";
import { AnswerStatus } from "@/types/configType";

export const answerDataContext = createContext<AnswerStatus[]>([]);
export const a = createContext<number>(1);
