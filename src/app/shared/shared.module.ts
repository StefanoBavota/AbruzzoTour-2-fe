import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCardComponent } from './components/list-card/list-card.component';
import { TagComponent } from './components/tag/tag.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MapComponent } from './components/map/map.component';
import { RatingModalComponent } from './components/rating-modal/rating-modal.component';
import { TravelCardComponent } from './components/travel-card/travel-card.component';
import { TravelModalComponent } from './components/travel-modal/travel-modal.component';
import { ReviewModalComponent } from './components/review-modal/review-modal.component';
import { ChangePasswordPage } from './components/change-password/change-password.page';

@NgModule({
  declarations: [
    ListCardComponent,
    TagComponent,
    InfoModalComponent,
    ReviewCardComponent,
    ButtonComponent,
    InputComponent,
    AvatarComponent,
    MapComponent,
    RatingModalComponent,
    TravelCardComponent,
    TravelModalComponent,
    ReviewModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ListCardComponent,
    TagComponent,
    InfoModalComponent,
    ReviewCardComponent,
    ButtonComponent,
    InputComponent,
    AvatarComponent,
    MapComponent,
    RatingModalComponent,
    TravelCardComponent,
    TravelModalComponent,
    ReviewModalComponent,
  ],
})
export class SharedModule { }
