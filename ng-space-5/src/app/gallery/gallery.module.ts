import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery/gallery.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MemoryComponent } from './memory/memory.component';
import { CommonModule } from '@angular/common';
import { AddMemoryDialogComponent } from './add-memory-dialog/add-memory-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics/statistics.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/gallery.reducers';
import { environment } from 'src/environments/environment';
import { GalleryEffect } from './store/gallery.effects';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GalleryEffect]),
    environment.production ? [] : [StoreDevtoolsModule.instrument({ maxAge: 50 })],
    RouterModule.forChild([{ path: 'gallery', component: GalleryComponent }])
  ],
  exports: [RouterModule],
  entryComponents: [AddMemoryDialogComponent],
  declarations: [GalleryComponent, MemoryComponent, AddMemoryDialogComponent, StatisticsComponent],
  providers: [],
})
export class GalleryModule { }
