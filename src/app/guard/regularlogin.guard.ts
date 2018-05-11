import {CanActivate} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../providers/auth.service";

@Injectable()
export class RegularloginGuard implements CanActivate {

  constructor(  private authService:AuthService
  ) { }
  canActivate() {
    // constructor(private authService:AuthService){}

    // console.log("RegularloginGuard test");
    // console.log(this.authService.getCurrentUserEmail());
    if(this.authService.getCurrentUserEmail()){
      return true;
    }
    // return true; //to be changed Todo
    return false;
  }

}
