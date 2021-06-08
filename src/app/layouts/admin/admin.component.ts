import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  showNotifBarFlag : boolean;

  constructor() {
    this.showNotifBarFlag = false;
  }

  ngOnInit(): void {}

  showNotifBar($event: boolean) {
    this.showNotifBarFlag = $event;
  }
}
