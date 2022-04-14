import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditReviewPage } from './edit-review.page';

const routes: Routes = [
  {
    path: '',
    component: EditReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditReviewPageRoutingModule {}
