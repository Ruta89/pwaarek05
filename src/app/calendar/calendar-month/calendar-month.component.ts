import { Component, OnInit } from '@angular/core';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { CalendarEvent } from 'calendar-utils';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { Item } from 'src/app/wagi/waga-lista/waga-lista.component';

export interface ICalendarEvent {
  id?: any;
  start: any;
  end?: any;
  title: string;
  color?: any;
  actions?: any;
  allDay?: any;
  resizable?: any;
  // id?: string | number;
  // start: Date;
  // end?: Date;
  // title: string;
  // color?: EventColor;
  // actions?: EventAction[];
  // allDay?: boolean;
  cssClass?: any;
  // resizable?: {
  //     beforeStart?: boolean;
  //     afterEnd?: boolean;
  // };
  draggable?: any;
  // meta?: MetaType;
  meta?: any;
}export interface ICalendarEvent2 {
  planowanyKoniec?: any;
  created?: any;
  id?: any;
  start: any;
  end?: any;
  title: string;
  color?: any;
  actions?: any;
  allDay?: any;
  resizable?: any;
  cssClass?: any;
  draggable?: any;
  meta?: any;
}
registerLocaleData(localePl);

let colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#1ea825',
    secondary: '#96ff9c'
  },
};

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.css']
})
export class CalendarMonthComponent implements OnInit {
  viewDate: Date = new Date();
  // events = [];
  locale: string;
  excludeDays: number[];
  wagaData;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      id: '1_id',
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,

      id: '2_id'
    },
    {
      title: '1989 idblueArek',
      start: new Date(1563956498032),
      end: new Date(1563966890208),
      color: colors.green,
      actions: this.actions,
      id: '3_id'
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
      id: '4_id'
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      id: '5_id'
    },
    {
      title: '2 1989 idblueArek',
      start: new Date(1563946498032),
      end: new Date(1563956890208),
      color: colors.green,
      actions: this.actions,
      id: '6_id',
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      allDay: true
    },
  ];

  refresh: Subject<any> = new Subject();
  activeDayIsOpen = true;
  dataSub;
  constructor(private service: FirestoreService
  ) {
    this.locale = 'pl-PL';
    this.excludeDays = [0, 6];

  }

  ngOnInit() {
    this.service.getCalendar().subscribe(data => {
      this.dataSub = data.map(item => {
        let eventsT = {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as ICalendarEvent)
        };
        let eventsTemp = [] as any;
        let endT = new Date(eventsT.end.seconds * 1000);
        let startT = new Date(eventsT.start.seconds * 1000);
        eventsTemp.push({ ...eventsT, start: startT, end: endT });
        this.events.push(...eventsTemp);
        this.refresh.next();
      });

    });

    this.service.getCalendar2().subscribe(data => {
      this.wagaData = data.map(item => {
        let wagaTemp = {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as ICalendarEvent2)
        };
        let wagaDataT = [] as any;
        let endT = new Date(wagaTemp.planowanyKoniec * 1000);
        let startT = new Date(wagaTemp.created * 1000);

        wagaDataT.push({
          ...wagaTemp, start: startT, end: endT, title: 'id tyutul', color: colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true,
          allDay: false
        });
        this.events.push(...wagaDataT);
        this.refresh.next();
      });
    });
    // console.log(' this.events3 ', this.events);
  }




  handleEvent(action: string, event: CalendarEvent): void {
    console.log('event id: ' + event.id);
    console.log('event title: ' + event.title);
    console.log('event start: ' + event.start.getTime());
    console.log('event end: ' + event.end.getTime());
    console.log('event allDay: ' + event.allDay);

    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    // console.log('action: ' + action);
    // console.log('event color primary: ' + event.color.primary);
    // console.log('event color secondary: ' + event.color.secondary);
    // console.log('event start: ' + event.start);
    // console.log('event getMilliseconds(): ' + event.start.getMilliseconds());
    // console.log('event valueOf(): ' + event.start.valueOf());
    // console.log('event meta: ' + event.meta);
    // console.log('event cssClass: ' + event.cssClass);
    // console.log('event actions toString: ' + event.actions.toString());
    // console.log('event actions event.actions.values(label): ' + event.actions.values(label));
    // console.log('event actions toString: ', event.actions.toString());
    // console.log('event --------: ');
    // console.log('event values: ' + event.actions.values());
    // console.log('event draggable: ' + event.draggable);
    // console.log('event resizable beforeStart: ' + event.resizable.beforeStart);
    // console.log('event resizable afterEnd: ' + event.resizable.afterEnd);
    // let im = event.actions.map(a => {
    //   console.log('id: ' + a.id);
    //   console.log('label: ' + a.label);
    //   console.log('cssClass: ' + a.cssClass);
    //   console.log('onClick({event}): ' + a.onClick({ event }));
    //   return a;
    // });
    // console.log('event actions map im: ' + im);
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    console.log('Dropped or resized', event);
    this.refresh.next();
  }




  addEvent(): void {
    this.events.push({
      title: 'Dodaj wydarzenie',
      start: startOfDay(1563568422526),
      end: endOfDay(1563568522526),
      color: colors.green,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  addCalendar(): void {
    let tempData = [];
    tempData.push(this.service.addCalendar());
    this.events.push(
      ...tempData
    );
    this.refresh.next();
  }

}
