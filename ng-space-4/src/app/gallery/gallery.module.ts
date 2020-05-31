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
    RouterModule.forChild(
      [
        { path: 'gallery', component: GalleryComponent }
      ]
    )
  ],
  exports: [RouterModule],
  entryComponents: [AddMemoryDialogComponent],
  declarations: [GalleryComponent, MemoryComponent, AddMemoryDialogComponent, StatisticsComponent],
  providers: [],
})
export class GalleryModule { }
