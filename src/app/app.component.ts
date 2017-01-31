import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private map = null;

    private styles = null;

    public cities = [];

    constructor(private http:Http) {
        this.http.get('assets/data/cities.json').subscribe((response) => this.cities = response.json());
        this.http.get('assets/data/styles.json').subscribe((response) => this.cities = response.json());
    }

    public ngOnInit() {
        this.initMap();
    }

    private initMap() {
        $('#map').height(window.innerHeight + 'px');

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: {lat: 8.407168163601074, lng: 8.407168163601074},
            //styles: this.styles,
            maxZoom: 10,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            }
        });

        google.maps.event.addListener(this.map, 'zoom_changed', function () {
            if (this.getZoom() < 3) {
                this.setZoom(3);
            }
        });

        google.maps.event.addListener(this.map, 'center_changed', () => {
            var latNorth = this.map.getBounds().getNorthEast().lat();
            var latSouth = this.map.getBounds().getSouthWest().lat();
            var newLat;

            /* too north, centering */
            if (latNorth > 85) {
                newLat = this.map.getCenter().lat() - (latNorth - 85);
            }

            /* too south, centering */
            if (latSouth < -85) {
                newLat = this.map.getCenter().lat() - (latSouth + 85);
            }

            if (newLat) {
                var newCenter = new google.maps.LatLng(newLat, this.map.getCenter().lng());
                this.map.setCenter(newCenter);
            }
        });
    }
}
