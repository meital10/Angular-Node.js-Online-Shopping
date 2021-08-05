import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  
  private BASE_URL:string = '/api/shopping'
  getCurrentUserCart(user:string){
    return this.http.get(`${this.BASE_URL}/lastCart`);
  }
  updateProductInCart(productObj:any){
    return this.http.post(`${this.BASE_URL}/cart-item`,productObj);
    
  }

  deleteCartItem(cartItemID:string){
    return this.http.delete(`${this.BASE_URL}/cart-item/${cartItemID}`);
  }
  deleteAllCartItems(cartID:string){
    return this.http.delete(`${this.BASE_URL}/cart-items/${cartID}`);
  }
}
