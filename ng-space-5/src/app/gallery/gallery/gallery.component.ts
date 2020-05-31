import { Component, OnInit } from '@angular/core';
import { Memory } from '../models/memory';
import { MemoriesService } from '../services/memories.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMemoryDialogComponent } from '../add-memory-dialog/add-memory-dialog.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FetchMemories, MemorySelected, AddMemory } from '../store/gallery.actions';
import { memoriesSelector, selectedMemorSelector } from '../store/gallery.selectors';

@Component({
  selector: 'ngs-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  // Memory List
  memories: Observable<Memory[]>;

  // Selected memory Observable
  selectedMemory: Observable<Memory>;

  constructor(
    private memoriesService: MemoriesService,
    private dialog: MatDialog,
    private store: Store<{}>) { }

  ngOnInit() {

    // Trigger the Fetch memory Action
    this.store.dispatch(FetchMemories());

    // Subscribe on selected area of redux Store to get the memories updated by Redux ction reducers
    this.memories = this.store.select(memoriesSelector);

    // Select the observable
    this.selectedMemory = this.store.select(selectedMemorSelector);
  }

  onMemorySelected(memory: Memory): void {

    // Dispatch selected action
    this.store.dispatch(MemorySelected(memory));
  }

  openAddMemoryDialog(): void {

    // Open the dialog (this one will trigger AddMemory Event when closed)
    this.dialog.open(
      AddMemoryDialogComponent,
      {
        height: '50%',
        width: '50%',
        data: { addMemoryFn: (memory) => this.store.dispatch(AddMemory(memory)) }
      });
  }
}
