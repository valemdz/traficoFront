import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule
} from '@angular/material';

@NgModule({
  imports:[
    MatAutocompleteModule,    
  ],
  exports: [   
    MatAutocompleteModule,    
  ]
})
export class MaterialModule { }
