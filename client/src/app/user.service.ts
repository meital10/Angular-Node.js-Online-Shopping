import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient ) { }
  private BASE_URL:string = '/api/';

  getUserLogin(email:string,password:string){
   return  this.http.post(`${this.BASE_URL}auth/login`,{username:email,password:password});
  }
 
  signUpUser(userId:string,email:string,password:string,city:string,street:string,firstName:string,lastName:string){
    return this.http.post(`${this.BASE_URL}auth/signup`,{userId:userId,email:email,password:password,city:city,street:street,firstName:firstName,lastName:lastName});
  }
  isUserAdmin(){
    return true;
  }
  getCurrentUser(){
     return this.http.get(`/api/auth/currentUser`);
    
  }
  logout(){
   
    return this.http.get(`${this.BASE_URL}auth/logout`);
  }




}
