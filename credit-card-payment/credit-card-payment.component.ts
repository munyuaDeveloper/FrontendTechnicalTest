import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {CreditCardPaymentFacade} from '../AppStore/facade';
import {currentDate} from '../AppStore/reducer';
import {ToasterService} from 'angular2-toaster';
import {PaymentService} from '../services/payment.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.scss']
})
export class CreditCardPaymentComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();

  paymentForm: FormGroup;
  errorMessage: string;
  currentDate = new Date();
  currentMonth = currentDate.getMonth() + 1;
  currentYear = currentDate.getFullYear();
  listOfYears = [];

  constructor(
    private formBuilder: FormBuilder,
    private facade: CreditCardPaymentFacade,
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.errorMessage = 'Please Fill all fields';
    this.paymentForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      nameOnCard: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('^[A-Za-z][A-Za-z -]*$')
      ]
      ],
      cardNumber: ['', Validators.required,
      ],
      expirationMonth: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
        Validators.min(this.currentMonth),
        Validators.max(12)
      ]
      ],
      expirationYear: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.min(this.currentYear),
        Validators.max(9999)
      ]
      ],
      cardCVVNumber: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.min(111),
        Validators.max(999)
      ]
      ]
    });
    this.generateYears();
  }

  // convenience getter for easy access to form fields
  get formControls(): any {
    return this.paymentForm.controls;
  }

  submitForm(): any {
    if (this.paymentForm.status === 'VALID') {
      const expiryDate = new Date(this.paymentForm.get('expirationYear').value, this.paymentForm.get('expirationMonth').value, 1);
      const paymentFormData = {
        creditCardNumber: this.paymentForm.get('cardNumber').value.toString(),
        cardHolder: this.paymentForm.get('nameOnCard').value,
        expirationDate: expiryDate,
        securityCode: this.paymentForm.get('cardCVVNumber').value,
        amount: +this.paymentForm.get('amount').value,
      };

      this.facade.makePayment(paymentFormData);
      this.paymentService.makePayment(paymentFormData).subscribe(
        response => {
          if (response.body.status === 'success') {
            this.showSuccess();
          } else {
            this.showError();
          }
        }
      );
    } else {
      this.errorMessage = 'the Form is Invalid!';
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showSuccess(): any {
    this.toastrService.success('Your payment was successful!', 'Success');
  }

  showError(): any {
    this.toastrService.error('Your paymentError when making payment', 'Error');
  }

  generateYears(): any {
    for (let year = this.currentYear; year < this.currentYear + 20; year++) {
      this.listOfYears.push(year);
    }
  }
}
