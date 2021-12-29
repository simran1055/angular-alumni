import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // serverUrl = `http://af70-180-188-251-166.ngrok.io/api`;
  serverUrl = `http://localhost:4000/api`;

  countryUrl: string =
    'https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json';

  imageUrl = 'http://localhost:4000/profile/';

  constructor(private http: HttpClient) {}

  getOptionFn() {
    return {
      headers: new HttpHeaders({
        Authorization: this.getToken(),
      }),
    };
  }

  // get token from local storage
  getToken() {
    let val = localStorage.getItem('access_token');
    if (val) {
      return 'Bearer ' + val;
    } else {
      return '';
    }
  }

  // get all get api without auth
  getApiFn(endPoint: any): Observable<Object> {
    return this.http
      .get<Object>(this.serverUrl + endPoint, this.getOptionFn())
      .pipe(catchError(this.handleError));
  }

  postApiFn(endPoint: any, payload: any): Observable<Object> {
    console.log(payload);

    return this.http
      .post<Object>(this.serverUrl + endPoint, payload, this.getOptionFn())
      .pipe(catchError(this.handleError));
  }

  letUserDetailFn() {
    return JSON.parse(localStorage.getItem('userData')!);
  }

  allCountries(): Observable<any> {
    return this.http.get(this.countryUrl);
  }

  handleError(error: any) {
    return throwError(error.error.error || 'Server Error');
  }
}
