import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule, MatFormFieldModule, 
  MatInputModule, MatDialogModule, MatSnackBarModule,
  MatSelectModule } from '@angular/material';


import {MatIconModule} from '@angular/material/icon';

import {MatButtonModule} from '@angular/material/button';


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
