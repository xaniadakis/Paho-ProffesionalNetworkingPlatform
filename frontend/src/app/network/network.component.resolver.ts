import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { NetworkService } from './network.service';
import { User } from './network';

@Injectable({
  providedIn: 'root'
})

export class NetworkComponentResolver implements Resolve<Observable<string | Array<User>>> {
  constructor(private all: NetworkService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<string | Array<User>> {
    console.log('Called Get All in resolver...', route);
    return this.all.getAll().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
