import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFmRtARCG2OZMVtbj8GixI2XM9lOiZIow'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
