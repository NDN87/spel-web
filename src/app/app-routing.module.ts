import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  { path: '', component: LobbyComponent },
  { path: 'game/:id', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
