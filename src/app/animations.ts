import {
  trigger,
  query,
  style,
  animate,
  transition,
} from '@angular/animations';

export const fader =
  trigger('routeAnimations', [
    transition('PostComponent <=> OverviewComponent', [
      query(':enter, :leave', [
        style({
          position: 'relative',
          left: 0,
          top: 0,
          width: '100%',
          opacity: 0,
        }),
      ], {optional: true}),
      query(':enter', [
        animate('600ms ease', style({ opacity: 1 })),
      ], {optional: true})
    ]),
]);
