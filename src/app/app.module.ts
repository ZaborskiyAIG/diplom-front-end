import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {TableRankComponent} from './components/table-rank/table-rank.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {CardsDemandsComponent} from './components/cards-demands/cards-demands.component';
import {HttpClientModule} from '@angular/common/http';
import {BoardDndListComponent} from './components/board-dnd-list/board-dnd-list.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppMaterialModule } from './app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {AppRoutingModule } from './app-routing.module';
import {RegisterComponent} from './components/register/register.component';
import {AlertService} from './services/alert.service';

import {Activity} from './models/Activity';
import {ListCriteria} from './models/ListCriteria';
import {DashboardHttp} from './services/dashboard.http';
import {PatternHttp} from './services/pattern.http';
import {UserHttp} from './services/user.http';
import {FormulaHttp} from './services/formula.http';
import {DialogComponent} from './components/dashboard/dialog-demands/dialog.component';
import {DialogActivityComponent} from './components/dashboard/dialog-activity/dialog.component';
import {PatternComponent} from './components/pattern/pattern.component';
import {DialogCriteriaComponent} from './components/pattern/dialog-criteria/dialog.component';
import {Parser} from './services/util/Parser';
import {ProjectComponent} from './components/project/project.component';
import {ProjectHttp} from './services/project.service';
import {DialogProjectComponent} from './components/project/dialog-project/dialog.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {UserDialogComponent} from './components/admin-panel/dialog-demands/dialog.component';

@NgModule({
  imports: [
    DragDropModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    BrowserModule, FormsModule, AppMaterialModule, AppRoutingModule, FlexLayoutModule, HttpClientModule],
  declarations: [ AppComponent, AdminPanelComponent, NavbarComponent, DashboardComponent, CardsDemandsComponent,
    LoginComponent, RegisterComponent,
    BoardDndListComponent, ProjectComponent, DialogCriteriaComponent, UserDialogComponent, DialogComponent, DialogActivityComponent,
    PatternComponent, TableRankComponent, DialogProjectComponent],
  providers: [Activity, ListCriteria, DashboardHttp, Parser, PatternHttp, UserHttp, FormulaHttp,
    ProjectHttp, DashboardComponent, AlertService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
