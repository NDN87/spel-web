import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {IPlayer} from '../interface/IPlayer';
import {RestService} from '../rest/rest.service';
import {IGameId} from '../interface/IGameId';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private restService: RestService) { }
  lobbyForm = this.formBuilder.group({
    id: '',
    name: ''
  });
  invalidGameId = undefined;
  ngOnInit(): void {
  }

  join(): void {
    this.router.navigateByUrl(`game/${this.lobbyForm.get('id').value}`);
  }

  checkGameId(): void{
    if (this.lobbyForm.get('id').value === ''){
      this.invalidGameId = undefined;
      return;
    }
    const regexForUUID = new RegExp('\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b');
    this.invalidGameId = !regexForUUID.test(this.lobbyForm.get('id').value);
  }

  create(): void{
    const player: IPlayer = {
      name: this.lobbyForm.get('name').value
    };
    this.restService.createGame(player).subscribe((resp: IGameId) => {
      this.router.navigateByUrl(`game/${resp.id}`);
    });
  }
}
