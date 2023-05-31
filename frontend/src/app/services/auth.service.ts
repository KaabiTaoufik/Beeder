import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LOGIN_URL, SIGNUP_URL} from "../helpers/constants";
import {LoginUserDto} from "../dto/loginUserDto";
import {LoginResponseDto} from "../dto/loginResponseDto";
import {AddUserDto} from "../dto/addUserDto";
import {User} from "../models/user";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(loginUserDto: LoginUserDto) {
    return this.http.post<LoginResponseDto>(environment.API_URL + LOGIN_URL, loginUserDto);
  }

  signup(addUserDto: AddUserDto) {
    return this.http.post<User>(environment.API_URL + SIGNUP_URL, {...addUserDto});
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User  {
    let userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage != null) {
      return JSON.parse(userFromLocalStorage) as User;
    }
    throw Error('user not found');
  }
}
