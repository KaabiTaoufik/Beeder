import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Animal } from '../models/animal';
import { AnimalType } from '../Enums/animalTypeEnum';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { addAnimalDto } from '../dto/addAnimalDto';
import { AnimalsService } from '../services/animals.service';
import { Gender } from '../Enums/genderEnum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {
  animal: Animal = new Animal();
  submitted: boolean = true;
  imagePreviews: Array<string> = [];
  selectedFiles: File[] = [];
  requestInProgress: boolean = false;
  errorList: string[] = [];

  constructor(private authService: AuthService, private animalsService: AnimalsService, private router: Router) {
  }

  ngOnInit(): void {
  }

  getGenders(): Array<any> {
    const genderList: Array<any> = [{ name: 'Male', value: Gender.Male }, { name: 'Female', value: Gender.Female }];
    return genderList;
  }

  getSpecies(): Array<any> {
    return this.animalsService.getAllSpecies();
  }

  onAddFiles(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedFiles.push(event.target.files[i]);
        let file: File = event.target.files[i];
        var reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.imagePreviews.push(event?.target?.result as string);
        };
      }
    }
  }

  onRemoveImage(iamgeIndex: number) {
    this.imagePreviews = this.imagePreviews.splice(iamgeIndex, 1);
    this.selectedFiles = this.selectedFiles.splice(iamgeIndex, 1);
  }

  onImageClick(iamgeIndex: number) {
    let temp: any = this.imagePreviews[iamgeIndex];
    this.imagePreviews[iamgeIndex] = this.imagePreviews[0];
    this.imagePreviews[0] = temp;

    temp = this.selectedFiles[iamgeIndex];
    this.selectedFiles[iamgeIndex] = this.selectedFiles[0];
    this.selectedFiles[0] = temp;
  }

  onSubmit(f: NgForm) {
    if (!this.authService.isLoggedIn()) {
      throw console.error(
        'user not logged in'
      );
    }
    const addAnimalDto: addAnimalDto = {
      userId: this.authService.getToken(),
      animal: {
        type: f.value.specie !== "" ? f.value.specie : 'Dog',
        gender: f.value.gender !== "" ? f.value.gender : '1',
        age: f.value.age as number,
      },
      files: this.selectedFiles,
    }
    let reqObservable: Observable<Animal> = this.animalsService.addAnimal(addAnimalDto);
    this.requestInProgress = true;
    reqObservable.subscribe(
      (animal) => {
        this.router.navigate([`animals/${animal.id}`]);
      }
    );
  }
}
