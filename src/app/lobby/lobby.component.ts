import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {GameService} from '../services/session/game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private gameService: GameService) { }
  lobbyForm = this.formBuilder.group({
    id: '',
    name: ''
  });
  invalidGameId = undefined;
  ngOnInit(): void {
  }

  join(): void {
    this.gameService.join(this.lobbyForm.get('id').value, this.lobbyForm.get('name').value);
  }

  create(): void{
    this.gameService.create(this.lobbyForm.get('name').value);
  }

  checkGameId(): void{
    if (this.lobbyForm.get('id').value === ''){
      this.invalidGameId = undefined;
      return;
    }
    const regexForUUID = new RegExp('\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b');
    this.invalidGameId = !regexForUUID.test(this.lobbyForm.get('id').value);
  }

}
