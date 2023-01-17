import { RouteNames } from './../Route-Names.model';
import { AnimalsService } from './../services/animals.service';
import { Animal } from './../models/animal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from '../Enums/genderEnum';
import { HttpErrorResponse } from '@angular/common/http';

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
    private route: ActivatedRoute,
    private router: Router
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
    this.animalsService.getAnimalWithImages(id).subscribe(
      (animal) => {
        this.animal = animal;
        this.setAnimalImagesToDisplay(this.animal);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 0) {
          console.log('An error occured: ', errorResponse.error);
        } else {
          console.log('Backend responded with an error: ', errorResponse.error);
          this.router.navigate([RouteNames.HOME]);
        }
      }
    );
  }

  setAnimalImagesToDisplay(animal: Animal): void {
    this.images = this.animalsService.getAnimalImagesToDisplay(animal);
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
