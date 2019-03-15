import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatButtonModule, MatSelectModule
} from '@angular/material';


@NgModule({ 
  imports:[
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,  
    MatSelectModule, 
  ],
  exports: [   
    MatAutocompleteModule,
    MatFormFieldModule,    
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,  
    MatSelectModule, 
  ]
})
export class MaterialModule { }
