import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {GameService} from '../../services/session/game.service';

@Component({
  selector: 'app-move-selection',
  templateUrl: './move-selection.component.html',
  styleUrls: ['./move-selection.component.css']
})
export class MoveSelectionComponent implements OnInit {
  @Output()
  confirmedChoice =  new EventEmitter<string>();
  selectedChoice: string;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }


  select(choice: string): void {
    if (this.selectedChoice === choice) {
      this.selectedChoice = '';
      return;
    }
    this.selectedChoice = choice;
  }

  confirm(): void {
    this.confirmedChoice.emit(this.selectedChoice);
  }
}
