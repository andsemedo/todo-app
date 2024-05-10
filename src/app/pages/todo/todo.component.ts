import { Component, OnInit } from "@angular/core";
import {
  ITodoStatus,
  TodoCardComponent,
} from "../../shared/components/todo-card/todo-card.component";
import { ITodo } from "../../core/models/todo.model";
import { TodoService } from "../../core/services/todo.service";
import { SlidePanelComponent } from "../../shared/ui/slide-panel/slide-panel.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { title } from "process";
import { response } from "express";

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.css",
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  todoStatus = ITodoStatus;
  isSlidePanelOpen = false;
  todoId: string | null = null;
  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      status: new FormControl("PENDING", [Validators.required]),
      owner: new FormControl("gdsfdsfdagsd2d", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllTodo().subscribe({
      next: (response) => {
        this.todos = response.data;
      },
    });
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
  }

  openSlidePanel(status: boolean) {
    if (status === false) {
      this.todoForm.patchValue({
        title: "",
        description: "",
        status: "PENDING",
      });
      this.todoId = null;
    }
    this.isSlidePanelOpen = true;
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.todoId) {
        this.todoService
          .updateTodo(this.todoId, this.todoForm.value)
          .subscribe({
            next: (response) => {
              this.getAllTodos();
              this.onCloseSlidePanel();
            },
          });
        // this.todoService.deleteTodo(this.todoId).subscribe({
        //   next: (response) => {
        //     this.getAllTodos();
        //     this.onCloseSlidePanel();
        //   },
        // });
      } else {
        this.todoService.addTodo(this.todoForm.value).subscribe({
          next: (response) => {
            this.getAllTodos();
            this.onCloseSlidePanel();
          },
        });
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  onLoadTodoForm(item: ITodo) {
    this.todoId = item._id!!;

    if (this.todoId !== null) {
      this.todoForm.patchValue({
        id: item._id,
        title: item.title,
        description: item.description,
        status: item.status,
      });
      this.openSlidePanel(true);
    } else {
      this.openSlidePanel(false);
    }
  }

  onDelete() {
    if (this.todoId) {
      this.todoService.deleteTodo(this.todoId).subscribe({
        next: (response) => {
          this.getAllTodos();
          this.onCloseSlidePanel();
        },
      });
    }
  }
}
