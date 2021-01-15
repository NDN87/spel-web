import {Component, OnInit} from '@angular/core';
import {RestService} from './rest/rest.service';
import {IPlayer} from './interface/IPlayer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'spel-web';
  constructor(
    private restService: RestService) { }

  ngOnInit(): void{
    const player: IPlayer = {
      name: 'daniel'
    };
     this.restService.createGame(player).subscribe((resp: any) => {
       console.log(resp);
    });

  }
}
