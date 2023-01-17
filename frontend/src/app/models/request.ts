import { Animal} from "./animal";
import {User} from "./user";
import {RequestStateEnum} from "../Enums/RequestStateEnum";
export class Request {
  id: string | null = null;
  from: User | null = null;
  to: Animal | null = null;
  state: RequestStateEnum | null = RequestStateEnum.UKNOWN;

}
