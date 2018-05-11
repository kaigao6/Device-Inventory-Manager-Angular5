import { Component, OnInit } from '@angular/core';
import { DataService, User } from '../providers/data.service';

declare var $: any;


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  // private users: User[] = [];
  // private paUsers: User[] = [];
  // private idnew:number;
  // private counter:number = 0;
  // // private isAble:boolean = false;

  // private isAllUsers:boolean = true;
  // private isAdmins:boolean = false;
  // private isPas:boolean =false;
  private isAddUser:boolean = true;


  constructor(private dataService: DataService) { }
  ngAfterViewInit() {
    $(document).ready(function() {
      $(".nav-item").click(function() {
        $(".nav-item").removeClass("active ");
        // $(".tab").addClass("active"); // instead of this do the below
        $(this).addClass("active ");
      });
    });
  }

  // allClicked(){
  //   this.isAllUsers =true;
  //   this.isAdmins = false;
  //   this.isPas =false;
  // }
  // adminClicked(){
  //   this.isPas = false;
  //   this.isAllUsers =false;
  //   this.isAdmins = true;
  // }
  // pasClicked(){
  //   this.isAdmins = false;
  //   this.isPas =true;
  //   this.isAllUsers =false;
  // }


  ngOnInit() {
    // this.dataService.getUsersFromFirebase()
    //   .subscribe(
    //   (data) => this.users = data
    //   )



    // this.paUsers = this.dataService.getPaList();
    //
    // if(this.paUsers !=null){
    //   let idArr:number[] = [];
    //   this.paUsers.forEach(item=>idArr.push(item.id));
    //   this.idnew = idArr.pop()+1;
    // } else{
    //   this.paUsers = [];
    //   this.idnew = 1;
    // }


  }

  // generateId(){
  //   this.paUsers = this.dataService.getPaList();
  //   let id:number;
  //   if(this.paUsers !=null){
  //     let idArr:number[] = [];
  //     this.paUsers.forEach(item=>idArr.push(item.id));
  //     id = idArr.pop()+1;
  //   } else{
  //     this.paUsers = [];
  //     id = 1;
  //   }
  //   return id;
  // }
  //
  // onPaLevel(id: number) {
  //
  //   for (let user in this.users) {
  //
  //     if (this.users[user].id == id) {
  //
  //       console.log(id);
  //       console.log(this.users[user].email);
  //
  //       for(let pa in this.paUsers){
  //         if(this.paUsers[pa].email == this.users[user].email){
  //           this.counter++;
  //           console.log("He or she is already PA");
  //         }
  //       }
  //       if(this.counter == 0){
  //         // let newpa:User = new User(this.idnew,this.users[user].email,this.users[user].name );
  //         let newpa:User = new User(this.generateId(),this.users[user].email,this.users[user].name );
  //
  //         this.paUsers.push(newpa);
  //       }
  //
  //     }
  //   }
  //
  //   console.log(this.paUsers);
  //   this.dataService.storePaListToFirebase(this.paUsers)
  //     .subscribe(
  //       (response)=> {console.log(response);
  //         // this.ngOnInit();
  //
  //       }
  //     ),
  //     (error)=>console.log(error)
  //
  //   // this.ngOnInit();
  //
  // }
  //
  // onDismissPa(id: number){
  //   this.paUsers = this.paUsers.filter(pa => pa.id !=id);
  //   this.dataService.storePaListToFirebase(this.paUsers)
  //     .subscribe(
  //       (response)=>console.log(response)
  //     ),
  //     (error)=>console.log(error)
  // }

}
