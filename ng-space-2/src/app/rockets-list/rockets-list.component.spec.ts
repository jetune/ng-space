import { TestBed, async } from '@angular/core/testing';
import { RocketsListComponent } from './rockets-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as sinon from 'sinon';
import { RocketsService } from '../services/rockets.service';
import { of } from 'rxjs';
import { Rocket } from '../models/rocket.model';
import { By } from '@angular/platform-browser';

describe('RocketsListComponentTest', () => {

    // Service à mocker
    let rocketService: RocketsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RocketsListComponent
            ],
            imports: [
                HttpClientTestingModule
            ],
            providers: [RocketsService]
        }).compileComponents();

        // Create Mock instance 
        rocketService = TestBed.inject(RocketsService);
    }));

    it('Should create RocketsListComponent when all dependencies are available.', () => {
        const fixture = TestBed.createComponent(RocketsListComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    // Test case that validate 6 row when fetched 3 rockets
    it('Should create 3 rows when total fetched rockets is 3', () => {

        // Rocket List to return when call Mocket Method
        const returnRockets = [
            {
                id: 1,
                active: false,
                company: 'SpaceX',
                rocket_name: 'Falcon 1',
                first_flight: '2006-03-24'
            },
            {
                id: 2,
                active: true,
                company: 'SpaceX',
                rocket_name: 'Falcon 9',
                first_flight: '2010-06-04'
            },
            {
                id: 3,
                active: true,
                company: 'SpaceX',
                rocket_name: 'Falcon Heavy',
                first_flight: '2018-02-06'
            }
        ];

        // Mock get Rocket method
        sinon.stub(rocketService, 'getRockets').callsFake(() => of(returnRockets as Rocket[]));

        // Create Rocket List Compoent
        const fixture = TestBed.createComponent(RocketsListComponent);

        // Detect Changes
        fixture.detectChanges();

        // Get List rows
        const rows = fixture.debugElement.queryAll(By.css('.item-row'));

        // Assertion
        expect(rows.length).toBe(3);
    });

    // Check active class when rocket is active
    it('Should use active css class when rocket is active', () => {

        // Rocket List to return when call Mocket Method
        const returnRocket = {
            id: 1,
            active: true,
            company: 'SpaceX',
            rocket_name: 'Falcon 1',
            first_flight: '2006-03-24'
        };

        // Mock get Rocket method
        sinon.stub(rocketService, 'getRockets').callsFake(() => of([returnRocket] as Rocket[]));

        // Create Rocket List Compoent
        const fixture = TestBed.createComponent(RocketsListComponent);

        // Detect Changes
        fixture.detectChanges();

        // Get List rows
        const icon = fixture.debugElement.query(By.css('i'));

        // Assertion
        expect(icon.classes.active).toBeTruthy();
    });

    // Check active class when rocket is active
    it('Should use inactive css class when rocket is inactive', () => {

        // Rocket List to return when call Mocket Method
        const returnRocket = {
            id: 1,
            active: false,
            company: 'SpaceX',
            rocket_name: 'Falcon 1',
            first_flight: '2006-03-24'
        };

        // Mock get Rocket method
        sinon.stub(rocketService, 'getRockets').callsFake(() => of([returnRocket] as Rocket[]));

        // Create Rocket List Compoent
        const fixture = TestBed.createComponent(RocketsListComponent);

        // Detect Changes
        fixture.detectChanges();

        // Get List rows
        const icon = fixture.debugElement.query(By.css('i'));

        // Assertion
        expect(icon.classes.inactive).toBeTruthy();
    });

});
