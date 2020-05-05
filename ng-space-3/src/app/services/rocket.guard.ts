import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RocketGuard implements CanActivate {
    rocketIds: string[] = ['falcon1', 'falcon9', 'falconheavy', 'starship'];
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        // get current index
        const currentId: string = route.paramMap.get('id');

        // if current index dont exists
        if (this.rocketIds.includes(currentId)) {

            // Return true
            return true;

        } else {

            // Go to not found
            this.router.navigate(['notfound']);
        }
    }
}
