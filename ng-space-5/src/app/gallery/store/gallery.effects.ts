import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MemoriesService } from '../services/memories.service';
import { FetchMemories, FetchMemoriesSuccess, FetchMemoriesFailure } from './gallery.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GalleryEffect {

    getMemories$ = createEffect(() => this.actionsObs.pipe(
        ofType(FetchMemories),
        switchMap(() => this.memoryService.getMemories().pipe(
            map(memories => FetchMemoriesSuccess(memories)),
            catchError(() => of(FetchMemoriesFailure()))
        ))
    ));

    // Constructor
    constructor(private actionsObs: Actions, private memoryService: MemoriesService) { }
}
