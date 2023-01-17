import {Animal} from "../../animal/entities/animal.entity";
import {User} from "../../user/entities/user.entity";
import {RequestStateEnum} from "../../util/enums/requestState.enum";

export class CreateBreedingRequestDto{

    from : User;
    to :Animal;
    state : RequestStateEnum;
}
