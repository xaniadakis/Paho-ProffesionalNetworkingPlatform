import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { StartComponent } from './start/start.component';
import { StartComponentResolver } from './start/start.component.resolver';
import { InfoResolver } from './start/info.resolver';
import { NetworkComponent } from './network/network.component';
import { NetworkComponentResolver } from './network/network.component.resolver'
import { FriendComponentResolver } from './network/friend.component.resolver'
import { PostingsComponent } from './postings/postings.component';
import { PostingsComponentResolver } from './postings/postings.component.resolver';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsComponentResolver } from './notifications/notifications.component.resolver';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInfoComponentResolver } from './personal-info/personal-info.component.resolver';
import { SettingsComponent } from './settings/settings.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { AuthorizationInterceptorService } from './auth.inter.service'; 
import { GuardService } from './guard.service';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { 
    path: 'app', component: AppComponent,
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'loggedin', component: LoggedinComponent ,  canActivate: [ GuardService ],
        children: [
          { path: 'start', component: StartComponent, 
            canActivate: [ GuardService ],
            resolve: {Posts: StartComponentResolver, Info: InfoResolver} 
          } ,
          { path: 'network', component: NetworkComponent, canActivate: [ GuardService ], resolve: {All: NetworkComponentResolver, Friends: FriendComponentResolver} },
          { path: 'postings', component: PostingsComponent , canActivate: [ GuardService ], resolve: {Postings: PostingsComponentResolver} },
          { path: 'chat', component: ChatComponent , canActivate: [ GuardService ], resolve: {Friends: FriendComponentResolver} },
          { path: 'notifications', component: NotificationsComponent , canActivate: [ GuardService ], resolve: {Requests: NotificationsComponentResolver} },
          { path: 'personal-info', component: PersonalInfoComponent , canActivate: [ GuardService ], resolve: {Info: PersonalInfoComponentResolver} },
          { path: 'settings', component: SettingsComponent , canActivate: [ GuardService ] }
        ]
      }
    ]
  },
  // { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
      // , {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
