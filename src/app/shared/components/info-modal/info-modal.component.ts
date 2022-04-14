import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IMappedPath } from 'src/app/features/pages/home/interfaces/path.interface';
import { IReview, IReviewResponse } from 'src/app/features/pages/home/interfaces/review.interface';
import { HomeService } from 'src/app/features/pages/home/services/home.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  @Input() pathId: number;
  singlePath: IMappedPath;
  reviewsByPathIdList: IReview[] = [];

  constructor(private modalController: ModalController, private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.singlePath = this.homeService.getPathById(this.pathId);
    this.getAllReviews();
  }

  getAllReviews() {
    this.homeService.getAllReviews(this.singlePath.pathId).subscribe((res: IReviewResponse) => {
      this.reviewsByPathIdList = res.data;
    })
  }

  onStart() {
    this.router.navigate(['/navigation', this.singlePath.pathId]);
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
