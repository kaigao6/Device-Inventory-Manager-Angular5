import { Injectable } from "@angular/core";

import { CanActivate } from "@angular/router";
import { AuthService } from "../providers/auth.service";
import { User, DataService } from "../providers/data.service";



@Injectable()
export class AdminloginGuard implements CanActivate {
  // private isAdminLoggedin:boolean;
  private adminList: User[] = [];
  constructor(private dataService: DataService,
    private authService: AuthService
  ) { }

  canActivate() {
    this.adminList = this.dataService.getAdminList();
      // .subscribe(
      // (data) => {
      //   this.adminList = data;
      // }
      // )
    // console.log(this.adminList);
    // console.log(this.authService.getCurrentUserEmail());
    for (let admin in this.adminList) {
      if (this.adminList[admin].email == this.authService.getCurrentUserEmail()) {
        // this.isAdminLoggedin =true;
        return true;
      }
    }
    // this.isAdminLoggedin = false;
    return false;
    // return true;

  }

}
