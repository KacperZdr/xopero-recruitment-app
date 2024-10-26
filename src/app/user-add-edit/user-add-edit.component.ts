import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup, NgForm, FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.scss'
})
export class UserAddEditComponent {
  updatedUser:any = [];

 constructor(private dialogRef: MatDialogRef<UserAddEditComponent>, @Inject(MAT_DIALOG_DATA) public dataUser: {username: any, name: any, email: any}, private dialog: MatDialog) {}

 ngOnInit(): void {
      this.onEdit (this.dataUser.username, this.dataUser.name);
    }

onSubmitEdit(form: NgForm) {
  this.updatedUser = form.value;
  console.log(this.updatedUser);
}

onEdit (index: any, task: any ) {
  console.log (task + ' index: ' + index);
}

close() {
    this.dialogRef.close();
  }

}

