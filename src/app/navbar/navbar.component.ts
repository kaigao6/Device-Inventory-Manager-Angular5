import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { DataService } from '../providers/data.service';
import { AdminloginGuard } from '../guard/adminlogin.guard';
import { PaloginGuard } from '../guard/palogin.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   loggedinUser:string;

  isHome:boolean =true;
  private isManage:boolean =false;
  isAdminLoggedin:boolean ;
  private isPaLoggedin:boolean;
   title:string ="Student: ";

  constructor(private authService:AuthService,
              private dataService:DataService,
              private adminGuard:AdminloginGuard,
              private paGuard:PaloginGuard
  ) { }

  ngOnInit() {
    if(this.authService.getCurrentUserEmail()){
      let currentUserEmail:string = this.authService.getCurrentUserEmail();
      this.loggedinUser = currentUserEmail.split('@')[0];
    }

    this.dataService.getPaListFromFirebase()
      .subscribe(
        (data) =>{
          this.isPaLoggedin = this.paGuard.canActivate();
          if(this.isPaLoggedin){
            this.title = "Teaching Assistant: ";

            if(this.isAdminLoggedin){
              this.title= "Professor: ";
            }
          }

        }
      )
    this.dataService.getAdminListFromFirebase()
      .subscribe(
        (data) =>{
          this.isAdminLoggedin = this.adminGuard.canActivate();
          // console.log("isAdminLoggedin here");
          // console.log(this.isAdminLoggedin);
          if(this.isAdminLoggedin){
            this.title = "Professor: ";
          }

        }
      )
    // this.isAdminLoggedin = this.adminGuard.canActivate();
    // console.log(this.isAdminLoggedin);
  }

  onLogout(){
    this.authService.logout();
    location.reload();
  }

  homeClicked(){
    this.isHome =true;
    this.isManage=false;
  }
  manageClicked(){
    this.isManage = true;
    this.isHome =false;
  }
  // userListCliked(){
  //   this.dataService.getAdminList();
  //
  // }

}
