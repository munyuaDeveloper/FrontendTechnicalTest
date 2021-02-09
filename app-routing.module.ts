import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {CreditCardPaymentComponent} from './credit-card-payment/credit-card-payment.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
  },
  {
    path: 'payment',
    component: CreditCardPaymentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
