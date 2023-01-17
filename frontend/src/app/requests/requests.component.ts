import { Component, OnInit } from '@angular/core';
import {RequestsService} from "../services/requests.service";
import {Request} from "../models/request";
import {Animal} from "../models/animal";
import {AnimalsService} from "../services/animals.service";
import {RequestStateEnum} from "../Enums/RequestStateEnum";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  incomingRequests: Request[] = [];
  myAnimals :Animal[]=[];
  requestsByAnimal : any ;
  myRequests = [];
  user :any;
  userId: string ='';
  constructor(private requestsService : RequestsService,
              private animalsService : AnimalsService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')|| '{}');
    this.userId = this.user.id;
    console.log(localStorage.getItem('user'));
    this.animalsService.getAnimals(this.userId,true,true).subscribe(x=>{
      this.myAnimals = x;

    });

    this.requestsService.getBreedingRequests(RequestStateEnum.UKNOWN).subscribe((requests)=>{
      this.incomingRequests = requests;
      this.getRequestsByAnimal();
      console.log(this.requestsByAnimal)

    })
  }

  getRequestsByAnimal(){
    const groupByAnimal = <T, K extends keyof any>(arr: T[], key: (i: T ) => K) =>
      arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
      }, {} as Record<K, T[]>);

    this.requestsByAnimal = groupByAnimal(this.incomingRequests , i =>  (i.to?.id ? i.to.id : '') );
  }

  shouldShowRequest(request:Request){
    return request.state == RequestStateEnum.UKNOWN
  }
  approve(request:Request){
    request.state = RequestStateEnum.APPROVED;
    this.requestsService.alterBreedingRequestState(request).subscribe(x=>{
      this.incomingRequests= this.incomingRequests.filter(x => x != request);
      this.getRequestsByAnimal();
      console.log(this.incomingRequests);
    });
  }

  decline(request:Request){
    request.state = RequestStateEnum.REJECTED;
    this.requestsService.alterBreedingRequestState(request).subscribe(x=>console.log(x));
  }

}
