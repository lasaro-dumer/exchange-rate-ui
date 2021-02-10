import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CurrencyExchangeModel, CurrencyExchangeTransactionModel, IQuote, IRefreshResultModel } from '../interfaces/quote.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    //this.baseUrl = 'https://localhost:5001';
    this.baseUrl = 'https://lasaro-exchange-rate-api.herokuapp.com';
  }

  getLatestQuotes(date: Date): Observable<IQuote[]> {
    const options = date ?
      {
        params: new HttpParams().set('date', date.toJSON())
      } : {};

    return this.http.get<IQuote[]>(`${this.baseUrl}/quotes/latest`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  postRefreshQuotes(): Observable<IRefreshResultModel> {
    return this.http.post<IRefreshResultModel>(`${this.baseUrl}/quotes/refresh`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  postSubmitPurchase(purchase: CurrencyExchangeModel): Observable<CurrencyExchangeTransactionModel> {
    return this.http.post<CurrencyExchangeTransactionModel>(`${this.baseUrl}/currency/exchange/transaction`, purchase, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
