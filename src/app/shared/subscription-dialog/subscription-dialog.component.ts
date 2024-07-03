import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ApiDataService} from '../../services/api-data.service';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatHint, MatError } from '@angular/material/form-field';
import { CdkScrollable } from '@angular/cdk/scrolling';

export interface DialogData {
  email: string;
}

@Component({
    selector: 'app-subscription-dialog',
    templateUrl: './subscription-dialog.component.html',
    styleUrls: ['./subscription-dialog.component.css'],
    standalone: true,
    imports: [CdkScrollable, MatDialogContent, FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatHint, MatError, MatDialogActions, MatButton]
})
export class SubscriptionDialogComponent implements OnInit {
  email = '';
  title = '';
  public subscriptionForm!: FormGroup;
  inputData: any;
  subscriptionDialogTitle: string;

  constructor(private dataService: ApiDataService,
              public dialogRef: MatDialogRef<SubscriptionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.inputData = {...data};
    this.subscriptionDialogTitle = this.inputData['title'];

  }

  ngOnInit(): void {
    this.subscriptionForm = new FormGroup({
      subscriberEmail: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  public displayError = (controlName: string, errorName: string) => {
    return this.subscriptionForm.controls[controlName].hasError(errorName);
  }

  onCancelDialog(dialogType: any) {
    this.dialogRef.close();
  }

  onRegister() {
    if (this.subscriptionForm.valid && this.subscriptionForm.touched) {
      this.dataService.subscribeFilteredData(this.inputData['indexName'], this.inputData['indexKey'], this.inputData['email']).subscribe(response => {
          console.log('You have now been subscribed!');
          this.dialogRef.close();
        },
        error => {
          console.log(error);
          this.dialogRef.close();
        }
      );
    }
  }

}








