import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { Demands} from '../../models/Demands';
import {DialogComponent} from '../dashboard/dialog-demands/dialog.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {MatDialog} from '@angular/material/dialog';
import {DashboardHttp} from '../../services/dashboard.http';

@Component({
  selector: 'app-cards-demands',
  templateUrl: './cards-demands.component.html',
  styleUrls: ['./cards-demands.component.scss']
})
export class CardsDemandsComponent implements OnInit {
  @Input() demands: Demands;
  oldDemands: Demands;
  // colors = ['Aqua', 'Yellow', 'Grey'];
  //
  // changeColor(e): void {
  //   // const box = this.elementRef.nativeElement.querySelector('.issue');
  //   // this.renderer.setStyle(box, 'background-color', e.target.value);
  // }

  // constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  constructor(public dialog: MatDialog, private ds: DashboardComponent, private http: DashboardHttp) { }

  ngOnInit(): void {
  }

  openDialogDemand(): void {
    const demand = new Demands();
    demand.id = this.demands.id;
    demand.name = this.demands.name;
    demand.description = this.demands.description;
    demand.color = this.demands.color;

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: this.demands
    });

    dialogRef.afterClosed().subscribe(result => {
      let ind;
      let activityIndex;


      if (result == null) {
        this.demands = demand;
        console.log('result = nul1');
      } else {
        console.log(result.id);
        console.log(result.name);
        console.log(result);
        if (result.name === '00') {
          console.log('result != nul2');
          this.http.deleteDemand(result.id).subscribe(res => {
            console.log(res);
          });

          this.ds.activities.forEach((value, index, array) => {
            value.demands.forEach((deman, i, arr) => {
              if (deman.id === result.id) {
                ind = i;
                activityIndex = index;
              }
            });
          });
          this.ds.activities[activityIndex].demands.splice(ind, 1);


        } else {
          console.log('result != nul3');
          this.http.putDemand(result).subscribe(res => {
            console.log(res);
          });
        }
      }
    });
  }
}
