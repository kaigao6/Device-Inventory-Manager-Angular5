import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
import { User, DataService } from '../providers/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private users:User[]=[];
  private id:number;
  private name:string="";
  private count:number = 0;
  private type:string ="Student";

  constructor(private authService:AuthService,
              private dataService:DataService,
              private router:Router
  ) { }

  ngOnInit() {
    this.dataService.getUsersFromFirebase()
      .subscribe(
        (data)=>{
          this.users = data;
          if(data !=null){
            let idArr:number[]=[];
            this.users.forEach(item => idArr.push(item.id));
            this.id = idArr.pop()+1;
          }else{
            this.users = [];
            this.id=1;
          }
        }
      )
  }
  onSignup(form: NgForm ){
    const email= form.value.email;
    const password = form.value.password;
    // console.log(this.users);
    for( let key in this.users){
      // console.log(this.users[key].email);
      if(this.users[key].email == email){
        this.count++;
      }
    }
    if(this.count ==0){
      this.users.push(new User(this.id, form.value.email, form.value.name, this.type));

      this.dataService.storeUsers(this.users)
        .subscribe(
          (response) => {
            // console.log(response);
            this.router.navigate(['/home/usersmanage']);
          },
          (error)=>{
            // console.log(error)
          }
        )
      this.authService.signupUser(email, password);


    }else{
      alert("The user already exists. Pleae re-enter");
    }
    // console.log(this.users);


  }



}
