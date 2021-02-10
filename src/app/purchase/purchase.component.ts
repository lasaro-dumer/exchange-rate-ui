import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ExchangeRatesService } from '../api/exchange-rates.service';
import { CurrencyExchangeModel, CurrencyExchangeTransactionModel } from '../interfaces/quote.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.sass']
})
export class PurchaseComponent implements OnInit {
  public currencyExchangeForm = this.newForm();
  public state: String;
  public latestTransaction = new CurrencyExchangeTransactionModel();
  error: any;

  constructor(private exchgRateApi: ExchangeRatesService,
              private formBuilder: FormBuilder,
              public router: Router) {
    this.state = 'ready';
    this.currencyExchangeForm = this.newForm();
    console.log('state', this.state);
  }

  ngOnInit(): void {
    this.currencyExchangeForm = this.newForm();
  }

  newForm() {
    return this.formBuilder.group({
      userId: [null, Validators.required],
      foreignCurrencyCode: [null, Validators.required],
      direction: [`0`, Validators.required],
      localCurrencyAmount: [null, Validators.required],
    });
  }

  submitForm() {
    this.state = 'processing';
    this.latestTransaction = new CurrencyExchangeTransactionModel();
    console.log('state', this.state);

    let model = new CurrencyExchangeModel(
      this.currencyExchangeForm.get("userId")?.value,
      this.currencyExchangeForm.get("foreignCurrencyCode")?.value,
      this.currencyExchangeForm.get("direction")?.value,
      this.currencyExchangeForm.get("localCurrencyAmount")?.value);

    //let data = JSON.stringify(this.currencyExchangeForm)
    console.log('data', this.currencyExchangeForm.get("userId"));

    this.exchgRateApi.postSubmitPurchase(model)
      .subscribe(
        (x: CurrencyExchangeTransactionModel) => {
          console.log('Purchased', x);
          this.latestTransaction = x;
          this.state = 'done';
          console.log('state', this.state);
          this.currencyExchangeForm = this.newForm();
        },
        (error: any) => {
          this.state = 'failed';
          this.error = error;
        });
  }
}
