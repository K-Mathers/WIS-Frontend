export interface IModerateData {
  decision: string;
  feedback: string;
}

export interface ICreateTask {
  title: string;
}

export interface IUpdateTask {
  title: string;
  status: string;
}

export interface ITask {
  id: string;
  title: string;
  status: "DONE" | "IN_PROGRESS" | "TODO";
  createdAt?: string;
  updatedAt?: string;
}

export interface IDashboardStats {
  totalUser: number | string;
  totalArticles: number | string;
  newMessages: number | string;
}

export interface IDashboardData {
  stats: IDashboardStats;
  missions: ITask[];
}
