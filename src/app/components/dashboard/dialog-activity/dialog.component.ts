import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Activity} from '../../../models/Activity';
import {DashboardHttp} from 'src/app/services/dashboard.http';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogActivityComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activity,
    private http: DashboardHttp) {
  }

  onNoClick(activity: Activity): void {
    console.log(activity);
    // this.dashboard.postActivity(activity).subscribe(res => this.activities.push(res));
    // this.dialogRef.close();
  }

}
