import { createReducer, on, ActionReducerMap } from '@ngrx/store';
import { FetchMemoriesSuccess, FetchMemoriesFailure, AddMemory, SelectMemory } from './gallery.actions';
import { GalleryState, initialState, adapter } from './gallery.state';

// const memoriesReducer = createReducer(initialState,
//  on(FetchMemoriesSuccess, FetchMemoriesFailure, (_state, { memories }) => ({ memories, selectedMemoryId: null })),
//  on(AddMemory, (state, { memory }) => ({ memories: [memory, ...state.memories], selectedMemoryId: memory.name })),
//  on(SelectMemory, (state, { memoryId }) => ({ ...state, selectedMemoryId: memoryId })),
// )

const memoriesReducer = createReducer(
  initialState,
  on(
    FetchMemoriesSuccess,
    FetchMemoriesFailure,
    (state, { memories }) => adapter.setAll(memories, { ...state, selectedMemoryId: null })
  ),
  on(
    AddMemory,
    (state, { memory }) => adapter.addOne(memory, { ...state, selectedMemoryId: memory.name })
  ),
  on(SelectMemory, (state, { memoryId }) => ({ ...state, selectedMemoryId: memoryId }))
);


export const reducers: ActionReducerMap<GalleryState> = {
  memoriesState: memoriesReducer
};
