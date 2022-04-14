import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IReview } from 'src/app/features/pages/home/interfaces/review.interface';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss'],
})
export class ReviewModalComponent {
  @Input() reviewInfo: IReview;
  svg: string;

  constructor(private modalController: ModalController, private router: Router) { }

  onReview() {
    this.dismiss();
    this.router.navigate(['/tabs/profile/edit-review', this.reviewInfo.reviewId]);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
