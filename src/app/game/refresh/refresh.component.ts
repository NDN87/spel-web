import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit {
  @Output()
  refresh =  new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}
