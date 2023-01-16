import { AnimalsService } from './../services/animals.service';
import { Animal } from './../models/animal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gender } from '../Enums/genderEnum';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css'],
})
export class AnimalDetailsComponent implements OnInit {
  images: Array<object>;
  imageSize = {
    width: '100%',
    height: '500px',
  };
  animal: Animal;

  constructor(
    private animalsService: AnimalsService,
    private route: ActivatedRoute
  ) {
    this.images = [
      {
        image: 'assets/blank_image.jpg',
        thumbImage: 'assets/blank_image.jpg',
        alt: 'goat',
      },
    ];
    this.animal = new Animal();

    route.params.subscribe((params) => {
      const id: string = params['id'];
      this.loadAnimal(id);
    });
  }

  loadAnimal(id: string) {
    this.animalsService.getAnimalWithImages(id).subscribe((animal) => {
      this.animal = animal;
      this.setAnimalImagesToDisplay(this.animal);
    });
  }

  setAnimalImagesToDisplay(animal: Animal): void {
    if (
      animal.images.length > 0 &&
      animal.images.every((image) => typeof image === 'string')
    ) {
      this.images = animal.images.map((image) => ({
        image: image,
        thumbImage: image,
        alt: 'animal image',
      }));
    } else {
      this.images = [
        {
          image: 'assets/blank_image.jpg',
          thumbImage: 'assets/blank_image.jpg',
          alt: 'animal image',
        },
      ];
    }
  }

  getGenderStr(gender: Gender | null): string {
    if (gender == null) {
      return '---';
    } else if (gender === Gender.Male) {
      return 'Male';
    } else {
      return 'Female';
    }
  }

  ngOnInit(): void {}
}
