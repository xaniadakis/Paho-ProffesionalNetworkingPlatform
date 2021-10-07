import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable()
export class GuardService implements CanActivate {
  constructor(public authent: AuthenticationService, public router: Router) {}
  canActivate(): Promise<boolean> | boolean{
        const isAuth = this.authent.isAuthenticated();
        console.log("isauthenticated = ", isAuth)
        // return isAuth ? true :  this.router.navigate(['/']);
        if(!isAuth){
            //alert("You are not authenticated to view this page.")
            console.log("You are not authenticated to view this page.")
            this.router.navigateByUrl('/app/welcome');  
        }
        return isAuth;
    }
}