import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {GameService} from '../services/session/game.service';
import {IGameId} from '../interface/IGameId';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private gameService: GameService,
              private router: Router) { }
  lobbyForm = this.formBuilder.group({
    id: '',
    name: ''
  });
  invalidGameId = undefined;
  error = '';
  ngOnInit(): void {
  }

  join(): void {
    this.gameService.join(this.lobbyForm.get('id').value, this.lobbyForm.get('name').value).subscribe(() => {
      this.router.navigate(['game/', this.lobbyForm.get('id').value]);
    },
    (err) => {this.error = 'Server error'; });
  }

  create(): void{
    this.gameService.create(this.lobbyForm.get('name').value).subscribe((resp: IGameId) => {
      this.router.navigate(['game', resp.id]);
    },
    (err) => {this.error = 'Server error'; });
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
