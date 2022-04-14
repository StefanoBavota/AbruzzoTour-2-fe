import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IReview, IReviewCreatedResponse } from '../home/interfaces/review.interface';
import { ReviewService } from '../review/services/review.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { IUser } from '../sign-up/interfaces/sign-up.interfaces';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.page.html',
  styleUrls: ['./edit-review.page.scss'],
})
export class EditReviewPage implements OnInit {
  reviewId: number;
  review: IReview;
  reviewForm: FormGroup;
  userLogged: IUser;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((res: Params) => (this.reviewId = res.reviewId));
    this.review = this.reviewService.reviewsByUserIdList.find((review: IReview) => review.reviewId == this.reviewId);
    this.reviewForm = this.formBuilder.group({
      reviewTitle: this.review.reviewTitle,
      description: this.review.description,
    });
    this.getCredentials();
  }

  getCredentials() {
    this.userLogged = this.userService.getCredentials();
  }

  onConfirm() {
    if (!this.reviewForm.valid) {
      this.toastService.unsuccesToast('Compila tutti i campi', 1000);
      return;
    };

    const body = this.reviewForm.value;
    body.id_user = this.userLogged.userId
    body.id_path = this.review.pathId;
    body.reviewId = this.review.reviewId;
    console.log(body);
    this.reviewService.updateReview(body).subscribe((res: IReviewCreatedResponse) => {
      this.toastService.succesToast('Recenione aggiornata!', 2000);
      this.router.navigate(['/tabs/profile/review']);
    },
      (err: HttpErrorResponse) => {
        this.toastService.unsuccesToast(err.message, 2000);
      }
    )
  }
}
