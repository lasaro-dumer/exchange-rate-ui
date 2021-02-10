import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompletionObserver, Observable } from 'rxjs';
import { ExchangeRatesService } from '../api/exchange-rates.service';
import { IQuote, IRefreshResultModel } from '../interfaces/quote.model';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.sass']
})

export class QuoteComponent implements OnInit {
  public showProgressSpinner: boolean;
  public quotes: IQuote[] = [];
  public quotesDataSource: MatTableDataSource<IQuote>;
  columnsToDisplay: string[];

  constructor(private exchgRateApi: ExchangeRatesService,
              public router: Router) {
    this.showProgressSpinner = true;
    this.columnsToDisplay = ['CurrencyCode', 'EffectiveDate', 'BuyValue'];
    this.quotesDataSource = new MatTableDataSource(this.quotes);
  }

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes() {
    this.exchgRateApi.getLatestQuotes(new Date(Date.now()))
      .subscribe((data: Array<IQuote>) => {
        console.log('received: ', data);
        this.quotes = data;
        this.quotesDataSource = new MatTableDataSource(this.quotes);
        this.showProgressSpinner = false;
      });
  }

  refreshQuotes() {
    this.showProgressSpinner = true;

    this.exchgRateApi.postRefreshQuotes()
      .subscribe((x: IRefreshResultModel) => {
        this.loadQuotes();
        this.showProgressSpinner = false;
      });
  }
}
