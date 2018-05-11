import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

// import {AngularFireModule} from 'angularfire2';
import { AngularFireModule } from 'angularfire2';
// import {AngularFireAuth} from 'angularfire2/auth';
// import { AngularFireAuthModule } from 'angularfire2/auth';
// import { AngularFireAuthModule } from 'angularfire2/auth';
// import { NgxQRCodeModule } from 'ngx-qrcode2';
import { QRCodeModule } from 'angular2-qrcode';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';

import {AuthService} from './providers/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DataService } from './providers/data.service';
import { DeviceAddComponent } from './device-add/device-add.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { PaloginGuard } from './guard/palogin.guard';
import { RegularloginGuard } from './guard/regularlogin.guard';
import { UserListComponent } from './user-list/user-list.component';
// import { UserAddComponent } from './user-add/user-add.component';
import { AdminloginGuard } from './guard/adminlogin.guard';
import { AllUsersListComponent } from './all-users-list/all-users-list.component';
import { PaListComponent } from './pa-list/pa-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';

import {AgmCoreModule} from "@agm/core";
import { FilterPipe } from './pipe/filter.pipe';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FooterComponent } from './footer/footer.component';

const routeConfig: Routes=[
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path: 'login', component:LoginPageComponent},
  {path: 'home', component:HomePageComponent,
    children:[
      {path:'',component:DeviceListComponent},
      {path:'devicedetail/:id', component:DeviceDetailComponent},
      {path:'deviceedit/:id', component:DeviceEditComponent, canActivate:[PaloginGuard]},

      {path:'deviceadd', component:DeviceAddComponent, canActivate:[PaloginGuard]},
      {path:'usersmanage',component:UserListComponent,canActivate:[AdminloginGuard],
        children:[
          {path:'', component:AllUsersListComponent},
          {path:'pas', component:PaListComponent},
          {path:'admins', component:AdminListComponent},
          {path:'useradd', component:SignupComponent},
          {path:'useredit/:id', component:UserEditComponent}
        ]
      }
      // {path:'signup',component: SignupComponent,canActivate:[AdminloginGuard]}
    ], canActivate:[RegularloginGuard]
  } ,
  // {path: 'signup', component: SignupComponent}

]


//
// export const firebaseConfig = {
//     apiKey: "AIzaSyBIy7UACjyO3dOC99cs2Imat5xEXBxquc8",
//     authDomain: "ngfbauthtest.firebaseapp.com",
//     databaseURL: "https://ngfbauthtest.firebaseio.com",
//     projectId: "ngfbauthtest",
//     storageBucket: "ngfbauthtest.appspot.com",
//     messagingSenderId: "1027559386705"
// }

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    HomePageComponent,
    DeviceListComponent,
    DeviceDetailComponent,
    SignupComponent,
    DeviceAddComponent,
    DeviceEditComponent,
    UserListComponent, //Users Management
    // UserAddComponent,
    AllUsersListComponent,
    PaListComponent,
    AdminListComponent,
    FilterPipe,
    UserEditComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routeConfig),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyBpX7-Yrhm04YyO4p6xqRpFrpKkiEXGvS0" // google map api key
    }),
    // NgxQRCodeModule,
    QRCodeModule
    // RouterModule.forChild(routeConfig)

    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,

  ],
  providers: [AuthService,DataService,PaloginGuard,RegularloginGuard,AdminloginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
