import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() {
  }

  choice = '';

  ngOnInit(): void {
  }

  public select(choice: string): void {
    if (this.choice === choice) {
      this.choice = '';
      return;
    }
    this.choice = choice;
  }

}
