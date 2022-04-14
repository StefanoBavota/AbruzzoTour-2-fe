import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HomeService } from 'src/app/features/pages/home/services/home.service';
import { ITravelPath } from 'src/app/features/pages/travel/interface/travel.interface';

@Component({
  selector: 'app-travel-modal',
  templateUrl: './travel-modal.component.html',
  styleUrls: ['./travel-modal.component.scss'],
})
export class TravelModalComponent implements OnInit {
  @Input() travelInfo: ITravelPath;
  svg: string;

  constructor(private modalController: ModalController, private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    switch (this.travelInfo.rating) {
      case (1): {
        this.svg = "../../../../assets/icons/sad.svg";
        break;
      }
      case (2): {
        this.svg = "../../../../assets/icons/middle.svg";
        break;
      }
      case (3): {
        this.svg = "../../../../assets/icons/happy.svg";
        break;
      }
    }
  }

  onReview() {
    this.dismiss();
    this.router.navigate(['/tabs/profile/create-review', this.travelInfo.pathId]);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
