import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { RequestService } from './request.service';
import { Request } from './request';

@Injectable({
  providedIn: 'root'
})

export class NotificationsComponentResolver implements Resolve<Observable<string | Array<Request>>> {
  constructor(private req: RequestService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<string | Array<Request>> {
    console.log('Called Get Requests in resolver...', route);
    return this.req.getRequests().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
