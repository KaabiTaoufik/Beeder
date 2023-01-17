import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Constants } from 'src/app/constants/Constants';
import { AnimalType } from '../Enums/animalTypeEnum';
import { Gender } from '../Enums/genderEnum';
import { AnimalsService } from '../services/animals.service';
@Component({
  selector: 'app-animals-filter',
  templateUrl: './animals-filter.component.html',
  styleUrls: ['./animals-filter.component.css'],
})
export class AnimalsFilterComponent implements OnInit {
  constructor(private animalsService: AnimalsService) { }
  genderList: Array<string> = Object.keys(Gender).filter((key) => isNaN(+key));
  animalsList: Array<string> = Object.keys(AnimalType).filter((key) =>
    isNaN(+key)
  );
  selectedGender: Gender | undefined;
  selectedAnimalType: AnimalType | undefined;
  selectedBreed: string | undefined;
  @Output()
  changeFilterEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.getAnimalsByFilter();
  }

  selectGender(event: any): void {
    switch (event.value) {
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
    this.selectedAnimalType = event.value;
    this.getAnimalsByFilter();
  }

  getAnimalsByFilter() {
    let filter: any = {};

    if (this.selectedGender != undefined) {
      filter.gender = this.selectedGender.toString();
    }
    if (this.selectedAnimalType != undefined) {
      filter.type = this.selectedAnimalType;
    }
    if (this.selectedBreed != undefined) {
      filter.breed = this.selectedBreed.toString();
    }
    console.log(this.selectedAnimalType);
    this.changeFilterEvent.emit(filter);
  }
}
