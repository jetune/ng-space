import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Memory } from '../models/memory';
import { MemoryType } from '../models/memory-type.enum';

@Component({
  selector: 'ngs-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnChanges {

  @Input() memories: Memory[];

  total: number = 0;
  proTotal: number = 0;
  fanTotal: number = 0;

  constructor() { }

  ngOnInit() {
    // TODO 7: What's going on here !?
    if (this.memories) {
      this.total = this.memories.length;
      this.proTotal = this.memories.filter(m => m.type === MemoryType.PRO).length;
      this.fanTotal = this.memories.filter(m => m.type === MemoryType.FAN).length;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.memories) {
      this.total = this.memories.length;
      this.proTotal = this.memories.filter(m => m.type === MemoryType.PRO).length;
      this.fanTotal = this.memories.filter(m => m.type === MemoryType.FAN).length;
    }
  }

}
