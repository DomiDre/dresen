import { Component } from '@angular/core';
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
export class AppComponent {

  constructor(
    private readonly auth: AuthService,
  ) { }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet
           && outlet.activatedRouteData
           && outlet.activatedRouteData.animation;
  }
}
