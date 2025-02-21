export interface QuestionInfoResponseData {
  id: string;
  title: string;
  tmp_id: string;
  original_file_path: string;
}

export interface LoginResponseData {
  message: string;
  user_id: string;
  username: string;
}

export interface UserInfoPageResponseData {
  username: string;
}

export interface QuestionData {
  isCorrect: boolean;
  title: string;
  id: string;
  questionIndex: number;
}

export interface PlayData {
  index: number;
  data: QuestionData[];
}

export type PlayDataResponseData = PlayData[];
