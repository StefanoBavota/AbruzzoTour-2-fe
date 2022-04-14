import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateReviewPageRoutingModule } from './create-review-routing.module';

import { CreateReviewPage } from './create-review.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateReviewPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CreateReviewPage]
})
export class CreateReviewPageModule {}
