import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatButtonModule
} from '@angular/material';

@NgModule({
  imports:[
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,   
  ],
  exports: [   
    MatAutocompleteModule,
    MatFormFieldModule,    
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,   
  ]
})
export class MaterialModule { }
