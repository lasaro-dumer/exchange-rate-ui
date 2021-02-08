import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Quote } from '../interfaces/quote.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:5001';
  }

  getQuotes(date: Date): Observable<Quote[]> {
    const options = date ?
      {
        params: new HttpParams().set('date', date.toJSON())
      } : {};

    return this.http.get<Quote[]>(`${this.baseUrl}/quotes/all`, options)
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
