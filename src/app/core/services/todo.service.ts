import { Injectable } from "@angular/core";
import { IResponse, ITodo } from "../models/todo.model";
import { HttpClient } from "@angular/common/http";
import { apiEndpoint } from "../constants/constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodo(): Observable<IResponse<ITodo[]>> {
    return this.http.get<IResponse<ITodo[]>>(
      `${apiEndpoint.TodoEndpoint.getAllTodo}`
    );
  }

  addTodo(data: ITodo): Observable<IResponse<ITodo>> {
    return this.http.post<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.addTodo}`,
      data
    );
  }

  updateTodo(id: string, data: ITodo): Observable<IResponse<ITodo>> {
    console.log(`${apiEndpoint.TodoEndpoint.updateTodo}?id=${id}`);

    return this.http.put<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.updateTodo}?id=${id}`,
      data
    );
  }

  deleteTodo(id: string): Observable<IResponse<ITodo>> {
    console.log(`${apiEndpoint.TodoEndpoint.deleteTodo}?id=${id}`);

    return this.http.delete<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.deleteTodo}?id=${id}`
    );
  }
}
