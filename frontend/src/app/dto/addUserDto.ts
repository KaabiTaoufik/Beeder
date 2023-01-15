import {User} from "../models/user";

export class AddUserDto {
  user : User = new User();
  confirmPassword : string = '';
}
