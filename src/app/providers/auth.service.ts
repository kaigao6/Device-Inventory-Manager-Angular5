import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
// import {AngularFireAuth} from "angularfire2/auth";
// import {Observable} from 'rxjs/Observable';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase';


@Injectable()
export class AuthService {
  private currentUserEmail: string = "";
  private count:number =0;

  constructor(private router: Router) {
    // this.user = afAuth.authState;
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
      error => {
        // console.log(error)
      }
      )
  }

  loginUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
      response => {
        // console.log("user login!")
        // console.log(response);
        // console.log(response.email);
        this.currentUserEmail = response.email;
        this.router.navigate(['/home']);
        this.count = 0;
      }
      )
      .catch(
      error => {
        // console.log(error);
        // console.log(error.code);
        if (error.code == "auth/invalid-email") {
          alert("Please enter an valid email address");
        } else if (error.code == "auth/wrong-password") {

          this.count++;
          if (this.count > 3) {
            // console.log(this.count);
            alert("If you forgot your password, please contact one of admin professors to reset your password")
          } else {
            // console.log(this.count);

            alert("The password is invalid. Please enter it again!");
          }
        } else if (error.code == "auth/user-not-found") {
          alert("The user does not exist. Please conact one of admin professors!")
        } else {
          console.log(error.message);
        }

      }
      )
  }

  getCurrentUserEmail() {
    return this.currentUserEmail;
  }
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/login']);

  }



  // loginWithGoogle(){
  //   // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  //
  // }

}
