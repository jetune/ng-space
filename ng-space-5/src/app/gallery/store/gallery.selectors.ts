import { createSelector } from '@ngrx/store';
import { GalleryState } from './gallery.state';

// Create Full gallery State Selector
export const galleryStateSelector = (state: GalleryState) => state;

// Create Memory State Selector (From Gallery State Selector)
export const memoryStateSelector = createSelector(
    galleryStateSelector,
    (state) => state.memoriesState
);

// Create Memories array Selector (From Memory State Selector)
export const memoriesSelector = createSelector(
    memoryStateSelector,
    (state) => state.memories
);

// Create Memories array Selector (From Memory State Selector)
export const selectedMemoryIdSelector = createSelector(
    memoryStateSelector,
    (state) => state.selectedMemoryId
);

// Create Memories ID Selector (From Memory State Selector)
export const selectedMemorSelector = createSelector(
    memoriesSelector, selectedMemoryIdSelector, (memories, id) => {

        // Determine the index of the selected ID
        const idx = memories.findIndex(memory => memory.id === id);

        // Return the selecte dmemory
        return memories[idx];
    }
);
