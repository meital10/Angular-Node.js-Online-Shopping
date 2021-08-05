import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  private BASE_URL:string = '/api/shopping/categories';
  fetchCategories(){
    return this.http.get<Array<any>>(this.BASE_URL);
  }
fetchOneCategory(id){
  return this.http.get(`${this.BASE_URL}/category/:id`),{id};
}
 
}
