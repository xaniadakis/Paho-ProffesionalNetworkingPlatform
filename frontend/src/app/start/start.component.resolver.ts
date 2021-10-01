import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { PostService } from './post.service';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})

export class StartComponentResolver implements Resolve<Observable<string | Array<Post>>> {
  constructor(private post: PostService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<string | Array<Post>> {
    console.log('Called Get Post in resolver...', route);
    return this.post.getPosts().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
