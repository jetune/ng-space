import { Component, OnInit, Input } from '@angular/core';
import { Rocket, PayloadWeight } from '../models/rocket.model';
import { RocketsService } from '../services/rockets.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngs-rocket-details',
  templateUrl: './rocket-details.component.html',
  styleUrls: ['./rocket-details.component.scss']
})
export class RocketDetailsComponent implements OnInit {

  // Rocket full
  private rocket: Rocket;
  @Input() payloads: PayloadWeight;

  constructor(private rocketService: RocketsService) { }

  ngOnInit(): void {
  }

  getRocketDetails(rocketId: BigInteger): Observable<Rocket> {
    return this.rocketService.getRocketDetails(rocketId);
  }
}
