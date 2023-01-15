import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddUserDto} from "../dto/addUserDto";
import {LoginUserDto} from "../dto/loginUserDto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rightPanelActive: boolean = false;
  addUserDto : AddUserDto = new AddUserDto()
  loginUserDto : LoginUserDto = new LoginUserDto()
  signupForm: FormGroup = new FormGroup({});
  loginForm : FormGroup = new FormGroup({})
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname : [this.addUserDto.user.fullname,[Validators.required]],
      email : [this.addUserDto.user.email,[Validators.email,Validators.required]],
      phoneNumber : [this.addUserDto.user.phoneNumber,[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      password : [this.addUserDto.user.password,[Validators.required,Validators.minLength(4)]],
      confirmPassword : [this.addUserDto.confirmPassword,[Validators.required]]
    })
    this.loginForm = this.fb.group({
      email : [this.loginUserDto.email,[Validators.email,Validators.required]],
      password : [this.loginUserDto.password,[Validators.required,Validators.minLength(4)]]
    })
  }

  toggleLeftPannel() {
    this.rightPanelActive = true;
  }

  toggleRightPannel() {
    this.rightPanelActive = false;
  }

  signupUser() {
    console.log(this.signupForm)
  }
  loginUser(){
    console.log(this.loginForm)
  }
  get fullname(){
    return this.signupForm.get('fullname');
  }
  get sigunupEmail(){
    return this.signupForm.get('email');
  }
  get signupPassword(){
    return this.signupForm.get('password');
  }
  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }
  get phoneNumber(){
    return this.signupForm.get('phoneNumber');
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
}
