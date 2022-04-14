import { Component, Input, OnInit, ViewChild } from '@angular/core';
import 'leaflet-routing-machine';
import { ICoordinate } from 'src/app/features/pages/home/interfaces/path.interface';
import { MapService } from 'src/app/features/pages/services/map.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [Md5]
})
export class MapComponent implements OnInit {

  @Input() coordinates?: ICoordinate[];
  idMap: string;

  @ViewChild('map', { static: true }) HTMLmap;

  constructor(private mapService: MapService, private md5: Md5) {
    let time = new Date();
    this.idMap = Md5.hashStr(time.toString());
  }

  async ngOnInit() {
    this.mapService.newMap(this.idMap, this.HTMLmap, this.coordinates);
  }
}
