import { Component, OnInit, OnDestroy } from '@angular/core';
import { Memory } from '../models/memory';
import { MatDialog } from '@angular/material/dialog';
import { AddMemoryDialogComponent } from '../add-memory-dialog/add-memory-dialog.component';
import { Subscription, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { GalleryState } from '../store/gallery.state';
import { Store } from '@ngrx/store';
import { FetchMemories, AddMemory, SelectMemory } from '../store/gallery.actions';
import { getMemories, getSelectedMemory } from '../store/gallery.selectors';

@Component({
  selector: 'ngs-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  memories$: Observable<Memory[]>;
  selectedMemory$: Observable<Memory>;
  private readonly subscription: Subscription = new Subscription();

  constructor(private store: Store<GalleryState>, private dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(FetchMemories());
    this.memories$ = this.store.select(getMemories);
    this.selectedMemory$ = this.store.select(getSelectedMemory);
    // this.subscription.add(
    //   this.memoriesService.getMemories().subscribe(result => this.memories = result)
    // );
  }

  onMemorySelected(memory: Memory): void {
    // this.selectedMemory = memory;
    this.store.dispatch(SelectMemory(memory.name));
  }

  openAddMemoryDialog(): void {
    this.subscription.add(this.dialog.open(AddMemoryDialogComponent, { height: '50%', width: '50%' })
      .afterClosed()
      .pipe(filter(memory => !!memory))
      .subscribe(memory => {
        this.store.dispatch(AddMemory(memory));
        // this.selectedMemory = memory
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
