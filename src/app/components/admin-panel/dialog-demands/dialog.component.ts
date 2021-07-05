import {Component, ElementRef, Inject, Renderer2, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {User} from '../../../models/User';
import {DashboardHttp} from '../../../services/dashboard.http';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class UserDialogComponent {
  roles = ['ADMIN', 'MANAGER', 'DEVELOPER', 'USER'];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private renderer: Renderer2, private elementRef: ElementRef,
    private http: DashboardHttp
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteDemand(id: number): void {
    this.dialogRef.close(this.data);
  }
}
