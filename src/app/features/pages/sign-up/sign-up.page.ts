import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inputType } from 'src/app/shared/components/input/types/inputType';
import { validatePasswordMatch } from './validators/password-check.validator';
import { ToastService } from '../services/toast.service';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';
import { IResponseCkeckEmail, IResponseSignUp, IUser } from './interfaces/sign-up.interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  iconPassword: string = 'eye-off-outline';
  iconCheckedPassword: string = 'eye-off-outline';
  typePassword: inputType = 'password';
  typeCheck: inputType = 'password';
  isShowedPassword: boolean;
  isShowedChecked: boolean;

  isEmailValid: boolean;

  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private authService: AuthService
  ) {
    this.signUpForm = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [
          null,
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: [null, [Validators.required, Validators.minLength(6)]],
        checkPassword: [null, [Validators.required]],
      },
      { validators: [validatePasswordMatch] }
    );
  }

  ngOnInit() { }

  /**
   * Sign up
   *
   * @returns {Promis<void>}
   */
  async onSignUp(): Promise<void> {
    if (!this.signUpForm.valid) {
      this.toastService.unsuccesToast('Something goes wrong!', 2000);
      return;
    }

    // take data from form
    const body = this.signUpForm.value;
    delete body.checkPassword;

    await this.loaderService.startLoader();

    this.authService.checkEmail(body.email).subscribe((res: IResponseCkeckEmail) => {
      if (!res.success) {
        this.authService.signUp(body).subscribe((res: IResponseSignUp) => {
          this.toastService.succesToast('Sign Up succesfull!', 2000);
          this.loaderService.stopLoader()
          this.router.navigate(['sign-in']);
        },
          (err: HttpErrorResponse) => {
            this.loaderService.stopLoader()
            this.toastService.unsuccesToast(err.message, 2000);
          }
        );
      } else {
        this.loaderService.stopLoader()
        this.toastService.unsuccesToast(res.message, 2000);
      }
    })
  }

  /**
   * Show Password
   *
   * @returns {void}
   */
  onshowPassword(): void {
    this.isShowedPassword = !this.isShowedPassword;
    if (this.isShowedPassword) {
      this.iconPassword = 'eye';
      this.typePassword = 'text';
    } else {
      this.iconPassword = 'eye-off-outline';
      this.typePassword = 'password';
    }
  }

  /**
   * Show Check Password
   *
   * @returns {void}
   */
  onshowCheckPassword(): void {
    this.isShowedChecked = !this.isShowedChecked;
    if (this.isShowedChecked) {
      this.iconCheckedPassword = 'eye';
      this.typeCheck = 'text';
    } else {
      this.iconCheckedPassword = 'eye-off-outline';
      this.typeCheck = 'password';
    }
  }
}
