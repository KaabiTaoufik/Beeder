import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { Router } from '@angular/router';
import { AnimalsService } from '../services/animals.service';
import { Gender } from '../Enums/genderEnum';

@Component({
  selector: 'app-animal-item',
  templateUrl: './animal-item.component.html',
  styleUrls: ['./animal-item.component.css']
})
export class AnimalItemComponent implements OnInit {
  @Input() animal: any = {};

  constructor(private router: Router, private animalsService: AnimalsService) { }
  getImages(animal: Animal): any[] {
    return this.animalsService.getAnimalImagesToDisplay(animal);
  } 

  getGenderName(gender: Gender) {
    if (gender == Gender.Male) {
      return "Male";
    } else {
      return "Female";
    }
  }
  ngOnInit(): void {
  }

}
