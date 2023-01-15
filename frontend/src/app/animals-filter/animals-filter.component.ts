import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AnimalType } from '../Enums/animalTypeEnum';
import { Gender } from '../Enums/genderEnum';

@Component({
  selector: 'app-animals-filter',
  templateUrl: './animals-filter.component.html',
  styleUrls: ['./animals-filter.component.css']
})
export class AnimalsFilterComponent implements OnInit {

  constructor() { }
  genderList: Array<string> = Object.keys(Gender).filter(key => isNaN(+key));
  animalsList: Array<string> = Object.keys(AnimalType).filter(key => isNaN(+key));
  selectedGender: Gender | undefined;
  selectedAnimalType: AnimalType | undefined;
  ngOnInit(): void {
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
  }
  
  getAnimalsByFilter(){
    const filter = {
      "gender": this.selectedGender,
      "type": this.selectedAnimalType
    }
  }
}
