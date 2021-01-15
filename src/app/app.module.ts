import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LobbyComponent } from './lobby/lobby.component';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
