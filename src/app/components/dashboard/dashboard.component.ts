import {Component, OnInit, Inject} from '@angular/core';
import {DashboardHttp} from 'src/app/services/dashboard.http';
import {Activity} from 'src/app/models/Activity';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogActivityComponent} from './dialog-activity/dialog.component';
import {DialogComponent} from './dialog-demands/dialog.component';
import {Demands} from '../../models/Demands';
import {ActivatedRoute} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activities: Activity[];

  constructor(private dashboard: DashboardHttp, public dialog: MatDialog, private route: ActivatedRoute, private nav: NavbarComponent) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.dashboard.getActivity().subscribe(data => {
      this.activities = data;
    });

    this.nav.href = true;
  }

  openDialogDemand(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: new Demands()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        console.log('result = nulll');
      } else {
        console.log(result);
        // const demand = new Demands();
        // demand.name = result.name;
        // demand.color = result.color;
        this.addDemand(result);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogActivityComponent, {
      width: '500px',
      data: new Activity()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        console.log('result = null');
      } else {
        this.addActivity(result);
      }
    });
  }

  addActivity(activity: Activity): void {
    console.log(activity);
    this.dashboard.postActivity(activity).subscribe(res => {
      this.activities = this.activities.concat(res);
    });
  }

  addDemand(demand: Demands): void {
    demand.rank = this.activities[0].demands.length;
    console.log(demand);
    this.dashboard.postDemand(demand, this.activities[0].id).subscribe(res => {
      this.activities[0].demands.push(res);
      console.log(res);
    });
  }
}


