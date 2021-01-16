import {Component, OnInit} from '@angular/core';
import {RestService} from '../services/rest/rest.service';
import {GameService} from '../services/session/game.service';
import {IPlayer} from '../interface/IPlayer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private gameService: GameService) {
  }

  choice = '';
  message = 'Waiting for opponent to join...';

  ngOnInit(): void {
  }

  select(choice: string): void {
    if (this.choice === choice) {
      this.choice = '';
      return;
    }
    this.choice = choice;
    this.refresh();
  }

  confirm(): void {
    this.gameService.makeMove(this.choice);
  }

  refresh(): void {
    this.gameService.refresh().subscribe((resp: IPlayer[]) => {
      console.log(resp);
      if (resp[1] !== null){
        this.message = `${resp[1].name} has joined the game.`;
      }
    });
  }

}
