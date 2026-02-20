import api from "../api";
import { articlePath } from "./articlePath";
import type { IComment } from "./types";

export const getCommentsForAnArticle = async (id: string) => {
  try {
    const response = await api.get(`${articlePath.GETCOMMENTS}/${id}/comments`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createComment = async (comentData: IComment) => {
  try {
    const response = await api.post(articlePath.CREATECOMMENTS, comentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const reactComment = async (
  reactData: { type: "LIKE" | "DISLIKE" },
  idComment: string,
) => {
  try {
    const response = await api.post(
      `${articlePath.REACTCOMENT}/${idComment}/reaction`,
      reactData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
