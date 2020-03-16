import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/model.index';


@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styles: []
})
export class YesNoDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {          
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
