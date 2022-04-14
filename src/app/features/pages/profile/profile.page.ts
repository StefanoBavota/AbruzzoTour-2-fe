import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../sign-up/interfaces/sign-up.interfaces';
import { UserService } from '../services/user.service';
import { ChangePasswordPage } from 'src/app/shared/components/change-password/change-password.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  userLogged: IUser;
  initials: string;

  constructor(private router: Router, private userService: UserService, private modalController: ModalController) { }

  ionViewWillEnter(): void {
    this.getInitials();
  }

  getInitials() {
    this.userLogged = this.userService.getCredentials();
    this.initials = (this.userLogged.firstName.charAt(0) + this.userLogged.lastName.charAt(0)).toUpperCase();
  }

  async onChangePassword() {
    const modal = await this.modalController.create({
      component: ChangePasswordPage,
      cssClass: 'change-password'
    });
    return await modal.present();
  }

  onReview() {
    this.router.navigate(['/tabs/profile/review']);
  }

  onLogout(): void {
    localStorage.removeItem('jwt');

    this.router.navigate(['/sign-in']);
  }
}
