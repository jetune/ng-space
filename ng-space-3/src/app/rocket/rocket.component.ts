import { Component, OnInit, Input } from '@angular/core';
import { Rocket } from '../models/rocket.model';
import { RocketsService } from '../services/rockets.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RocketLaunch } from '../models/launch.model';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'ngs-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.scss']
})
export class RocketComponent implements OnInit {
  rocketObs: Observable<Rocket>;
  rocketLaunchesObs: Observable<RocketLaunch[]>;
  rocketIds: string[] = ['falcon1', 'falcon9', 'falconheavy', 'starship'];
  private rocketId: Observable<string>;
  constructor(private rocketsService: RocketsService, private route: ActivatedRoute, private routerService: Router) { }

  ngOnInit(): void {

    // Static way
    // const rocketId = this.route.snapshot.paramMap.get('id');

    // Dynamic way to get route informations (snapshot is static and immutable)
    this.rocketId = this.route.params.pipe(

      // Get the value of routing parameter named : id (look at the way you configure the rooute in parent HTML)
      map(param => param.id)
    );

    // Get the Rocket observable by link to the previous stream to ensure stream execution order
    this.rocketObs = this.rocketId.pipe(

      // Use the ID of the first stream tranformation
      switchMap(id => this.rocketsService.getRocket(id))
    );

    // Get the Launches observable by link to the previous stream to ensure stream execution order
    this.rocketLaunchesObs = this.rocketId.pipe(

      // Use the ID of the first stream tranformation
      switchMap(id => this.rocketsService.getRocketLaunches(id))
    );
  }

  previousRocketUrl(rocketId: string): void {
    const currentIndex: number = this.rocketIds.indexOf(rocketId);
    console.log(`======== CurrentID : ${rocketId}, Current Index : ${currentIndex}, Length : ${this.rocketIds.length}`);
    if (currentIndex >= 1) {
      this.routerService.navigate(['rockets', `${this.rocketIds[currentIndex - 1]}`]);
    }
  }

  nextRocketUrl(rocketId: string): void {
    const currentIndex: number = this.rocketIds.indexOf(rocketId);
    console.log(`======== CurrentID : ${rocketId}, Current Index : ${currentIndex}, Length : ${this.rocketIds.length}`);
    if (currentIndex < this.rocketIds.length - 1) {
      this.routerService.navigate(['rockets', `${this.rocketIds[currentIndex + 1]}`]);
    }
  }
}
