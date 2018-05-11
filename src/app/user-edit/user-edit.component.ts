import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { User, DataService } from '../providers/data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  allUsers:User[]=[]; // to store updated all users list
  user:User;  //current user to be assigned new role

  pas:User[]=[]; //to store new pa list
  private idPanew:number;
  private countPa:number = 0;

  admins:User[]=[]; //to store new admin List
  private idAdminNew:number;
  private countAdmin:number = 0;


  constructor(private routeInfo: ActivatedRoute,
              private dataService:DataService,
              private router:Router
  ) { }

  ngOnInit() {
    let userId = this.routeInfo.snapshot.params["id"];
    this.user = this.dataService.getUser(userId);
    this.allUsers = this.dataService.getAllUsers();

    this.dataService.getPaListFromFirebase()
      .subscribe(
        (data) => {this.pas = data;
          if(data != null){
            let idArr:number[]=[];
            this.pas.forEach( item => idArr.push(item.id));
            this.idPanew = idArr.pop()+1;
          }else{
            this.pas = [];
            this.idPanew = 1;
          }
        }
      )
    this.dataService.getAdminListFromFirebase()
      .subscribe(
        (data)=>{
          this.admins = data;
          if(data !=null){
            let idArr:number[] = [];
            this.admins.forEach(item => idArr.push(item.id));
            this.idAdminNew = idArr.pop()+1;
          }else{
            this.admins=[];
            this.idAdminNew =1;
          }
        }
      )

    // this.dataService.getUsersFromFirebase()
    //   .subscribe(
    //     (data)=>{this.allUsers = data;
    //     // console.log(this.allUsers);
    //   })

      // console.log(this.allUsers);

  }
  assginToPA(){
    // console.log(this.user);
    // console.log(email);
    // console.log(this.allUsers);

    for(let key in this.pas){
      if(this.pas[key].email == this.user.email){
        this.countPa++;
      }
    }
    if(this.countPa ==0){
      //if pa does exist, add this user to pa list
      this.pas.push(new User(this.idPanew,this.user.email,this.user.name,""));

      //update all users List, update current user's role to PA
      // this.user.type = "pa";

      // for(let user in this.allUsers){
      //   if(this.allUsers[user].email == this.user.email){
      //     this.allUsers[user].type = "pa";
      //   }
      // }
      // this.dataService.storeUsers(this.allUsers)
      //   .subscribe(
      //     (res) => console.log(res)
      //   )

      this.dataService.storePaListToFirebase(this.pas)
        .subscribe(
          response => {

            // setTimeout(()=>{
            //     this.router.navigate(['/home/usersmanage'])
            // },2000)
            this.router.navigate(['/home/usersmanage']);
            // console.log(response)
          }
        )
    }else{
      alert("This Teaching Assistant user already exists.");
    }

    this.ngOnInit();
  }
  assginToAdmin(){
    for(let key in this.admins){
      if(this.admins[key].email == this.user.email){
        this.countAdmin++;
      }
    }

    if(this.countAdmin ==0){
      this.admins.push(new User(this.idAdminNew,this.user.email, this.user.name, ""));
      this.dataService.storeAdminListToFirebase(this.admins)
        .subscribe(
          res =>{
            this.router.navigate(['/home/usersmanage']);
            // console.log(res)

          }
        )
    }else{
      alert("This Professor user already exists.");

    }
  }

}
