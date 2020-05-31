import { createAction, props } from '@ngrx/store';
import { Memory } from '../models/memory';

// Action de recherche des objets Memory
export const FetchMemories = createAction('[Gallery] Fetch memories');

// Action de recherche des objets Memory avec succes (une 2e manière d'écrire le callback props)
export const FetchMemoriesSuccess = createAction('[Gallery] Fetch memories success', (results) => ({ memories: results }));

// Action de recherche des objets Memory avec echec
export const FetchMemoriesFailure = createAction('[Gallery] Fetch memories failure', () => ({ memories: [] }));

// Action d'ajout de Memory
export const AddMemory = createAction('[Gallery] Add memory', (newMemory: Memory) => ({ memory: newMemory }));

// Action de selection de Memory
export const MemorySelected = createAction('[Gallery] Select memory', (memorySelected: Memory) => ({ memory: memorySelected }));
