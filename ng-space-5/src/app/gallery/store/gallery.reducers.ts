import { createReducer, on, ActionReducerMap } from '@ngrx/store';
import { GalleryState, MemoriesState, initialMemoriesState } from '../store/gallery.state';
import { FetchMemories, FetchMemoriesSuccess, FetchMemoriesFailure, AddMemory, MemorySelected } from '../store/gallery.actions';

// Reducer initial state
export const initialState = initialMemoriesState;

// Memory reducer
const memoriesReducer = createReducer(
    initialState,
    on(FetchMemories, (state, action) => state),
    on(FetchMemoriesSuccess, (state, action) => {
        return {
            memories: action.memories,
            selectedMemoryId: state.selectedMemoryId
        };
    }),
    on(FetchMemoriesFailure, (state, action) => ({ ...state, memories: action.memories })),
    on(AddMemory, (state, action) => {

        // Create new memory with ID
        const newMemory = {
            ...action.memory,
            id: state.memories.length
        };

        // Create a new Memories array and destroy the old
        const newMemories = [newMemory, ...state.memories];

        // Return State
        return ({ memories: newMemories, selectedMemoryId: newMemory.id });
    }),
    on(MemorySelected, (state, action) => {

        // Return State
        return {
            memories: state.memories,
            selectedMemoryId: action.memory.id
        };
    })
);

// Define Reducer asspciation with state
export const reducers: ActionReducerMap<GalleryState> = {
    memoriesState: memoriesReducer
};
