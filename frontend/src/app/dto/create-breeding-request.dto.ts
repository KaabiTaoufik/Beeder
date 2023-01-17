import {User} from "../models/user";
import {RequestStateEnum} from "../Enums/RequestStateEnum";
import {Animal} from "../models/animal";

export class CreateBreedingRequestDto  {
    from : User | null = null;
    to :Animal| null= null;
    state : RequestStateEnum| null= null;
  constructor(from:User,to:Animal) {
    this.from=from;
    this.to=to;
    this.state= RequestStateEnum.UKNOWN;
  }
}
