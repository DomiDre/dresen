import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
}
