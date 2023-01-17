import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouteNames } from './Route-Names.model';
import { LoginComponent } from "./login/login.component";
import { AddAnimalComponent } from './add-animal/add-animal.component';
import {MyAnimalsComponent} from "./my-animals/my-animals.component";

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent }, // should be changed to our default page
  { path: RouteNames.LOGIN, component: LoginComponent },
  { path: RouteNames.ADD_ANIMAL, component: AddAnimalComponent, pathMatch: 'full' },
  { path: RouteNames.ANIMAL_DETAILS, component: AnimalDetailsComponent },
  {path : RouteNames.MY_ANIMALS , component : MyAnimalsComponent},
  { path: '**', redirectTo: RouteNames.HOME }
  /*
  use canActivate to protect routes like so :
  {path: RouteNames.ANIMAL_DETAILS, component: AnimalDetailsComponent , canActivate: [AuthGuard]},
  */
];
