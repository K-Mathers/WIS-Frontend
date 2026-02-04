import api from "../api";
import { adminPath } from "./adminPath";
import type { ICreateTask, IModerateData, IUpdateTask, IDashboardData } from "./types";

export const getPendingArticle = async () => {
  try {
    const response = await api.get(adminPath.PENDINGART);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const moderateArticle = async (
  id: string,
  moderateData: IModerateData,
) => {
  try {
    const response = await api.patch(
      `${adminPath.MODERATEART}/${id}/moderate`,
      moderateData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDashboard = async (): Promise<IDashboardData | undefined> => {
  try {
    const response = await api.get<IDashboardData>(adminPath.DASHBOARD);
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const createTask = async (taskData: ICreateTask) => {
  try {
    const response = await api.post(adminPath.CREATETASK, taskData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id: string, taskData: IUpdateTask) => {
  try {
    const response = await api.patch(`${adminPath.UPDATETASK}/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await api.delete(`${adminPath.DELETETASK}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
