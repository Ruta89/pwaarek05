import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  todo = [
    '5t, 2m,  777888/00/1 x3357 10tsz',
    '2t, 3m,  777888/00/4 x3357 80tsz',
    '20t, 8m, 777888/00/2 x3357  2tsz'
  ];

  done = [
    '6t, 3m,  777888/00/3 x3357 40tsz',
    '8t, 4m,  777888/00/5 x3357 20tsz'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
