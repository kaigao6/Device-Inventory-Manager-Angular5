import { Component, OnInit } from '@angular/core';
import { DataService, User } from '../providers/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
   admins:User[]=[];
  private typeDefault:string = "admin";
  private idnew:number;
  private count:number = 0;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    // this.admins = this.dataService.getAdminList();
    //这里有区别。上面取消guard不及时更新显示。下面这个可以
    this.dataService.getAdminListFromFirebase()
      .subscribe(
        (data)=> {
          this.admins = data;
          // console.log(data);
          if(data !=null){
            let idArr:number[]=[];
            this.admins.forEach(item => idArr.push(item.id));
            this.idnew = idArr.pop()+1;
          }else{
            this.admins = [];
            this.idnew = 1;
          }

        }
      )

  }
  onAddAdmin(form:NgForm){
    for(let key in this.admins){
      if(this.admins[key].email == form.value.email){
        this.count++;
      }
    }
    if(this.count ==0){
      this.admins.push(new User(this.idnew++,form.value.email, form.value.name,this.typeDefault));
      this.dataService.storeAdminListToFirebase(this.admins)
        .subscribe(
          (response) => {
            // console.log(response)
          }

        )
    }else{
      alert("This Admin user already exists. Pleae re-enter");

    }

  }
  onDelete(id:number){
    this.admins = this.admins.filter(admin => admin.id !=id);
    this.dataService.storeAdminListToFirebase(this.admins)
      .subscribe(
        (response)=>{
          // console.log(response)
        }

      )
  }

}
