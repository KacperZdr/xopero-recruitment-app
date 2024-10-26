import { Component, Inject,  Output, EventEmitter  } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm, FormsModule  } from '@angular/forms';
import { DataService } from '../services/data.service';




@Component({
  selector: 'app-todos-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatDividerModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './todos-edit.component.html',
  styleUrl: './todos-edit.component.scss'
})
export class TodosEditComponent{
  taskName = "";
  tableIndex: any  = [];
  updatedTask: any  = [];


  constructor(private dialogRef: MatDialogRef<TodosEditComponent>, @Inject(MAT_DIALOG_DATA) public dataTask: {index: any, task: any}, private dialog: MatDialog,  private serviceData: DataService) {}

  ngOnInit(): void {
      this.onEdit (this.dataTask.index, this.dataTask.task);
      this.serviceData.currentValue.subscribe(updatedTask => this.updatedTask = updatedTask)
    }
//
newValue(task: any) {
  this.serviceData.changeValue(task);
}
//
onEdit (index: any, task: any ) {
  this.taskName = task;
  this.tableIndex = index;
}

onSubmitEditTodo(form: NgForm) {
  this.updatedTask = form.value;
  this.updatedTask.id = this.tableIndex;
  console.log(this.updatedTask);
  this.newValue(this.updatedTask);
  this.serviceData.sendClickEvent2();
}

close() {
    this.dialogRef.close();
  }

}
