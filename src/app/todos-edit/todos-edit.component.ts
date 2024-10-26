import { Component, Inject,  Output, EventEmitter  } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef,} from '@angular/material/dialog';
import { NgForm, FormsModule  } from '@angular/forms';




@Component({
  selector: 'app-todos-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatDividerModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './todos-edit.component.html',
  styleUrl: './todos-edit.component.scss'
})
export class TodosEditComponent{
  taskName = "";
  updatedTask  = "";


  constructor(private dialogRef: MatDialogRef<TodosEditComponent>, @Inject(MAT_DIALOG_DATA) public dataTask: {index: any, task: any}, private dialog: MatDialog) {}

  ngOnInit(): void {
      this.onEdit (this.dataTask.index, this.dataTask.task);
    }


onEdit (index: any, task: any ) {
  console.log (task + ' index: ' + index);
  this.taskName = task;
}

onSubmitEdit(form: NgForm) {
  this.updatedTask = form.value;
  console.log(this.updatedTask);

}


close() {
    this.dialogRef.close();
  }

}
