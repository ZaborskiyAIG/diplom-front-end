import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProjectHttp} from '../../services/project.service';
import {Project} from '../../models/Project';
import {DialogProjectComponent} from './dialog-project/dialog.component';
import {ListCriteria} from '../../models/ListCriteria';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'open', 'delete'];
  dataSource;
  table: Project[];
  private route: ActivatedRoute;
  returnUrl: string;

  constructor(private projectHttp: ProjectHttp, public dialog: MatDialog, private router: Router, private nav: NavbarComponent) { }

  ngOnInit(): void {
    this.nav.href = true;
  }

  ngAfterViewInit(): void {
    this.projectHttp.getPatterns().subscribe(res => {
      this.table = res;
      this.dataSource = this.table;
      console.log(res);
      console.log(this.table);
      console.log(this.dataSource);
    });
  }

  deleteProject(id: number): void {

  }

  openProject(id: number): void {
    this.router.navigate(['/dashboard/' + id]);
  }

  openDialogDemand(id: number): void {
    const dialogRef = this.dialog.open(DialogProjectComponent, {
      width: '500px',
      data: new ListCriteria()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        console.log('result = nulll');
      } else {
        console.log(result);
     //   this.addCriteria(result, id);  //TODO создание проект

      }
    });
  }

}


