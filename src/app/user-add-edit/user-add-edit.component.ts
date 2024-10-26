import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup, NgForm, FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.scss'
})
export class UserAddEditComponent {
  updatedUser:any = [];
  tableIndex: any  = [];

 constructor(private dialogRef: MatDialogRef<UserAddEditComponent>, @Inject(MAT_DIALOG_DATA) public dataUser: {username: any, name: any, email: any, tableId: any}, private dialog: MatDialog,  private serviceData: DataService) {}

 ngOnInit(): void {
      this.onEdit (this.dataUser.tableId, this.dataUser.name);
      this.serviceData.currentValue.subscribe(updatedUser => this.updatedUser = updatedUser)
    }



newValue(user: any) {
  this.serviceData.changeValue(user);
}

onEdit (index: any, user: any ) {
  console.log (user + ' index: ' + index);
  this.tableIndex = index;
}

onSubmitEdit(form: NgForm) {
  this.updatedUser = form.value;
  this.updatedUser.id = this.tableIndex;
  console.log(this.updatedUser);
  this.newValue(this.updatedUser);
  this.serviceData.sendClickEvent();
}

close() {
    this.dialogRef.close();
  }

}

