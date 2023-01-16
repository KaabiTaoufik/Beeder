import {User} from "../models/user";

export class LoginResponseDto {
  user : User = new User();
  token : string ='';
}
