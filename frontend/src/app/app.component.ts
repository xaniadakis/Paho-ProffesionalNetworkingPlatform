import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart,
         NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { GlobalConstants } from './common/global-constants';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Taco';

  public showOverlay = true;

  constructor(private router: Router, private titleService: Title) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit(){
    this.titleService.setTitle(this.title);
  }
  
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }

}

