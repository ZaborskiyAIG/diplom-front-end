import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserHttp} from '../../services/user.http';
import {User} from '../../models/User';
import {UserDialogComponent} from './dialog-demands/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-admin-panel]',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'email', 'full_name', 'role', 'update', 'project', 'delete'];
  dataSource: MatTableDataSource<User>;
  table: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: UserHttp, public dialog: MatDialog) {
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.http.getUsers().subscribe(res => {
      this.table = res;
      this.dataSource = new MatTableDataSource(this.table);
      console.log(res);
      console.log(this.table);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id: number): void {

  }

  openDialogDemand(id: number): void {
    let user: User;
    this.table.forEach((value, i) => {
      if (value.id === id) {
        user = value;
      }
    });
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        console.log('result = nulll');
      } else {
        console.log(result);
        //   this.addCriteria(result, id);  //TODO создание нового пользователя

      }
    });
  }

}
