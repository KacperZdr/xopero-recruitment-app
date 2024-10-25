import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef,} from '@angular/material/dialog';


@Component({
  selector: 'app-todos-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatDividerModule, MatInputModule, MatButtonModule],
  templateUrl: './todos-edit.component.html',
  styleUrl: './todos-edit.component.scss'
})
export class TodosEditComponent {

  constructor(private dialogRef: MatDialogRef<TodosEditComponent>) {}

close() {
    this.dialogRef.close();
  }

}
