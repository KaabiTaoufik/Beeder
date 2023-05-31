import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APINames} from "../constants/api-names";
import {Animal} from "../models/animal";
import {Observable} from "rxjs";
import {Request} from "../models/request";
import {CreateBreedingRequestDto} from "../dto/create-breeding-request.dto";
import {RequestStateEnum} from "../Enums/RequestStateEnum";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http : HttpClient) { }

  getBreedingRequests(state:RequestStateEnum) : Observable<Request[]>{
    const url = `${environment.API_URL}/breeding-request`;
    return this.http.get<Request[]>(url,{params: { state }} );
  }

  addBreedingRequests(request:CreateBreedingRequestDto){
    const url = `${environment.API_URL}/breeding-request`;
    return this.http.post<Request>(url , request);
  }

  alterBreedingRequestState(request:Request){
    const url = `${environment.API_URL}/breeding-request`;
    return this.http.put<Request>(url , request);
  }
}
