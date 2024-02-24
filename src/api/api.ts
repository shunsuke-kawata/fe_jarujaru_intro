import axios, { AxiosResponse } from "axios";
import { BACKEND_SERVER_URL, JARUJARU_TOWER_PLAYLISTS } from "../../config";
import { QuestionInfoResponse } from "@/types/apiResponseType";

const getQuestionData = async (params: string[]) => {
  let queryParameters: string = params.join("&playlist_id=");
  let url: string = `${BACKEND_SERVER_URL}/question/download/?playlist_id=${queryParameters}`;
  try {
    const response: AxiosResponse<JSON> = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    throw error;
  }
};

const getQuestionAudio = async (id: string) => {
  let url: string = `${BACKEND_SERVER_URL}/question/fetch/${id}`;

  try {
    const response: Response = await fetch(url);
    return response.arrayBuffer();
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
};

export { getQuestionData, getQuestionAudio };
