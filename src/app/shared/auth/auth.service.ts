import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

//import { AngularFireDatabase, FirebaseListObservable } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {

    public user: Observable<firebase.User>;

    private userDetails: firebase.User = null;
    public avatar:string;
    private avatar_path : string = '../../assets/img/round-person-24px-white.svg';

    constructor(public afAuth: AngularFireAuth, private router: Router) {

      this.user = afAuth.authState;
        //console.log("Auth service started...");
        this.avatar = this.avatar_path;

        this.user.subscribe(
            (user) => {
              if (user) {
                this.userDetails = user;
                this.avatar = user.photoURL;
                console.log(this.userDetails);
              }
              else {
                this.userDetails = null;
                this.avatar = this.avatar_path;
              }
            }
        );


    }

    signInWithTwitter() {
        return this.afAuth.auth.signInWithPopup(
          new auth.TwitterAuthProvider()
        )
    }

    signInWithFacebook() {
        return this.afAuth.auth.signInWithPopup(
          new auth.FacebookAuthProvider()
        )
    }

    loginGoogle() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }


    loginEmail(email: string, password: string) {
        this.afAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
            console.log('Nice, it worked!');
        })
        .catch(err => {
            console.log('Algo não está bem...:',err.message);
        });
    }


    isLoggedIn() {
        if (this.userDetails == null ) {
          return false;
        }
        else {
          return true;
        }
    }

    logout() {
        this.avatar = this.avatar_path;
        this.afAuth.auth.signOut()
        .then((res) => this.router.navigate(['/']));
    }


    printUser(event) {
        console.log(event);
    }

    printError(event) {
        console.error(event);
    }



      // signup(email: string, password: string) {
      //   this.firebaseAuth
      //     .auth
      //     .createUserWithEmailAndPassword(email, password)
      //     .then(value => {
      //       console.log('Success!', value);
      //     })
      //     .catch(err => {
      //       console.log('Something went wrong:',err.message);
      //     });
      // }

      // login(email: string, password: string) {
      //   this.firebaseAuth
      //     .auth
      //     .signInWithEmailAndPassword(email, password)
      //     .then(value => {
      //       console.log('Nice, it worked!');
      //     })
      //     .catch(err => {
      //       console.log('Something went wrong:',err.message);
      //     });
      // }
      //
      // logout() {
      //   this.firebaseAuth
      //     .auth
      //     .signOut();
      // }



}
