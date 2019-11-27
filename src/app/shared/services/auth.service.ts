import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState;

  constructor(
    private readonly afAuth: AngularFireAuth
  ) {
    this.afAuth.auth.onAuthStateChanged(user => {
      this.authState = user;
    });
 }

  async emailLogin(email: string,
                   password: string): Promise<firebase.auth.UserCredential> {
    // Login via Email + Password
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  /**
   * Check if user is already logged in, otherwise perform anonymous login.
   */
  async logIn(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.pipe(take(1))
      .subscribe(async answer => {
        if (!answer) {
          const loginResult = await this.afAuth.auth.signInAnonymously();
          resolve(loginResult.user);
        } else {
          resolve(answer);
        }
      });
    });
  }
}
