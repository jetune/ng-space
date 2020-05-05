import { Component, OnInit, OnDestroy } from '@angular/core';
import { Rocket } from '../models/rocket.model';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable, from } from 'rxjs';
import { RocketsService } from '../services/rockets.service';
import { RocketDetailsComponent } from '../rocket-details/rocket-details.component';
import { slideIn } from 'src/app/shared/custom.animations';


@Component({
  selector: 'ngs-rockets-list',
  templateUrl: './rockets-list.component.html',
  styleUrls: ['./rockets-list.component.scss'],
  animations: [slideIn]
})
export class RocketsListComponent implements OnInit {

  constructor(private httpClient: HttpClient, private rocketService: RocketsService) { }
  rockets: Rocket[] = [];
  rocketsObs: Observable<Rocket[]>;
  private subscription: Subscription;
  private selectedRocketId: string;

  ngOnInit(): void {

    // Appel d'une URL avec definition d'un callback permettant d'initialiser la liste de rockets
    // IF No Subscriber then URL is not Call
    this.subscription = this.httpClient.get<Rocket[]>('https://api.spacexdata.com/v3/rockets').subscribe(results => this.rockets = results);
    this.rocketsObs = this.rocketService.getRockets();
  }

  displayDetails(id: string): void {
    this.selectedRocketId = id;
  }

  shouldDisplayDetails(id: string): boolean {
    return this.selectedRocketId === id;
  }
}
