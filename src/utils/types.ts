import { TaskStatus } from "./enum";

export interface UserName {
  userName: string;
  passWord: string;
}
export interface Profile {
  age: number | null;
  bio: string;
  location: string;
}
export interface UserProfie {
  userName: string;
  profile: Profile;
}
export interface Task {
  title: string;
  content: string;
  status: TaskStatus;
  _id?: string;
}
export interface PersonalTask {
  userName: string;
  personalTasks: Task[];
}
export interface ErrorResponse {
  message: string;
}
