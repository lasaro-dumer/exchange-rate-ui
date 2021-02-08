import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRatesService } from '../api/exchange-rates.service';
import { Quote } from '../interfaces/quote.model';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.sass']
})

export class QuoteComponent implements OnInit {
  public showProgressSpinner: boolean;
  public quotes: Quote[] = [];

  constructor(private exchgRateApi: ExchangeRatesService) {
    this.showProgressSpinner = true;
  }

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes() {
    this.exchgRateApi.getQuotes(new Date(Date.now()))
      .subscribe((data: Array<Quote>) => {
        console.log('received: ', data);
        this.quotes = data;
        this.showProgressSpinner = false;
      });
  }
}
