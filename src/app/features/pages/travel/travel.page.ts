import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { IUser } from '../sign-up/interfaces/sign-up.interfaces';
import { ITravelPath, ITravelResponse } from './interface/travel.interface';
import { TravelService } from './services/travel.service';
import { UserService } from '../services/user.service';
import { TravelModalComponent } from 'src/app/shared/components/travel-modal/travel-modal.component';

@Component({
  selector: 'app-travel',
  templateUrl: 'travel.page.html',
  styleUrls: ['travel.page.scss']
})
export class TravelPage {
  travelList: ITravelPath[] = [];
  userLogged: IUser;

  constructor(private travelService: TravelService, private loaderService: LoaderService, private modalController: ModalController, private userService: UserService) { }

  ionViewWillEnter() {
    this.getCredentials();
    this.getAllTravels()
  }

  ionViewDidLeave() {
    this.travelList = []
  }

  getCredentials() {
    this.userLogged = this.userService.getCredentials();
  }

  async getAllTravels() {
    await this.loaderService.startLoader();
    this.travelService.getAllTravels(this.userLogged.userId).subscribe((res: ITravelResponse) => {

      res.data.forEach((res: ITravelPath) => {
        this.travelList.push({
          ...res,
          tagName: '',
          tagColor: '',
          tagIcon: '',
        });
      });
      for (let path of this.travelList) {
        if (path.difficulty) {
          switch (path.difficulty) {
            case 'EASY': {
              path.tagName = 'light';
              path.tagColor = 'success';
              path.tagIcon = 'leaf';
              break;
            }
            case 'MEDIUM': {
              path.tagName = 'middle';
              path.tagColor = 'warning';
              path.tagIcon = 'fitness';
              break;
            }
            case 'HARD': {
              path.tagName = 'hard';
              path.tagColor = 'danger';
              path.tagIcon = 'barbell';
              break;
            }
          }
        }
      }
      this.loaderService.stopLoader()
    })
  }

  async presentModal(travel: ITravelPath) {
    const modal = await this.modalController.create({
      component: TravelModalComponent,
      cssClass: 'trvel-modal',
      componentProps: {
        travelInfo: travel,
      },
    });
    return await modal.present();
  }
}
