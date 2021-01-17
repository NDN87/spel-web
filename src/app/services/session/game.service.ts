import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    private restService: RestService) {
  }

  player: IPlayer;

  join(gameId: string, n: string): void {
    this.player = {
      name: n
    };
    this.router.navigateByUrl(`game/${gameId}`);
    this.restService.joinGame(gameId, this.player).subscribe(() => {
      this.router.navigate(['game/', gameId]);
    });
  }

  create(n: string): void {
    this.player = {
      name: n
    };
    this.restService.createGame(this.player).subscribe((resp: IGameId) => {
      this.router.navigate(['game', resp.id]);
    });
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
}
