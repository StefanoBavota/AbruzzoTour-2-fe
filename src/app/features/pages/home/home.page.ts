import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoModalComponent } from 'src/app/shared/components/info-modal/info-modal.component';
import { IMappedPath } from './interfaces/path.interface';
import { HomeService } from './services/home.service';
import { IUser } from '../sign-up/interfaces/sign-up.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  pathList: IMappedPath[] = [];

  constructor(private homeService: HomeService, public modalController: ModalController) { }

  ngOnInit(): void {
    this.getAllPaths();
  }

  getAllPaths() {
    this.homeService.getAllPaths().subscribe((res: IMappedPath[]) => {
      this.pathList = res;
    })
  }

  _ionChange(event: { target: { value: string } }) {
    this.pathList = this.homeService.pathList
    const val = event.target.value;

    if (val?.trim() !== '') {
      this.pathList = this.homeService.pathList.filter((item: IMappedPath) => {
        return (item.title.toLowerCase().includes(val.toLowerCase()));
      })
    }
  }

  async onPathSelect(pathId: number) {
    const modal = await this.modalController.create({
      component: InfoModalComponent,
      cssClass: 'info-modal',
      componentProps: {
        pathId: pathId
      }
    });
    return await modal.present();
  }
}
