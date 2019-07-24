import { Component, OnInit } from '@angular/core';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePl);

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.css']
})
export class CalendarMonthComponent implements OnInit {
  viewDate: Date = new Date();
  events = [];

  locale: string;
  excludeDays: number[];
  constructor(
  ) {
    this.locale = 'pl-PL';
    this.excludeDays = [0, 6];
  }

  ngOnInit() {
  }

}
