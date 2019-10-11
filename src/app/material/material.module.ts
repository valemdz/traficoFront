import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule, MatFormFieldModule, 
  MatInputModule, MatDialogModule, MatSnackBarModule,  MatSelectModule, MatIconModule, MatButtonModule
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
    MatIconModule,
  ],
  exports: [   
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,    
    MatSelectModule, 
    MatIconModule
  ]
})
export class MaterialModule { }
