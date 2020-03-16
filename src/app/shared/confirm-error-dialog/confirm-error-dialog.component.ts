import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/model.index';


@Component({
  selector: 'app-confirm-error-dialog',
  templateUrl: './confirm-error-dialog.component.html',
  styles: []
})
export class ConfirmErrorDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {          
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
