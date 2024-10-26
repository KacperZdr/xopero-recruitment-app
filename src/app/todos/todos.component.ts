import { HttpClient } from '@angular/common/http';
import { Component,ViewChild , Inject, OnInit, inject, Input, Output, EventEmitter } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource, MatTableModule, MatTable } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef,} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { TodosEditComponent } from '../todos-edit/todos-edit.component';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-todos',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [MatTableModule, FormsModule, MatButtonModule, MatIconModule, MatDividerModule, MatCheckboxModule, MatFormFieldModule, MatInputModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  [x: string]: any;
  clickEventsubscription2:Subscription;

  


 constructor(private dialogRef: MatDialogRef<TodosComponent>, @Inject(MAT_DIALOG_DATA) public data: {userId: any, userName: any}, private dialog: MatDialog,  private serviceData: DataService) { 
  this.clickEventsubscription2 = this.serviceData.getClickEvent2().subscribe(()=>{
  this.updateTableTodo();
  })
 }

  displayedColumns = ['checkbox', 'title', 'action'];

    http = inject(HttpClient)
    userList: any = [];
    userTodos: any = [];
    filteredTodos: any = [];
    dUserId: any = [];
    nameUser = '';
    updatedTask:any  = "";

    ngOnInit(): void {
      this.fetchUsers();
      this.fetchTodos(this.data.userId, this.data.userName);
      this.serviceData.currentValue.subscribe(updatedTask => this.updatedTask = updatedTask)
    }
    
    fetchUsers() {
      this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((userList: any) => {
        this.userList = userList;
      });
    }

    fetchTodos(id: any, name: any) {
      this.http.get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((userTodos: any) => {
        this.userTodos = userTodos;
        this.filteredTodos = this.userTodos.filter((user: { userId: number; }) => user.userId == id);
        this.nameUser = name;
      });
    }

    @ViewChild(MatTable)
  table!: MatTable<any>;

    onSubmit(form: NgForm) {
      console.log(form);
      this.filteredTodos.push({
        title: form.controls['task'].value,
        completed: false
      })

      console.log(this.filteredTodos);
      this.table.renderRows();
      form.reset()
    }

    onDelete(index: any) {
      console.log(index);
      this.filteredTodos.splice(index,1);
      console.log(this.filteredTodos);
      this.table.renderRows();
    }

    onCheck(index: any) {
      this.filteredTodos[index].completed = !this.filteredTodos[index].completed
      console.log(this.filteredTodos);
      this.table.renderRows();
    }

    openEditTask(index: any, task: any) {
      this.dialog.open(TodosEditComponent, {
      data: {
        index: index,
        task: task
      }
    });
    }
//
    updateTableTodo(){
      this.filteredTodos[this.updatedTask.id].title = this.updatedTask.task;
      this.table.renderRows();
    }
//
    close() {
    this.dialogRef.close();
  }
}



