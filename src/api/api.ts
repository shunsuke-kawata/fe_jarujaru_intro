import axios, { AxiosResponse } from "axios";
import { BACKEND_SERVER_URL, JARUJARU_TOWER_PLAYLISTS } from "../../config";
import {
  LoginResponseData,
  PlayDataResponseData,
} from "../types/apiResponseType";
const getQuestionData = async (params: string[]) => {
  let queryParameters: string = params.join("&playlist_id=");
  let url: string = `${BACKEND_SERVER_URL}/question/download/?playlist_id=${queryParameters}`;
  try {
    const response: AxiosResponse<JSON> = await axios.get(url);
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

const getUsers = async () => {
  let url: string = `${BACKEND_SERVER_URL}/users`;

  try {
    const response: AxiosResponse<JSON> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserById = async (id: string) => {
  let url: string = `${BACKEND_SERVER_URL}/users/${id}`;

  try {
    const response: AxiosResponse<JSON> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const getUserByUserName = async (username: string) => {
  let url: string = `${BACKEND_SERVER_URL}/users/username/${username}`;

  try {
    const response: AxiosResponse<JSON> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    console.log();
    throw error;
  }
};

const createUser = async (username: string, password: string) => {
  let url: string = `${BACKEND_SERVER_URL}/users`;
  console.log(username, password);

  try {
    const response: AxiosResponse<JSON> = await axios.post(url, {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const updateUser = async (id: string, username: string, password: string) => {
  let url: string = `${BACKEND_SERVER_URL}/users/${id}`;

  try {
    const response: AxiosResponse<JSON> = await axios.put(url, {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const deleteUser = async (id: string) => {
  let url: string = `${BACKEND_SERVER_URL}/users/${id}`;

  try {
    const response: AxiosResponse<JSON> = await axios.delete(url);
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const getPlayData = async (id: string): Promise<PlayDataResponseData> => {
  let url: string = `${BACKEND_SERVER_URL}/users/playdata/${id}`;

  try {
    const response = await axios.get<PlayDataResponseData>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const postPlayData = async (id: string, playDatum: any) => {
  let url: string = `${BACKEND_SERVER_URL}/users/playdata/${id}`;

  try {
    const response: AxiosResponse<JSON> = await axios.post(url, playDatum);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const deletePlayData = async (id: string) => {
  let url: string = `${BACKEND_SERVER_URL}/users/playdata/${id}`;

  try {
    const response: AxiosResponse<JSON> = await axios.delete(url);
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const executeLogin = async (username: string, password: string) => {
  let url: string = `${BACKEND_SERVER_URL}/auth/login`;

  try {
    const response: AxiosResponse<LoginResponseData> = await axios.post(url, {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export {
  getQuestionData,
  getQuestionAudio,
  getUsers,
  getUserById,
  getUserByUserName,
  createUser,
  updateUser,
  deleteUser,
  getPlayData,
  postPlayData,
  deletePlayData,
  executeLogin,
};
