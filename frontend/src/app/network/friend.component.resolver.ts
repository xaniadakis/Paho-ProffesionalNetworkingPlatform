import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { FriendService } from './friend.service';
import { Friend } from './friend';

@Injectable({
  providedIn: 'root'
})

export class FriendComponentResolver implements Resolve<Observable<string | Array<Friend>>> {
  constructor(private friend: FriendService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<string | Array<Friend>> {
    console.log('Called Get Friend in resolver...', route);
    return this.friend.getFriends().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
