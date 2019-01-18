import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseText } from './UpperCaseText';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ UpperCaseText],
  exports: [ UpperCaseText ]
})
export class DirectivesModule { }
