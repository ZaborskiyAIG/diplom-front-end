import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AppMaterialModule } from './app-material.module';
import {AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [BrowserModule, FormsModule, AppMaterialModule, AppRoutingModule],
  declarations: [ AppComponent, NavbarComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
