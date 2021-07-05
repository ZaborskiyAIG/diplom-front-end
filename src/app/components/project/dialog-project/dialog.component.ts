import {Component, ElementRef, Inject, Renderer2, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DashboardHttp} from '../../../services/dashboard.http';
import {ListCriteria} from '../../../models/ListCriteria';

@Component({
  selector: 'app-criteria-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogProjectComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListCriteria,
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
