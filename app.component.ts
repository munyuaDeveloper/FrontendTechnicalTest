import {Component, OnInit} from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';
import {Observable} from 'rxjs';
import {CreditCard} from './models/credit-card';
import {Router} from '@angular/router';
import {CreditCardPaymentFacade} from './AppStore/facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Credit card payment';
  toasterConfig: ToasterConfig;
  creditCard$: Observable<CreditCard>;

  constructor(private router: Router, private creditCardPaymentFacade: CreditCardPaymentFacade) {

    this.toasterConfig = new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true,
      positionClass: 'toast-top-full-width',
      timeout: 3000
    });
    this.creditCard$ = this.creditCardPaymentFacade.data$;
  }

  ngOnInit(): void {
    this.creditCard$.subscribe(data => {
    });
  }
}
