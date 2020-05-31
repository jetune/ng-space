import { Component, OnInit } from '@angular/core';
import { RocketsService } from '../services/rockets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rocket } from '../models/rocket.model';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { Launch } from '../models/launch.model';
import { map, switchMap, startWith, filter, delay } from 'rxjs/operators';
import { FormControl, PatternValidator, Validators } from '@angular/forms';

@Component({
  selector: 'ngs-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.scss']
})
export class RocketComponent implements OnInit {

  private readonly rocket_ids = ['falcon1', 'falcon9', 'falconheavy', 'bfr'];

  rocket$: Observable<Rocket>;
  launches$: Observable<Launch[]>;
  searchBox: FormControl;

  // TODO 2: Use the FormControl to find you way Luke !
  // searchCtrl: FormControl;

  constructor(private rocketsService: RocketsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.searchBox = new FormControl('', [Validators.pattern('^[0-9]{4}$'), Validators.min(2002)]);

    // Get year stream
    const yearObs = this.searchBox.valueChanges.pipe(
      // To force initial value to 'null' : nécessaire parce que 'combineLatest' aura besoin que 
      // les 2 flux combinés emettent une valeur. Or lors du premier affichage d'un TextBox, aucune 
      // valeur ne se trouve dans son stream et donc aucun traitement ne sera déclenché
      // tslint:disable-next-line: deprecation
      startWith(null),
      filter(() => this.searchBox.valid),
      delay(1000)
    );

    const idObs = this.activatedRoute.params.pipe(
      map(param => param.id)
    );

    this.rocket$ = idObs.pipe(
      switchMap(id => this.rocketsService.getRocket(id))
    );

    // tslint:disable-next-line: deprecation
    this.launches$ = combineLatest(idObs, yearObs).pipe(

      // tslint:disable-next-line: deprecation
      switchMap(([id, year]) => this.rocketsService.getRocketLaunches(id, year))
    );
  }

  navigate(value: number): void {
    const currentIndex = this.rocket_ids.indexOf(this.activatedRoute.snapshot.paramMap.get('id'));
    const newIndex = currentIndex + value;
    this.router.navigate(['rockets', this.rocket_ids[newIndex]]);
  }
}
