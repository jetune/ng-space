import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RocketsListComponent } from './rockets-list/rockets-list.component';
import { RocketDetailsComponent } from './rocket-details/rocket-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// TODO 6: Add HTTP calls capabilities to the App
// TODO 13: Add animations capabilities to the App
@NgModule({
  declarations: [
    AppComponent,
    RocketsListComponent,
    RocketDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
