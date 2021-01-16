import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {IPlayer} from '../../interface/IPlayer';
import {IGameId} from '../../interface/IGameId';
import {RestService} from '../rest/rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private router: Router,
    private restService: RestService) { }
  player: IPlayer;
  opponent: IPlayer;
  gameId: string;
  setGameId(id: string): void{
    this.gameId = id;
  }
  getGameId(): string {
    return this.gameId;
  }

  join(n: string, id: string): void {
    this.player = {
      name: n
    };
    this.router.navigateByUrl(`game/${id}`);
    this.restService.joinGame(id, this.player).subscribe(() => {
      this.gameId = id;
      this.router.navigateByUrl(`game/${id}`);
    });
  }

  create(n: string): void{
    this.player = {
      name: n
    };
    this.restService.createGame(this.player).subscribe((resp: IGameId) => {
      this.gameId = resp.id;
      this.router.navigateByUrl(`game/${resp.id}`);
    });
  }

  makeMove(choice: string): void {
    this.player.move = choice;
    this.restService.makeMove(this.gameId, this.player).subscribe(() => {
      console.log('Made move.');
    });
  }

  refresh(): Observable<IPlayer[]> {
    return this.restService.getGameStatus(this.gameId);
  }
}
