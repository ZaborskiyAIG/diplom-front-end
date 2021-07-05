import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './components/dashboard/dashboard.component';
import {TableRankComponent} from './components/table-rank/table-rank.component';
import {PatternComponent} from './components/pattern/pattern.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProjectComponent} from './components/project/project.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children: [
      {
        path: ':id', component: DashboardComponent
      }
    ] }, //TODO костыль
  { path: 'rank', component: TableRankComponent, children: [
      {
        path: ':id', component: TableRankComponent
      }
    ] },
  { path: 'pattern', component: PatternComponent, children: [
      {
        path: ':id', component: PatternComponent
      }
    ] },
  { path: 'project', component: ProjectComponent },
  { path: 'admin', component: AdminPanelComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
