import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeModel } from '../interfaces/quote.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.sass']
})
export class PurchaseComponent implements OnInit {
  
  model = new CurrencyExchangeModel();

  constructor() {
    //this.currencyExchange={ };
  }

  ngOnInit(): void {
  }

}
