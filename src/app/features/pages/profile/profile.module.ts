import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordPage } from 'src/app/shared/components/change-password/change-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ProfilePage, ChangePasswordPage]
})
export class ProfilePageModule { }
