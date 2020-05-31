import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RocketsListComponent } from './rockets-list/rockets-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RocketDetailsComponent } from './rocket-details/rocket-details.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RocketComponent } from './rocket/rocket.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { RocketGuard } from './services/rocket.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { GalleryModule } from './gallery/gallery.module';

@NgModule({
  declarations: [
    AppComponent,
    RocketsListComponent,
    RocketDetailsComponent,
    RocketComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GalleryModule,
    // TODO 1: ReactiveForms or just Forms, I should probably go with Reactive, it's cooler !
    ReactiveFormsModule,
    // TODO 7: Where is my gallery ?
    RouterModule.forRoot([
      { path: '', redirectTo: '/rockets', pathMatch: 'full' },
      { path: 'rockets', component: RocketsListComponent },
      { path: 'rockets/:id', component: RocketComponent, canActivate: [RocketGuard] },
      { path: 'notfound', component: NotFoundComponent },
      { path: '**', redirectTo: '/notfound' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
