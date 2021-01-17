import {Component, OnInit} from '@angular/core';
import {RestService} from '../services/rest/rest.service';
import {GameService} from '../services/session/game.service';
import {IPlayer} from '../interface/IPlayer';
import {ActivatedRoute} from '@angular/router';

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

  choice = '';
  message = 'Waiting for opponent to join...';
  state: IPlayer[];
  gameId: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params.id;
    });
    this.refresh();
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
    this.gameService.makeMove(this.gameId, this.choice);
    this.refresh();
  }

  refresh(): void {
    this.gameService.refresh(this.gameId).subscribe((resp: IPlayer[]) => {
      console.log(resp);
      this.state = resp;
      if (this.state[0].name !== null && this.state[1]?.name) {
        this.message = this.state[0].name + ' vs ' + this.state[1].name;
      }
    });
  }

}
