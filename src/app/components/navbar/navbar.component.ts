import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public href = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.href);
  }

  flag(): void {
    this.href = false;
  }

}
