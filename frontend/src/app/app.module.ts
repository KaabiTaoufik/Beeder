import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { LoginComponent } from './login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button";
import { AnimalsListComponent } from './animals-list/animals-list.component';
import { AnimalComponent } from './animal/animal.component';
import { AnimalsFilterComponent } from './animals-filter/animals-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from "./guards/auth.guard";
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimalItemComponent } from './animal-item/animal-item.component';
import { LoadingCircleComponent } from './loading-circle/loading-circle.component';
import { DatepipePipe } from './datepipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AnimalDetailsComponent,
    LoginComponent,
    AnimalsListComponent,
    AnimalComponent,
    AnimalsFilterComponent,
    AddAnimalComponent,
    AnimalItemComponent,
    LoadingCircleComponent,
    DatepipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    NoopAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule],
  providers: [AuthGuard],

  bootstrap: [AppComponent],
})
export class AppModule { }
