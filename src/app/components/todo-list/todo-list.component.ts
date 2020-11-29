import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  
  todos: any;
  currentTodo = null;
  currentIndex = -1;
  name = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.retrieveTodos();
  }

  retrieveTodos() {
    this.todoService.getAll()
      .subscribe(
        data => {
          this.todos = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveTodos();
    this.currentTodo = null;
    this.currentIndex = -1;
  }

  setActiveTodo(todo: any, index: number) {
    this.currentTodo = todo;
    this.currentIndex = index;
  }
  
  searchName() {
    this.todoService.findByName(this.name)
      .subscribe(
        data => {
          this.todos = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
