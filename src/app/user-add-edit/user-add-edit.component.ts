import { Component } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.scss'
})
export class UserAddEditComponent {

userForm: FormGroup;

constructor(private fb: FormBuilder, private userService: UserService, private dialogRef: MatDialogRef<UserAddEditComponent>) {
  this.userForm = this.fb.group({
    name: '',
    username: '',
    email: ''
  })

  
}

onFormSubmit() {
  if(this.userForm.valid) {
    console.log(this.userForm.value);
    this.userService.addUser(this.userForm.value).subscribe({
      next: (val: any) => {
        this.dialogRef.close();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
}

