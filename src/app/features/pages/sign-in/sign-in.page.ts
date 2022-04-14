import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { inputType } from 'src/app/shared/components/input/types/inputType';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { IResponseLogin } from './interfaces/sign-in.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loginForm: FormGroup;
  iconPassword: string = 'eye-off-outline';
  typePassword: inputType = 'password';
  isShowedPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() { }

  /**
   * On Login Button Click - Login
   *
   * @returns {Promise<void>}
   */
  async onLoginClick(): Promise<void> {
    if (!this.loginForm.valid) {
      this.toastService.unsuccesToast('Compila tutti i campi', 1000);
      return;
    };

    const body = this.loginForm.value;

    await this.loaderService.startLoader();
    this.authService.signIn(body).subscribe((res: IResponseLogin) => {
      if (res.success) {
        this.loaderService.stopLoader();
        localStorage.setItem('jwt', res.token);
        this.router.navigate(['']);
      } else {
        this.loaderService.stopLoader();
        this.toastService.unsuccesToast(res.message, 2000);
      }
    },
      (err: HttpErrorResponse) => {
        this.loaderService.stopLoader();
        console.log(err)
      }
    );
  }

  /**
   * On Show Password
   *
   * @returns {void}
   */
  onShowPassword(): void {
    this.isShowedPassword = !this.isShowedPassword;
    if (this.isShowedPassword) {
      this.iconPassword = 'eye';
      this.typePassword = 'text';
    } else {
      this.iconPassword = 'eye-off-outline';
      this.typePassword = 'password';
    }
  }
}
