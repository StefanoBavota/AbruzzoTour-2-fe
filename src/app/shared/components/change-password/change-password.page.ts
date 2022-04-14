import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/features/pages/services/user.service';
import { IResponseUpdateUser, IUser } from 'src/app/features/pages/sign-up/interfaces/sign-up.interfaces';
import { ToastService } from '../../../features/pages/services/toast.service';
import { validatePasswordMatch } from '../../../features/pages/sign-up/validators/password-check.validator';
import { inputType } from '../../../shared/components/input/types/inputType';
import { UpdatePasswordService } from './services/update-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  changePasswordForm: FormGroup;

  error: boolean = false;
  iconPassword: string = 'eye-off-outline';
  iconCheckedPassword: string = 'eye-off-outline';
  typePassword: inputType = 'password';
  typeCheck: inputType = 'password';
  isShowedPassword: boolean;
  isShowedChecked: boolean;
  userLogged: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private updatePassword: UpdatePasswordService,
    private toastService: ToastService,
    private modalController: ModalController,
    private userService: UserService
  ) {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [null, [Validators.required, Validators.minLength(6)]],
        checkPassword: [null, [Validators.required, Validators.minLength(6)]],
      },
      { validators: [validatePasswordMatch] }
    );
  }

  ionViewWillEnter() {
    this.getCredentials();
  }

  onChangePasswordClick() {
    if (this.changePasswordForm.valid) {
      this.userLogged.password = this.changePasswordForm.value.password
      this.updatePassword.updatePassword(this.userLogged).subscribe((res: IResponseUpdateUser) => {
        this.toastService.succesToast('password changed', 1000);
        this.modalController.dismiss();
      })
    } else {
      this.toastService.unsuccesToast('Ops, something goes wrong!', 1000);
    }
  }

  getCredentials() {
    this.userLogged = this.userService.getCredentials();
  }

  onClose() {
    this.modalController.dismiss();
  }

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
