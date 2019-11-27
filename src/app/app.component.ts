import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from './animations';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit {

  constructor(
    private readonly auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.logIn();
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet
           && outlet.activatedRouteData
           && outlet.activatedRouteData.animation;
  }
}
