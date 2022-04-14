import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Geoposition } from '@ionic-native/geolocation';
import { LoaderService } from './loader.service';
import { ICoordinate } from '../home/interfaces/path.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  ROME_COORDS: ICoordinate = { latitude: 41.8915873859966, longitude: 12.492043879214123 };
  mymap: L.map;
  layerURL: string = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=uA9cHQg2JYhcvngz4NJB';
  markerPostion = L.marker([]);

  myIcon = new L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' });
  myPoiIcon = new L.icon({ iconUrl: '../../../../assets/icons/markerPoi.svg' });
  iconTravel = new L.icon({ iconUrl: '../../../../assets/icons/mapMarker.svg' });

  constructor(
    private geolocation: Geolocation,
  ) {
  }

  setMarkerPosition() {
    this.geolocation.watchPosition().subscribe(
      (geo: Geoposition) => {
        this.markerPostion.remove();
        this.markerPostion = L.marker([geo.coords.latitude, geo.coords.longitude], { icon: this.myIcon }).addTo(this.mymap)
        this.mymap.locate({ setView: true, maxZoom: 16 });
      }
    )
  }

  /**
   * Logic for create new map
   *
   * @param {string} idMap
   * @param HTMLmap
   * @param {string} url
   */
  newMap(idMap: string, HTMLmap, coordinatesList: ICoordinate[]) {

    let isMapReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // this.loader.startLoader();
    // set Map and view
    this.getMapPosition()
      .subscribe((coordinates) => {
        coordinatesList
          ? this.initMap(coordinatesList[0].latitude, coordinatesList[0].longitude, idMap)
          : this.initMap(coordinates.lat, coordinates.lng, idMap)
      });
    if (!coordinatesList) {
      return;
    }

    // create observer to check MAP Loading state
    const Observer: MutationObserver = new MutationObserver(() => { isMapReady$.next(true); Observer.disconnect(); });
    const options: MutationObserverInit = { attributes: true, attributeFilter: ['class'] };
    Observer.observe(HTMLmap.nativeElement, options);
    // calls to functions after map is READY
    isMapReady$
      .pipe(filter((val: boolean) => val))
      .subscribe(() => {
        this.createPath(coordinatesList);
      })
  }

  /**
   * Inizialize Map and View
   *
   * @param {string} latitude
   * @param {string} longitude
   * @param {string} idMap
   */
  initMap(latitude: number, longitude: number, idMap: string): void {
    // create the MAP
    this.mymap = L.map(idMap);
    // put the LAYER over the MAP
    L.tileLayer(this.layerURL).addTo(this.mymap);
    // set view position
    this.mymap.setView([latitude, longitude], 13);
    this.mymap.locate({ setView: true, maxZoom: 16 });
    // create the marker over the given position
    L.marker([latitude, longitude], { icon: this.myIcon }).addTo(this.mymap);
  }

  /**
   * Get Current position if user's permission
   * Default Rome Position
   *
   * @returns {Observable<any>}
   */
  getMapPosition(): Observable<any> {
    return new Observable((observer) => {
      this.geolocation.getCurrentPosition()
        .then(
          (res: Geoposition) => {
            observer.next({ lat: res.coords.latitude, lng: res.coords.longitude });
          }
        )
        .catch((err: any) => {
          observer.next(this.ROME_COORDS);
        })
    })
  }

  /**
   * Create Path
   *
   * @param {Array<ICoordinate>} coordinates
  */
  private createPath(coordinates: Array<ICoordinate>): void {
    let lastCoords: number = coordinates.length - 1;
    // build the waypoints
    const waypoints: Array<L.latLng> = coordinates.map((coord: ICoordinate) => {
      return L.latLng(coord.latitude, coord.longitude);
    });
    // add WAYPOINTS to MAP
    var control = L.Routing.control({
      waypoints,
      createMarker: function () { return null; }
    }).addTo(this.mymap);
    control.hide();

    L.marker([coordinates[0].latitude, coordinates[0].longitude], { icon: this.myIcon }).addTo(this.mymap);
    L.marker([coordinates[lastCoords].latitude, coordinates[lastCoords].longitude], { icon: this.myIcon }).addTo(this.mymap);

  }
}
