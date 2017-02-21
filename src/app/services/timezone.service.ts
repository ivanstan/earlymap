import { Injectable } from '@angular/core';

@Injectable()
export class TimeZoneService {

    drawRectangles(map) {
        let timezones = TimeZoneService.calculateTimeZoneRectangles();
        for (let i in timezones) {
            let timezone = timezones[i];

            let rectangle = new google.maps.Rectangle({
                fillColor: '#dff3fc',
                fillOpacity: .35,
                // strokeColor: '#FF0000',
                strokeOpacity: 0,
                map: map,
                bounds: {
                    north: 90,
                    south: -90,
                    east: timezone.l2,
                    west: timezone.l1
                }
            });
        }
    }

    drawRegions(map, timezones:any) {
        for (let i in timezones) {

            let odd = 0;
            let current:any = i;
            if(current % 2) {
                odd = .35;
            }

            for (let j in timezones[i].geometry) {
                // Construct the polygon.
                let polygon = new google.maps.Polygon({
                    paths: timezones[i].geometry[j],
                    strokeColor: '#FF0000',
                    strokeOpacity: 0,
                    strokeWeight: 0.1,
                    fillColor: '#dff3fc',
                    fillOpacity: odd,
                    clickable: false
                });
                polygon.setMap(map);
            }
        }
    }

    static calculateTimeZoneRectangles() {
        let timezoneDistance = 15; // [degrees] precalculated angular distance between timezones
        let timezoneMeridians = [];

        for (let i = 0; i < 12; i++) {
            if (i == 0) {            // Greenwich timezone
                timezoneMeridians.push({
                    l1: timezoneDistance / 2,
                    l2: (timezoneDistance / 2) + timezoneDistance
                });
            }

            if (i > 0) {
                let previous = timezoneMeridians[i - 1];
                timezoneMeridians.push({
                    l1: previous.l2 + timezoneDistance,
                    l2: previous.l2 + 2 * timezoneDistance
                });
            }
        }

        return timezoneMeridians;
    }

}