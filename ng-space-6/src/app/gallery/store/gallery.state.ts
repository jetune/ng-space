import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Memory } from '../models/memory';

export interface GalleryState {
  memoriesState: MemoriesState;
}

export interface MemoriesState extends EntityState<Memory> {

  // Already present in EntityState
  // memories: Memory[];

  // Add custom properties
  selectedMemoryId: string;
}

export function sortByName(a: Memory, b: Memory): number {

  // return the comparison
  return a.name.localeCompare(b.name);
}

// Entity Adapter (for custumize the commons functions (select, sort, etc))
export const adapter: EntityAdapter<Memory> = createEntityAdapter<Memory>({

  // Comparison function (take a memory and compare names)
  selectId: (memory) => memory.name
});

// Build initial state from Adapter
export const initialState: MemoriesState = adapter.getInitialState({
  selectedMemoryId: null
});
