import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todo = {
    name: '',
    desc: '',
    status: 'pending'
  };
  submitted = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  saveTodo() {
    const data = {
      name: this.todo.name,
      desc: this.todo.desc,
      status: this.todo.status
    };

    this.todoService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTodo() {
    this.submitted = false;
    this.todo = {
      name: '',
      desc: '',
      status: 'pending'
    };
  }
}
