import {Component, OnInit} from '@angular/core';
import {RestService} from '../services/rest/rest.service';
import {GameService} from '../services/session/game.service';
import {IPlayer} from '../interface/IPlayer';
import {ActivatedRoute} from '@angular/router';
import {IResult} from '../interface/IResult';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute) {
  }

  message: string;
  state: IPlayer[];
  gameId: string;
  choiseConfirmed = false;
  showComponent = 'WAITING_FOR_PLAYER';
  result: IResult;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params.id;
    });
    this.showWaiting();
    this.refresh();
  }


  refresh(): void {
    this.gameService.refresh(this.gameId).subscribe((resp: IPlayer[]) => {
      console.log(resp);
      this.state = resp;
      if (this.state[0].playerStatus === 'READY' && this.state[1].playerStatus === 'READY'){
        this.showResult();
      }
      if (this.choiseConfirmed) {
        this.showWaiting();
      }
      else if (this.state[0].name !== null && this.state[1]?.name !== undefined) {
        this.message = this.state[0].name + ' vs ' + this.state[1].name;
        this.showComponent = 'MOVE_SELECT';
      }
    });
  }

  showResult(): void{
    this.gameService.getWinner(this.gameId).subscribe((response) => {
      this.message = 'RESULT';
      this.showComponent = 'RESULT';
      this.result = response;
    });
  }
  showWaiting(): void{
    this.showComponent = 'WAITING_FOR_PLAYER';
    this.message = 'Waiting for opponent...';
  }

  confirm(choice: string): void {
    this.gameService.makeMove(this.gameId, choice);
    this.choiseConfirmed = true;
    this.showComponent = 'WAITING_FOR_PLAYER';
    this.refresh();
  }
}
