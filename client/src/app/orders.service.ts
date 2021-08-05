import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private BASE_URL:string = '/api/shopping/';
  private BASE_URL_PDF:string ='http://localhost:4000/pdf';
  
  constructor(private http:HttpClient) { }
  getAllOrders(){
    return this.http.get<Array<any>>(`${this.BASE_URL}/orders`);
  }
  sendOneOrder(payload:any){
    return this.http.post(`${this.BASE_URL}/order`, payload);
  }
  generateReceipts(payload:any){
    return this.http.post(`${this.BASE_URL_PDF}`,payload);
  }
}

