import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { PersonalInfoService } from './personal-info.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class PersonalInfoComponentResolver implements Resolve<Observable<string | User>> {
  constructor(private user: PersonalInfoService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<string | User> {
    console.log('Called Get Info in resolver...', route);
    return this.user.getInfo().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
