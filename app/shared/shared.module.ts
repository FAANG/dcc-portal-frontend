import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  exports: [ CommonModule, RouterModule ]
})
export class SharedModule { }
