import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditReviewPageRoutingModule } from './edit-review-routing.module';

import { EditReviewPage } from './edit-review.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditReviewPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [EditReviewPage]
})
export class EditReviewPageModule {}
