import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  public quotesDataSource: MatTableDataSource<Quote>;
  columnsToDisplay: string[];

  constructor(private exchgRateApi: ExchangeRatesService) {
    this.showProgressSpinner = true;
    this.columnsToDisplay = ['CurrencyCode','EffectiveDate','BuyValue'];
    this.quotesDataSource = new MatTableDataSource(this.quotes);
  }

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes() {
    this.exchgRateApi.getQuotes(new Date(Date.now()))
      .subscribe((data: Array<Quote>) => {
        console.log('received: ', data);
        this.quotes = data;
        this.quotesDataSource = new MatTableDataSource(this.quotes);
        this.showProgressSpinner = false;
      });
  }

  refreshQuotes(){
    this.showProgressSpinner = true;
    console.log('refreshing');
    this.showProgressSpinner = false;
  }
}
