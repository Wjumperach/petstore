import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pet } from '../model/pet';
import { Status } from '../enums/status';

const petstoreapi = 'https://petstore.swagger.io/v2/pet/';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  http = inject(HttpClient);

  findByStatus(status: string): Observable<Pet[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('status', status)
    return this.http.get<Pet[]>(petstoreapi + 'findByStatus', {params: queryParams});
  }

  addPet(pet: Pet) {
    const body = {
      "id": pet.id,
      "category": pet.category,
      "name": pet.name,
      "photoUrls": pet.photoUrls,
      "tags": pet.tags,
      "status": pet.status
    };
    return this.http.post(petstoreapi, body);
  }

  updatePet(pet: Pet) {
    const body = {
      "id": pet.id,
      "category": pet.category,
      "name": pet.name,
      "photoUrls": pet.photoUrls,
      "tags": pet.tags,
      "status": pet.status
    };
    return this.http.put(petstoreapi, body);
  }

  deletePet(pet: Pet) {
    return this.http.delete(petstoreapi + pet.id);
  } 
}
