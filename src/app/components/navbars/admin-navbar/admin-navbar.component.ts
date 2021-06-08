import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  @Output() showNotifs = new EventEmitter<boolean>();
  showNotifsFlag : boolean;

  constructor() {
    this.showNotifsFlag = false;
  }

  ngOnInit(): void {}


  ShowNotifsCompo() {
    this.showNotifsFlag = !this.showNotifsFlag;
    this.showNotifs.emit(this.showNotifsFlag);
  }
}
