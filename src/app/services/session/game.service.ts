import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IPlayer} from '../../interface/IPlayer';
import {IGameId} from '../../interface/IGameId';
import {RestService} from '../rest/rest.service';
import {Observable} from 'rxjs';
import {IResult} from '../../interface/IResult';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private restService: RestService,
    ) {
  }

  player: IPlayer;

  join(gameId: string, n: string): Observable<any> {
    this.player = {
      name: n
    };
    return this.restService.joinGame(gameId, this.player);
  }

  create(n: string): Observable<any> {
    this.player = {
      name: n
    };
    return this.restService.createGame(this.player);
  }

  makeMove(gameId: string, choice: string): void {
    this.player.move = choice;
    this.restService.makeMove(gameId, this.player).subscribe(() => {
      console.log('Made move.');
    });
  }

  refresh(gameId: string): Observable<IPlayer[]> {
    return this.restService.getGameStatus(gameId);
  }

  getWinner(gameId: string): Observable<IResult> {
    return this.restService.getResult(gameId);
  }
}
