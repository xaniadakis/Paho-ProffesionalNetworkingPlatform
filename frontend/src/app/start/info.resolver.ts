import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { InfoService } from './info.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class InfoResolver implements Resolve<Observable<string | User>> {
  constructor(private user: InfoService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<string | User> {
    console.log('Called Get Info in resolver...', route);
    return this.user.getInfo().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
