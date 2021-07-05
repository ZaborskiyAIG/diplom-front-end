import { Component, OnInit, Input, ViewEncapsulation, HostListener, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Demands} from '../../models/Demands';
import {Activity} from '../../models/Activity';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {DashboardHttp} from '../../services/dashboard.http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardDndListComponent implements OnInit {
  @Input() activity: Activity;
  @ViewChild('contentWrapper') contentWrapper: ElementRef;
  @ViewChild('counter') counter: ElementRef;
  allowEdit: boolean;
  private isSelected: boolean;
  private editable: boolean;
  private predId: number;

  constructor(private dashboardC: DashboardComponent, private http: DashboardHttp) {
    this.allowEdit = false;
    this.isSelected = false;
    this.editable = true;
  }

  ngOnInit(): void {}

  async drop(event: CdkDragDrop<Demands[]>, id: number): Promise<void> {
    console.log('sss:' + id);
    console.log(event.currentIndex);

    const demand = event.previousContainer.data[event.previousIndex];
    const predRank = event.previousIndex;

    event.previousContainer.data[event.previousIndex].rank = event.currentIndex;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log(this.activity.id);
    await this.http.putRankAndActivityDemand(demand, id, predRank).toPromise();
    console.log('ss1');
    this.dashboardC.ngOnInit();
    console.log('ss2');

  }

  deleteActivity(): void {
    let i;
    let count = 1;
    this.dashboardC.activities.forEach((value, index, array) => {
      if (value.id === this.activity.mainId) {
        console.log('прокнуло');
        i = index;
      }

      if (value.mainId === this.activity.mainId) {
        console.log('прокнуло');
        count++;
      }
    });
    this.dashboardC.activities.splice(i, count);
    this.http.deleteActivity(this.activity.mainId).subscribe(data => {
      console.log(data);
    });
    console.log('пользовать ' + this.activity.id + ' был удален'); // метод для удаления активити, пока заглушка
  }


  @HostListener('window:keydown', ['$event'])
  onWindowKeydown($event): void {
    // if component is selected...
    if ( this.isSelected ) {
      console.log('12');
      // and is editable...
      if ( this.editable ) {
        console.log('13');
        // and edit is  allowed...
        if ( !this.allowEdit ) {
          console.log('14');
          this.allowEdit = true;
        }
      }
    }
  }

  onDblClick($event): void {
    this.isSelected = true;
    if ( this.editable ) {
      this.allowEdit = true;
    }
  }

  onBlur($event): void {
    console.log(this.counter.nativeElement.innerHTML); // ПОЛУЧАЕТ РЕЗУЛЬТАТ
    this.activity.name = this.counter.nativeElement.innerHTML;
    this.http.putActivity(this.activity).subscribe(res => {
      console.log(res);
    });
    this.isSelected = false;
    if ( this.editable ) {
      this.allowEdit = false;
    }
  }

  // tslint:disable-next-line:ban-types
  styleObject(): Object {
    if ( this.isSelected ) {
      return {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '2px'
      };
    }
    return {
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: '2px'
    };
  }

  check(activity: Activity): number {
    if (activity.name != null) {
      return 3;
    } else {
      if (activity.demands.length === 0) {
        return 1;
      } else {
        return 2;
      }
    }
    // return activity.name == null;
  }
}
