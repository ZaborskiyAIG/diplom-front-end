import {Component, ElementRef, Inject, Renderer2, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Demands} from '../../../models/Demands';
import {DashboardHttp} from '../../../services/dashboard.http';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  colors = ['Aqua', 'Yellow', 'Grey', 'Red', 'Orange', 'Lemon', 'Violet', 'Green', 'Azure'];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Demands,
    private renderer: Renderer2, private elementRef: ElementRef,
    private http: DashboardHttp
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteDemand(id: number): void {
    // let ind;
    // let activityIndex;
    // this.http.deleteDemand(id).subscribe(res => {
    //   console.log(res);
    // });
    this.data.name = '00';
    this.dialogRef.close(this.data);

    // this.board.activity.demands.forEach((demand, i, arr) => {
    //   if (demand.id === id) {
    //           ind = i;
    //   }
    // });
    // this.board.activity.demands.splice(ind, 1);


    // this.ds.activities.forEach((value, index, array) => {
    //   value.demands.forEach((demand, i, arr) => {
    //     if (demand.id === id) {
    //       ind = i;
    //       activityIndex = index;
    //     }
    //   });
    // });
    // this.ds.activities[activityIndex].demands.splice(ind, 1);
  }
}
