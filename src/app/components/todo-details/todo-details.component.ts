import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  currentTodo = null;
  message = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getTodo(this.route.snapshot.paramMap.get('id'));
  }

  getTodo(id: any) {
    this.todoService.get(id)
      .subscribe(
        data => {
          this.currentTodo = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateStatus(status) {
    const data = {
      name: this.currentTodo.name,
      desc: this.currentTodo.desc,
      status: status
    };

    this.todoService.update(this.currentTodo.id, data)
      .subscribe(
        response => {
          this.currentTodo.status = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateTodo() {
    this.todoService.update(this.currentTodo.id, this.currentTodo)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The TODO item was successfully updated!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTodo() {
    this.todoService.delete(this.currentTodo.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/todos']);
        },
        error => {
          console.log(error);
        });
  }
}
