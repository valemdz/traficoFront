import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmar-detete',
  templateUrl: './confirmar-delete.component.html',
  styles: []
})
export class ConfirmarDeleteComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmarDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
