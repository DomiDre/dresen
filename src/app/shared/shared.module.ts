import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    // FlexLayoutModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
