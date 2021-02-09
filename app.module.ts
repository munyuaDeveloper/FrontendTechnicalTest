import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditCardPaymentComponent } from './credit-card-payment/credit-card-payment.component';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {ReactiveFormsModule} from '@angular/forms';
import {CreditCardPaymentStoreEffects} from './AppStore/effects';
import {CreditCardPaymentFacade} from './AppStore/facade';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import * as storeModuleConfiguration from './AppStore';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {PaymentService} from './services/payment.service';
import {ToastrModule} from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    CreditCardPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToasterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    HttpClientModule,
    EffectsModule.forRoot(),
    StoreModule.forFeature(storeModuleConfiguration.moduleFeatureKey, storeModuleConfiguration.moduleReducers),
    EffectsModule.forFeature([CreditCardPaymentStoreEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ToastrModule.forRoot(),
  ],
  providers: [
    PaymentService,
    ToasterService,
    CreditCardPaymentFacade,
    CreditCardPaymentStoreEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
