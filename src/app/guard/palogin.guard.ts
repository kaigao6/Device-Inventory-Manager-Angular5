import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { DataService, User } from "../providers/data.service";
import { AuthService } from "../providers/auth.service";
import { AdminloginGuard } from "./adminlogin.guard";

@Injectable()
export class PaloginGuard implements CanActivate{

  private paList:User[] = [];

  private paAdminTotalList: User[]=[];
  private adminList:User[]=[];
  // private isAdminLoggedin:boolean = false;

  constructor(private dataService:DataService,
              private authService:AuthService,
              // private adminGuard:AdminloginGuard
              // private router:Router
  ) { }

  canActivate() {
    // this.dataService.getPaList()
    //   .subscribe(
    //     (data) =>{
    //       this.paList = data;
    //     }
    //   )


    // this.dataService.getAdminListFromFirebase()
    //   .subscribe(
    //     (data)=>{
    //       this.isAdminLoggedin = this.adminGuard.canActivate();
    //
    //
    //
    //
    //           this.paList = this.dataService.getPaList();
    //           console.log(this.paList);
    //           console.log(this.authService.getCurrentUserEmail());
    //           for(let pa in this.paList){
    //             if(this.paList[pa].email == this.authService.getCurrentUserEmail() ){
    //               // console.log("test?");
    //               // this.router.navigate(['./deviceadd']);
    //               return true;
    //             }
    //           }
    //           // console.log("there");
    //          console.log(false ||this.isAdminLoggedin);
    //
    //           return false || this.isAdminLoggedin;
    //           // return true;
    //
    //
    //
    //
    //
    //
    //     }
    //   )
    //
    //



    // this.paList = this.dataService.getPaList();
    // console.log(this.paList);
    // console.log(this.authService.getCurrentUserEmail());
    // for(let pa in this.paList){
    //   if(this.paList[pa].email == this.authService.getCurrentUserEmail() ){
    //     // console.log("test?");
    //     // this.router.navigate(['./deviceadd']);
    //     return true;
    //   }
    // }


    this.paList = this.dataService.getPaList();
    // console.log(this.paList);

    this.adminList = this.dataService.getAdminList();
    // console.log(this.adminList);
    if(this.adminList == null){
      this.adminList = [];
    }

    this.paAdminTotalList = this.adminList.push.apply(this.adminList,this.paList);
    // this.paAdminTotalList = this.adminList.push(...this.paList);

    // console.log(this.paAdminTotalList);


    // console.log(this.authService.getCurrentUserEmail());
    for(let pa in this.adminList){
      if(this.adminList[pa].email == this.authService.getCurrentUserEmail() ){
        // console.log("test?");
        // this.router.navigate(['./deviceadd']);

        return true;
      }
    }

    return false;
    // return true;

  }

}
