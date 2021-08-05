import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  private BASE_URL:string = '/api/shopping/products';
  fetchAllProducts(){
    return this.http.get<Array<any>>(`${this.BASE_URL}`);
  }
  addProduct(payload:any){
    return this.http.post(`${this.BASE_URL}`,payload);
  }
  fetchProductsByCategoryID(categoryID:any){
    return this.http.get<Array<any>>(`${this.BASE_URL}/category/${categoryID}`);
  }
  editProduct(productId:string,payload:any){
    return this.http.put(`${this.BASE_URL}/${productId}`,payload);
  }
}
