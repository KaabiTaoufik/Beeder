import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Constants } from 'src/Constants';
import { AnimalType } from '../Enums/animalTypeEnum';
import { Gender } from '../Enums/genderEnum';

@Component({
  selector: 'app-animals-filter',
  templateUrl: './animals-filter.component.html',
  styleUrls: ['./animals-filter.component.css']
})
export class AnimalsFilterComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  genderList: Array<string> = Object.keys(Gender).filter(key => isNaN(+key));
  animalsList: Array<string> = Object.keys(AnimalType).filter(key => isNaN(+key));
  selectedGender: Gender | undefined;
  selectedAnimalType: AnimalType | undefined;
  selectedBreed: string | undefined;
  ngOnInit(): void {
    this.getAnimalsByFilter();
  }

  selectGender(event: any): void {
    switch(event.value)
    {
      case 0:
        this.selectedGender = Gender.Male;
        break;
      case 1:
        this.selectedGender = Gender.Female;
        break;
      default:
        this.selectedGender = undefined;
    }
    this.getAnimalsByFilter();
  }
  selectAnimal(event: any): void {
    switch(event.value)
    {
        case 0:
          this.selectedAnimalType = AnimalType.Dog;
          break;
        case 1:
          this.selectedAnimalType = AnimalType.Cat;
          break;
        case 2:
          this.selectedAnimalType = AnimalType.Goat;
          break;
        case 3:
          this.selectedAnimalType = AnimalType.Sheep;
          break;
      default:
        this.selectedAnimalType = undefined;
    }
    this.getAnimalsByFilter();
  }
  
  getAnimalsByFilter(){
    let params = new HttpParams();
    if(this.selectedGender != undefined)
    {
      params = params.set('gender', this.selectedGender.toString());
    }
    if(this.selectedAnimalType != undefined)
    {
      params = params.set('type', this.selectedAnimalType.toString());
    }
    if(this.selectedBreed != undefined)
    {
      params = params.set('breed', this.selectedBreed.toString());
    }
    const animalURL = Constants.API_URL + '/animal'
    this.httpClient.get(animalURL, { params})
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
