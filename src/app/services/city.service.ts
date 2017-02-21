import { Injectable } from '@angular/core';

@Injectable()
export class CityService {

    draw(cities, map) {
        var _self = this;

        var infobox = new InfoBox({
            content: document.getElementById("infobox"),
            disableAutoPan: false,
            maxWidth: 150,
            pixelOffset: new google.maps.Size(20, -10),
            zIndex: null,
            boxStyle: {
                background: "rgba(119, 204, 241, .65)",
                padding: "5px",
                color: "#fff"
            },
            closeBoxMargin: "12px 4px 2px 2px",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1)
        });

        for (let i in cities) {
            let city = cities[i];
            if (!city.active || city.timezone === "") continue;

            var image;
            switch (App.randomInterval(1, 5)) {
                case 1:
                    image = 'assets/blue.png';
                    break;
                case 2:
                    image = 'assets/green.png';
                    break;
                case 3:
                    image = 'assets/orange.png';
                    break;
                case 4:
                    image = 'assets/pink.png';
                    break;
                case 5:
                    image = 'assets/yellow.png';
                    break;
            }

            var marker = new google.maps.Marker({
                position: {lat: parseFloat(city.latitude), lng: parseFloat(city.longitude)},
                map: map,
                name: city.name,
                country: city.country,
                timezone: city.timezone,
                icon: {
                    url: image
                }
            });

            google.maps.event.addListener(marker, 'click', function () {
                _self.city = {
                    name: this.name,
                    country: this.country,
                    timezone: this.timezone
                };
                _self.update();
                $('.clock').velocity("fadeIn");
            });

            google.maps.event.addListener(marker, 'mouseover', function () {
                _self.infobox.setContent(this.name + ', ' + this.country);
                _self.infobox.open(_self.map, this);
            });

            google.maps.event.addListener(marker, 'mouseout', function () {
                _self.infobox.close();
            });

            this.markers.push(marker);
        }
    }

}