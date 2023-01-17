import { Component, OnInit } from '@angular/core';
import { Gender } from '../Enums/genderEnum';
import { Constants } from '../constants/Constants';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../models/animal';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent implements OnInit {
  isLoading: boolean = true;
  animalList: Animal[] = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onFilterChange(filter: any): void {
    this.isLoading = true;
    const animalFilterURL = Constants.API_URL + '/animals/filter/';
    filter.shouldBringImages = true;
    filter.shouldEncodeImages = true;
    this.httpClient.get<Animal[]>(animalFilterURL, { params: filter }).subscribe((animals) => {
      this.isLoading = false;
      this.animalList = animals;
    });
  }

}
