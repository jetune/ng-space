import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rocket } from '../models/rocket.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RocketsService {

    constructor(private httpClient: HttpClient) { }

    getRockets(): Observable<Rocket[]> {
        return this.httpClient.get<Rocket[]>('https://api.spacexdata.com/v3/rockets');
    }

    getRocketDetails(rocketId: BigInteger): Observable<Rocket> {
        return this.httpClient.get<Rocket>('https://api.spacexdata.com/v3/rockets/' + rocketId);
    }
}
