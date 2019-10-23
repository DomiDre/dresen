import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;
  loginError: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControl() { return this.loginForm.controls; }

  getErrorMessage() {
    return (
      this.formControl.email.hasError('required') ? 'E-Mail eingeben zum einloggen' :
      this.formControl.email.hasError('email') ? 'Keine gültige E-Mail' :
      ''
    );
  }

  onSubmit() {
    // called upon logging in via mail + password
    this.loginError = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.auth.emailLogin(
      this.formControl.email.value,
      this.formControl.password.value
    ).then(data => {
      this.router.navigate(['/blog'])
    }).catch(error => {
      console.log(error);
      if (error.code) {
        switch (error.code) {
          case 'auth/network-request-failed': {
            this.loginError = 'Internetverbindung fehlgeschlagen.';
            break;
          }
          case 'auth/user-not-found': {
            this.loginError = 'Benutzer nicht gefunden. Bist du überhaupt der Admin?';
            break;
          }
        }
      }
    });
  }

}
