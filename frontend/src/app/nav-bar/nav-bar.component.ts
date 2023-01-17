import {Component, OnInit} from '@angular/core';
import {RouteNames} from '../Route-Names.model';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  HomeRoute: string = RouteNames.HOME;
  loginRoute: string = RouteNames.LOGIN;
  token: string | null | undefined;
  RequestsRoute: string = RouteNames.REQUESTS;
  AddAnimalRoute: string = RouteNames.ADD_ANIMAL;

  constructor(private router: Router , private authService : AuthService) {
  }

  ngOnInit(): void {
  }

  navigateToLogin() {
    this.router.navigate([this.loginRoute]);
  }


  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
