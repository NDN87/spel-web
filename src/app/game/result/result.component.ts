import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from '../../interface/IPlayer';
import {IResult} from '../../interface/IResult';
import {GameService} from '../../services/session/game.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input()
  players: IPlayer[];
  @Input()
  result: IResult;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  moveToIcon(choice: string): string {
    switch (choice){
      case 'ROCK':
        return 'fa fa-hand-rock-o fa-3x';
      case 'PAPER':
        return 'fa fa-hand-paper-o fa-3x';
      case 'SCISSORS':
        return 'fa fa-hand-scissors-o fa-3x';
    }
  }

  return(): void{
    this.gameService.return();
  }
}
