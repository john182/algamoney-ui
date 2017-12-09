import { Router } from '@angular/router';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private auth:AuthService,private logoutService:LogoutService,private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.logoutService.logout().then(()=>{this.router.navigate(['/login'])});
  }

}
