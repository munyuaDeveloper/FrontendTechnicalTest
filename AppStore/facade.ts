import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {load, payWithCard, payWithCardSuccess} from './actions';
import {CreditCardQuery} from './selectors';
import {CreditCard} from '../models/credit-card';
import {select, Store} from '@ngrx/store';

@Injectable()
export class CreditCardPaymentFacade {
  readonly data$: Observable<CreditCard>;

  constructor(private store: Store) {
    this.data$ = this.store.pipe(select(CreditCardQuery.getCreditCardState));
  }

  getCreditCardData(): any {
    this.store.dispatch(load());
  }

  makePayment(paymentData: CreditCard): any {
    this.store.dispatch(payWithCard({paymentData}));
  }

  storeCard(creditCardData): any {
    this.store.dispatch(payWithCardSuccess(creditCardData));
  }
}
