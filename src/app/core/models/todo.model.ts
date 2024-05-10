import { ITodoType } from "../../shared/components/todo-card/todo-card.component";

export interface IResponse<T> {
  message: string;
  data: T;
}

export interface ITodo {
  _id?: string;
  title: string;
  description: string;
  status: ITodoType;
  owner: string;
  created_at?: string;
  updated_at?: string;
}
