import { Component, OnInit } from '@angular/core';
import { DataService, User } from '../providers/data.service';

@Component({
  selector: 'app-all-users-list',
  templateUrl: './all-users-list.component.html',
  styleUrls: ['./all-users-list.component.css']
})
export class AllUsersListComponent implements OnInit {
  allUsers: User[] = [];
  allUsersOrigin: User[] = [];
  pas: User[] = [];
  admins: User[] = [];
  private isAddFormHidden: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getPaListFromFirebase()
      .subscribe(
      res => {
        // console.log(res);
        this.pas = res;
      }
      )
    this.dataService.getAdminListFromFirebase()
      .subscribe(
      res => {
        // console.log(res);
        this.admins = res;
      }
      )
    this.pas = this.dataService.getPaList();
    this.admins = this.dataService.getAdminList();


    this.dataService.getUsersFromFirebase()
      .subscribe(
      (data) => {
        this.allUsers = data;
        this.allUsersOrigin = data;
        // console.log(this.allUsers);
        // console.log(this.pas);
        // console.log(this.admins);




        if (this.allUsers) {

          for(let key in this.allUsers){
              this.allUsers[key].type = 'Student';
          }



          for (let key1 in this.allUsers) {
            for (let key2 in this.pas) {
              if (this.allUsers[key1].email == this.pas[key2].email) {
                this.allUsers[key1].type = 'Teaching Assistant';
              } else {
                // this.allUsers[key1].type = 'Student';

              }
            }
          }

          for (let key1 in this.allUsers) {
            for (let key2 in this.admins) {
              if (this.allUsers[key1].email == this.admins[key2].email) {
                this.allUsers[key1].type = 'Professor';
              }
            }
          }

          // if (this.allUsers) {
          //   for (let key1 in this.allUsers) {
          //     for (let key2 in this.pas) {
          //       if (this.allUsers[key1].email == this.pas[key2].email) {
          //         this.allUsers[key1].type = 'PA';
          //       }else{
          //         this.allUsers[key1].type = 'Student';
          //       }
          //     }
          //   }
          //
          //   for (let key1 in this.allUsers) {
          //     for (let key2 in this.admins) {
          //       if (this.allUsers[key1].email == this.admins[key2].email) {
          //         this.allUsers[key1].type = 'Admin';
          //       }else{
          //         this.allUsers[key1].type = 'Student';
          //       }
          //     }
          //   }



        }




      }
      )
  }

  onDelete(id: number) {
    // console.log(id);


    this.allUsers = this.allUsers.filter(user => user.id != id);
    this.dataService.storeUsers(this.allUsers)
      .subscribe(
      (response) => {
        // console.log(response)
      }
      )
    // console.log("here")
    // this.allUsersOrigin = this.allUsersOrigin.filter(user => user.id != id);
    // this.dataService.storeUsers(this.allUsersOrigin)
    //   .subscribe(
    //   (response) => {
    //     // console.log(response)
    //   }
    //   )
  }

}
