import { APINames } from './../constants/api-names';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';
import { addAnimalDto } from '../dto/addAnimalDto';
import {BASE_URL, MY_ANIMALS_URL} from '../helpers/constants';
import { FormRecord } from '@angular/forms';
import {Constants} from "../constants/Constants";
import { AuthService } from './auth.service';
import { AnimalType } from '../Enums/animalTypeEnum';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAnimals(userId:string,
                     shouldBringImages: boolean,
                     shouldEncodeImages: boolean): Observable<Animal[]> {
    const url = `${Constants.API_URL}/animals/`;
    return this.http.get<Animal[]>(url, {
      params: { userId ,shouldBringImages },
    });
  }

  getAnimal(
    id: string,
    shouldBringImages: boolean,
    shouldEncodeImages: boolean
  ): Observable<Animal> {
    const url = `${APINames.ANIMALS}/${id}`;
    return this.http.get<Animal>(url, {
      params: { shouldBringImages, shouldEncodeImages },
    });
  }

  getAnimalWithImages(id: string): Observable<Animal> {
    const shouldBringImages = true;
    const shouldEncodeImages = true;
    return this.getAnimal(id, shouldBringImages, shouldEncodeImages);
  }

  addAnimal(animalDto: addAnimalDto): Observable<Animal> {
    const files: File[] = animalDto.files;
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("fileToUpload[]", files[i]);
    }
    formData.append("age", animalDto.animal.age + '');
    formData.append("gender", animalDto.animal.gender + '');
    formData.append("type", animalDto.animal.type + '');
    formData.append("name", "suzie"); // ToDO: add name to dto and handel it in the backend

    const token = this.authService.getToken();
    if (token !== null) {
      return this.http.post<Animal>(`${BASE_URL}/animals/add`,
        formData,
        {
          responseType: 'json',
          headers: new HttpHeaders().append('Authorization', `Bearer ${token.substring(1, token.length - 1)}`)
        }
      );
    }
    return new Observable((sub) => {
      sub.error(new Error('token undefined'));
    });
  }

  getAllSpecies(): Array<any> {
    const SpeciesList: Array<any> = [
      { name: 'Dog', Id: AnimalType.Dog },
      { name: 'Cat', Id: AnimalType.Cat },
      { name: 'Goat', Id: AnimalType.Goat },
      { name: 'Sheep', Id: AnimalType.Sheep },
    ];
    return SpeciesList;
  }

  getAnimalImagesToDisplay(animal: Animal): any[] {
    if (
      animal.images.length > 0 &&
      animal.images.every((image) => typeof image === 'string')
    ) {
      return animal.images.map((image) => ({
        image: image,
        thumbImage: image,
        alt: 'animal image',
      }));
    } else {
      return [
        {
          image: 'assets/blank_image.jpg',
          thumbImage: 'assets/blank_image.jpg',
          alt: 'animal image',
        },
      ];
    }
  }
  getAnimalsByUser(ownerId : string){
    const  token = this.authService.getToken()
    const shouldEncodeImages = true;
    return this.http.get<Animal[]>(BASE_URL+MY_ANIMALS_URL,{
      params: {  shouldEncodeImages },
      responseType: 'json',
      headers: new HttpHeaders().append('Authorization', `Bearer ${token!.substring(1, token!.length - 1)}`)
    })
  }
}

