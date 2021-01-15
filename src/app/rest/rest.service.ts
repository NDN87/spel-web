import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IGameId} from '../interface/IGameId';
import {catchError} from 'rxjs/operators';
import {IPlayer} from '../interface/IPlayer';
const endpoint = 'http://localhost:8080/api/v1/';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  createGame(player: IPlayer): Observable<any> {

    return this.http.post<IGameId>(endpoint + 'games', player).pipe(
      catchError(this.handleError)
    );
  }

  hello(): Observable<string> {
    return this.http.get<any>(endpoint + 'games/hej').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}