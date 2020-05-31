import { createSelector } from '@ngrx/store';
import { GalleryState, adapter } from './gallery.state';

export const getGalleryState = (state: GalleryState) => state;

export const getMemoriesState = createSelector(getGalleryState, (state: GalleryState) => state.memoriesState);

// Define selector function as variable provided by adapter
const {
    selectIds,
    selectAll, // Get All the memory entities as Flat Array for Get All
    selectEntities, // Get All Memory Entities as Indexed Map (Key, Value) for optimized search by ID
    selectTotal
} = adapter.getSelectors();

// Select all Memories as flat Array
export const getMemories = createSelector(getMemoriesState, selectAll);

// Select all Memories as indexed MAP
export const getMemoriesIndexedMap = createSelector(getMemoriesState, selectEntities);

// Selected the memory ID
export const getSelectedMemoryId = createSelector(getMemoriesState, (state) => state.selectedMemoryId);

// Get the selected Memory
export const getSelectedMemory = createSelector(getMemories, getSelectedMemoryId, (memories, id) => memories[id]);
