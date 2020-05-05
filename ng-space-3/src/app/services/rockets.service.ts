import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rocket } from '../models/rocket.model';
import { RocketLaunch } from '../models/launch.model';

@Injectable({ providedIn: 'root' })
export class RocketsService {
  constructor(private httpClient: HttpClient) { }

  getRockets(): Observable<Rocket[]> {
    return this.httpClient.get<Rocket[]>('https://api.spacexdata.com/v3/rockets');
  }

  // TODO 6: hmmm, I wonder how to fetch just one rocket ?
  getRocket(rocketId: string): Observable<Rocket> {
    return this.httpClient.get<Rocket>(`https://api.spacexdata.com/v3/rockets/${rocketId}`);
  }

  // TODO 7: Perhaps I shouldn't concatenate the rocket_id query param, it may lead to Web Parameter Tampering
  getRocketLaunches(rocketId: string): Observable<RocketLaunch[]> {
    return this.httpClient.get<RocketLaunch[]>(`https://api.spacexdata.com/v3/launches?rocket_id=${rocketId}`);
  }
}
