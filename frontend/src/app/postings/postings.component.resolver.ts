import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { PostingService } from './posting.service';
import { Posting } from './posting';

@Injectable({
  providedIn: 'root'
})

export class PostingsComponentResolver implements Resolve<Observable<string | Array<Posting>>> {
  constructor(private posting: PostingService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<string | Array<Posting>> {
    console.log('Called Get Posting in resolver...', route);
    return this.posting.getPostings().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
