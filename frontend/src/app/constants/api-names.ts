import { environment } from 'src/environments/environment';
export class APINames {
  static ANIMALS: string = `${environment.API_URL}/animals`;
  static ADDANIMAL: string = `${environment.API_URL}/add/animals`;
}
