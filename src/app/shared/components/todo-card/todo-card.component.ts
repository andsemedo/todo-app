import { Component, Input } from "@angular/core";
import { ITodo } from "../../../core/models/todo.model";

export type ITodoType = "PENDING" | "IN PROGRESS" | "COMPLETED";
export const ITodoStatus = ["PENDING", "IN PROGRESS", "COMPLETED"];

@Component({
  selector: "app-todo-card",
  standalone: true,
  imports: [],
  templateUrl: "./todo-card.component.html",
  styleUrl: "./todo-card.component.css",
})
export class TodoCardComponent {
  @Input() type: ITodoType = "PENDING";
  @Input() todo!: ITodo;
}
