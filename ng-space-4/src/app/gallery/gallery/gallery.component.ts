import { Component, OnInit, OnDestroy } from '@angular/core';
import { Memory } from '../models/memory';
import { MemoriesService } from '../services/memories.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddMemoryDialogComponent } from '../add-memory-dialog/add-memory-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngs-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  memories: Memory[] = [];
  selectedMemory: Memory;
  private readonly subscription: Subscription = new Subscription();

  constructor(private memoriesService: MemoriesService, private routerService: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription.add(
      this.memoriesService.getMemories().subscribe(result => this.memories = result)
    );
  }

  onMemorySelected(memory: Memory): void {
    this.selectedMemory = memory;
  }

  openAddMemoryDialog(): void {

    // TODO 7: This is why we should not hire contractors, An incomplete dialog work !
    this.dialog
      .open(AddMemoryDialogComponent, { height: '50%', width: '50%' })
      .afterClosed()
      .pipe(filter(memory => !!memory))
      .subscribe(memory => this.memories = [...this.memories, memory]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
