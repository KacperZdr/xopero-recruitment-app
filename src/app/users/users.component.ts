import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, TodosComponent, MatButtonModule, MatIconModule, UserAddEditComponent, MatDialogModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {

displayedColumns = ['position', 'name', 'email', 'action'];

    http = inject(HttpClient)
    userList: any = [];
    userTodos: any = [];
    filteredTodos: any = [];

    ngOnInit(): void {
      this.fetchUsers();
    }
    
    fetchUsers() {
      this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((userList: any) => {
        console.log(userList);
        this.userList = userList;
      });
    }




  constructor(private dialog: MatDialog) {}
  
  openAddEditUserForm() {
    this.dialog.open(UserAddEditComponent)
  }
  
  openAddEditTodoForm(id: any, name: any) {
    this.dialog.open(TodosComponent, {
      data: {
        userName: name,
        userId: id
      }
    }) 
  }  


}