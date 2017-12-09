import { Component } from '@angular/core';
import { ToastyService, ToastyConfig } from "ng2-toasty";

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private toastyConfig: ToastyConfig,private router: Router) {
    // Possible values: default, bootstrap, material
    this.toastyConfig.theme = 'bootstrap';

  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

}
