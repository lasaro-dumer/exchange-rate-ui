import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExchangeRatesService } from '../api/exchange-rates.service';
import { CurrencyExchangeTransactionModel } from '../interfaces/quote.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {
  public showProgressSpinner: boolean;
  public transactions: CurrencyExchangeTransactionModel[] = [];
  public transactionsDataSource: MatTableDataSource<CurrencyExchangeTransactionModel>;
  columnsToDisplay: string[];

  constructor(private exchgRateApi: ExchangeRatesService,
              public router: Router) {
    this.showProgressSpinner = true;
    this.columnsToDisplay = ['id', 'userId', 'localCurrencyAmount', 'foreignCurrencyCode', 'foreignCurrencyAmount', 'transactionDate'];
    this.transactionsDataSource = new MatTableDataSource(this.transactions);
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.exchgRateApi.getTransactions()
      .subscribe((data: Array<CurrencyExchangeTransactionModel>) => {
        console.log('received: ', data);
        this.transactions = data;
        this.transactionsDataSource = new MatTableDataSource(this.transactions);
        this.showProgressSpinner = false;
      });
  }

}
