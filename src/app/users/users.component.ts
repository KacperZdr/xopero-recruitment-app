import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject, OnInit, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosComponent } from '../todos/todos.component';
import { NgForm, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule, MatTable } from '@angular/material/table';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatTable, MatInputModule, FormsModule, MatFormFieldModule, TodosComponent, MatButtonModule, MatIconModule, UserAddEditComponent, MatDialogModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {

displayedColumns = ['username', 'name', 'email', 'action'];
    clickEventsubscription:Subscription;
    http = inject(HttpClient)
    userList: any = [];
    message:any = '';
    updatedUser: any;


    ngOnInit(): void {
      this.fetchUsers();
      this.serviceData.currentValue.subscribe(updatedUser => this.updatedUser = updatedUser)
    }
    
    fetchUsers() {
      this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((userList: any) => {
        console.log(userList);
        this.userList = userList;
      });
    }




  constructor(private dialog: MatDialog, private serviceData: DataService) {
    this.clickEventsubscription = this.serviceData.getClickEvent().subscribe(()=>{
    this.updateTableUser();
  })
  }
  
  openEditUserForm(id: any, user: any) {
    this.dialog.open(UserAddEditComponent, {
      data: {
        username: user.username,
        name: user.name,
        email: user.email,
        tableId: id
      }
    });
    
  }
  
  openAddEditTodoForm(id: any, name: any) {
    this.dialog.open(TodosComponent, {
      data: {
        userName: name,
        userId: id
      }
    }) 
  }  


  onSubmit(form: NgForm){
    console.log(form);
    this.userList.push({
      username: form.controls['username'].value,
      name: form.controls['name'].value,
      email: form.controls['email'].value
    })

      console.log(this.userList);
      this.table.renderRows();
      form.reset()
  }

      @ViewChild(MatTable)
  table!: MatTable<any>;

updateTableUser(){
      this.userList[this.updatedUser.id].username = this.updatedUser.username;
      this.userList[this.updatedUser.id].name = this.updatedUser.name;
      this.userList[this.updatedUser.id].email = this.updatedUser.email;
      this.table.renderRows();
    }


  onDelete(index: any) {
    console.log(index);
    this.userList.splice(index,1);
    console.log(this.userList);
    this.table.renderRows();
  }
}