import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../providers/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  isLoginInfoShow:boolean = true;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  loginBtnClicked(){
    this.isLoginInfoShow = !this.isLoginInfoShow;
  }

  onLogin(form: NgForm ){
    const email= form.value.email;
    const password = form.value.password;
    this.authService.loginUser(email,password);
  }

}
