import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RocketComponent } from './rocket.component';
import { RocketsService } from '../services/rockets.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Launch } from '../models/launch.model';
import { stub } from 'sinon';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Rocket } from '../models/rocket.model';

describe('RocketComponent', () => {

  let component: RocketComponent;
  let fixture: ComponentFixture<RocketComponent>;
  let rocketsService: RocketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [RocketComponent],
      providers: [
        RocketsService
      ]
    });
    fixture = TestBed.createComponent(RocketComponent);
    rocketsService = TestBed.get(RocketsService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display 3 launches when the user types 2010 in the search box', () => {
    stub(rocketsService, 'getRocket').callsFake(() => of({} as Rocket));
    const launches = [
      { mission_name: '1', launch_year: '2012', launch_success: true, details: 'I am mission 1' },
      { mission_name: '2', launch_year: '2010', launch_success: true, details: 'I am mission 2' },
      { mission_name: '3', launch_year: '2010', launch_success: true, details: 'I am mission 3' },
      { mission_name: '4', launch_year: '2010', launch_success: true, details: 'I am mission 4' }
    ] as Launch[];
    stub(rocketsService, 'getRocketLaunches').callsFake((_id, year) => of(launches.filter(l => year == +l.launch_year)))
    fixture.detectChanges();
    const searchBox = fixture.debugElement.query(By.css('input'));
    searchBox.nativeElement.value = 2010;
    searchBox.nativeElement.dispatchEvent(new Event('input'));
    tick(1000);
    fixture.detectChanges();
    const launchRows = fixture.debugElement.queryAll(By.css('.item-row'));
    expect(launchRows.length).toBe(3);
  });
});
