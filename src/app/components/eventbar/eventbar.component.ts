import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventbar',
  templateUrl: './eventbar.component.html',
  styleUrls: ['./eventbar.component.css']
})
export class EventbarComponent implements OnInit {

  collapseShow = 'hidden';
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

}
