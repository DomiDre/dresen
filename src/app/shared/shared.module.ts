import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '@env/environment';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MarkdownModule.forRoot()
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    // FlexLayoutModule,
    ReactiveFormsModule,
    MarkdownModule
  ],
  providers: [
    AngularFireAuthGuard
  ]
})
export class SharedModule { }
