import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { MapService } from '../../services/map.service';
import { TimeZoneService } from '../../services/timezone.service';
import { CityService } from '../../services/city.service';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MapService, TimeZoneService, CityService]
})
export class AppComponent {

    private map = null;

    public cities = [];

    private styles = [];

    private timezones = {};

    constructor(
        private http:Http,
        private mapService: MapService,
        private tzService: TimeZoneService,
        private cityService: CityService
    ) {
        Observable.forkJoin([
                this.http.get('assets/data/cities.json').map(result => result.json()),
                this.http.get('assets/data/styles.json').map(result => result.json()),
                this.http.get('assets/data/timezones.json').map(result => result.json())
            ])
            .subscribe((result) => {
                this.cities = result[0];
                this.styles = result[1];
                this.timezones = result[2];

                $('#map').height(window.innerHeight + 'px');
                this.map = this.mapService.new('#map', this.styles);

                this.tzService.drawRectangles(this.map);
                //this.tzService.drawRegions(this.map, this.timezones);

                this.cityService.draw(this.cities, this.map);
            });
    }
}
