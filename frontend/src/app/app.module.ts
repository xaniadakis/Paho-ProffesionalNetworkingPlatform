import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { StartComponent } from './start/start.component';
import { InfoResolver } from './start/info.resolver';
import { StartComponentResolver } from './start/start.component.resolver';
import { NetworkComponent } from './network/network.component';
import { FriendComponentResolver } from './network/friend.component.resolver'
import { NetworkComponentResolver } from './network/network.component.resolver'
import { PostingsComponent } from './postings/postings.component';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInfoComponentResolver } from './personal-info/personal-info.component.resolver';
import { SettingsComponent } from './settings/settings.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS  } from '@angular/common/http'; 
import { AuthorizationInterceptorService } from './auth.inter.service'; 
import { JwtHelperService } from '@auth0/angular-jwt';
import { GuardService } from './guard.service';
import { ChatService } from './chat/chat.service';
import { EmailService } from './email.service'
import { Title } from '@angular/platform-browser';
// import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialModule } from './loggedin/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    StartComponent,
    NetworkComponent,
    PostingsComponent,
    ChatComponent,
    NotificationsComponent,
    PersonalInfoComponent,
    SettingsComponent,
    PagenotfoundComponent,
    WelcomeComponent,
    AboutusComponent,
    LoggedinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    // MatSidenavModule
    ],
  exports: [
    // MaterialModule,
    // MatSidenavModule
  ],
  providers: [
    ChatService,
    StartComponentResolver,
    PersonalInfoComponentResolver,
    NetworkComponentResolver,
    InfoResolver, 
    FriendComponentResolver,
    EmailService,
    Title,
    {
      provide: JwtHelperService,
      useFactory: () => new JwtHelperService()
    },
    GuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent, WelcomeComponent]
})
export class AppModule { }
