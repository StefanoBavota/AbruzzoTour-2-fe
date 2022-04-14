import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { interval, Observable, Subscription } from 'rxjs';
import { IMappedPath } from '../home/interfaces/path.interface';
import { HomeService } from '../home/services/home.service';
import { MapService } from '../services/map.service';
import { RatingModalComponent } from 'src/app/shared/components/rating-modal/rating-modal.component';
import { AlertService } from '../services/alert.service';
import { NavigationService } from './services/navigation.service';
import { IUser } from '../sign-up/interfaces/sign-up.interfaces';
import { IResponseTravel } from './interfaces/travel.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {
  interval$: Observable<number> = interval(1000);
  sub: Subscription;
  time: number = 0;
  timer: String = '00:00';
  stopTime: boolean = false;
  path: IMappedPath;
  iconBtn: string = 'play';
  iconTimer: string = 'pause';
  pathId: number;
  userLogged: IUser;

  constructor(
    private mapService: MapService,
    private router: Router,
    private navigationService: NavigationService,
    private modalController: ModalController,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private homeService: HomeService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.mapService.setMarkerPosition();
    this.route.params.subscribe((res: Params) => (this.pathId = res.pathId));
    this.path = this.homeService.pathList.find((path: IMappedPath) => path.pathId == this.pathId);
    this.userLogged = this.userService.getCredentials();
  }

  /**
   * Change the icon for the central button
   * @returns {void}
   */
  onStartStop(): void {
    let icon: string;
    icon = this.iconBtn;
    this.iconBtn = this.iconTimer;
    this.iconTimer = icon;
    this.stopTime = !this.stopTime;
    this.timerStartStop();
  }

  /**
   * Start and stop the timer
   * @returns {void}
   */
  private timerStartStop(): void {
    if (this.stopTime) {
      this.sub = this.interval$.subscribe(() => {
        this.run();
      });
    } else {
      this.sub.unsubscribe();
    }
  }

  /**
   * Counter for the stopwatch
   * @returns {void}
   */
  private run(): void {
    this.time++;
    let minutes: String = Math.trunc(this.time / 60).toString();
    let seconds: String = (this.time % 60).toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
    let clockStr: String = minutes + ':' + seconds;

    this.timer = clockStr;
  }

  /**
   * open the alert for block the navigation
   * @returns {Promise<void>}
   */
  async onBlock(): Promise<void> {
    await this.alertService.createAlert(
      'Attention!',
      'are you sure you want to end the path?',
      [
        { text: 'Cancel', handler: () => { } },
        { text: 'Yes', handler: this.onBlockAlertYesCallback.bind(this) },
      ]
    );
  }

  /**
   * block a route and set the route in not completed
   * @returns {void}
   */
  private onBlockAlertYesCallback(): void {
    let body = {
      rating: 4,
      id_path: this.path.pathId,
      id_user: this.userLogged.userId
    }
    this.navigationService.addUserRoute(body).subscribe((res: IResponseTravel) => {
      this.router.navigate(['']);
    });
  }

  /**
   * open the alert for finish the navigation
   * @returns {Promise<void>}
   */
  async onFinish(): Promise<void> {
    await this.alertService.createAlert(
      'Attention!',
      'are you sure you want to finish the path?',
      [
        { text: 'Cancel', handler: () => { } },
        { text: 'Yes', handler: this.onFinishAlertYesCallback.bind(this) },
      ]
    );
  }

  /**
   * finish a route open rating modal
   * @returns {void}
   */
  private onFinishAlertYesCallback(): void {
    this.present();
  }

  /**
   * open the alert for finish the navigation
   * @returns {Promise<void>}
   */
  private async present(): Promise<void> {
    const modal = await this.modalController.create({
      component: RatingModalComponent,
      cssClass: 'rating-modal',
      backdropDismiss: false,
      componentProps: {
        path: this.path,
        user: this.userLogged
      },
    });
    return await modal.present();
  }
}
