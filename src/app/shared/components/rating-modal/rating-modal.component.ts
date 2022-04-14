import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IMappedPath } from 'src/app/features/pages/home/interfaces/path.interface';
import { IResponseTravel } from 'src/app/features/pages/navigation/interfaces/travel.interface';
import { NavigationService } from 'src/app/features/pages/navigation/services/navigation.service';
import { IUser } from 'src/app/features/pages/sign-up/interfaces/sign-up.interfaces';
import { RatingEnum } from './interfaces/interface';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
})
export class RatingModalComponent {
  rating: number = 3;
  StateEnum = RatingEnum;
  @Input() path: IMappedPath;
  @Input() user: IUser;

  constructor(private modalController: ModalController, private router: Router, private navigationService: NavigationService) { }

  onSelect(index: number) {
    this.rating = index;
  }

  onConfirm() {
    let body = {
      rating: this.rating,
      id_path: this.path.pathId,
      id_user: this.user.userId
    }
    this.navigationService.addUserRoute(body).subscribe((res: IResponseTravel) => {
      this.modalController.dismiss({
        dismissed: true,
      });
      this.router.navigate(['']);
    });
  }
}
