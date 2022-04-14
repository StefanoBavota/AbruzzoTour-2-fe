import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IReviewCreatedResponse } from '../home/interfaces/review.interface';
import { ReviewService } from '../review/services/review.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { IUser } from '../sign-up/interfaces/sign-up.interfaces';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.page.html',
  styleUrls: ['./create-review.page.scss'],
})
export class CreateReviewPage implements OnInit {
  pathId: number;
  reviewForm: FormGroup;
  userLogged: IUser;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private router: Router
  ) {
    this.reviewForm = this.formBuilder.group({
      reviewTitle: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((res: Params) => (this.pathId = res.pathId));
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
    body.id_path = this.pathId;
    console.log(body);
    this.reviewService.createReview(body).subscribe((res: IReviewCreatedResponse) => {
      this.toastService.succesToast('Recenione creata!', 2000);
      this.router.navigate(['/tabs/profile/review']);
    },
      (err: HttpErrorResponse) => {
        this.toastService.unsuccesToast(err.message, 2000);
      }
    )
  }
}
