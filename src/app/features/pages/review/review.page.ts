import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReviewModalComponent } from 'src/app/shared/components/review-modal/review-modal.component';
import { IReview, IReviewResponse } from '../home/interfaces/review.interface';
import { UserService } from '../services/user.service';
import { IUser } from '../sign-up/interfaces/sign-up.interfaces';
import { ReviewService } from './services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: 'review.page.html',
  styleUrls: ['review.page.scss']
})
export class ReviewPage implements OnInit {
  reviewsByUserIdList: IReview[] = [];
  userLogged: IUser;

  constructor(private reviewService: ReviewService, private userService: UserService, private modalController: ModalController) { }

  ngOnInit(): void {
    this.getCredentials();
  }

  ionViewWillEnter() {
    this.getReviewByUserId();
  }

  ionViewDidLeave() {
    this.reviewsByUserIdList = []
  }

  getCredentials() {
    this.userLogged = this.userService.getCredentials();
  }

  getReviewByUserId() {
    this.reviewService.getReviewByUserId(this.userLogged.userId).subscribe((res: IReviewResponse) => {
      this.reviewsByUserIdList = res.data;
    })
  }

  _ionChange(event: { target: { value: string } }) {
    this.reviewsByUserIdList = this.reviewService.reviewsByUserIdList
    const val = event.target.value;

    if (val?.trim() !== '') {
      this.reviewsByUserIdList = this.reviewService.reviewsByUserIdList.filter((item: IReview) => {
        return (item.title.toLowerCase().includes(val.toLowerCase()));
      })
    }
  }

  async onReviewClick(reviewInfo: IReview) {
    const modal = await this.modalController.create({
      component: ReviewModalComponent,
      cssClass: 'review-modal',
      componentProps: {
        reviewInfo: reviewInfo,
      },
    });
    return await modal.present();
  }
}
