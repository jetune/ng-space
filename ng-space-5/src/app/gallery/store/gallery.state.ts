import { Memory } from '../models/memory';

export interface GalleryState {
    memoriesState: MemoriesState;
}

export interface MemoriesState {
    memories: Memory[];
    selectedMemoryId: number;
}

// Defne and export default value
export const initialMemoriesState: MemoriesState = {
    memories: [],
    selectedMemoryId: null
};
