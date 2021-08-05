import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CartService } from '../cart.service';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
 opened=false;
 @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
  allProducts:Array<any> = [];
  allCategories:Array<any> = [];
  isAdmin:boolean = false;
  editedProduct: any =null;
  currentUser:any = {};
    cart:any = null;
  constructor(private service:ProductService,private userService:UserService, private category_service:CategoryService,private cart_service:CartService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data:any) => {
      console.log('getCurrentUser',data);
      this.currentUser = data.user;
      this.isAdmin = this.currentUser.role ==='admin';

      this.service.fetchAllProducts().subscribe((products)=>{
        this.allProducts=products;
      })

      this.category_service.fetchCategories().subscribe((categories)=>{
        this.allCategories=categories;
      })
      if(!this.isAdmin){
       this.fetchCartOfUser();
       this.drawer.open();
      }
      
    })
    
   
  }
  fetchCartOfUser(){
    this.cart_service.getCurrentUserCart(this.currentUser._id).subscribe((cartObj)=>{
      this.cart = cartObj;
    });
  }
  removeCartItem($removedPayload:any){
    console.log($removedPayload);
    if($removedPayload.isAll){
      this.cart_service.deleteAllCartItems($removedPayload.id).subscribe((result)=>{
        this.fetchCartOfUser();
      })
    } else{
      this.cart_service.deleteCartItem($removedPayload.id).subscribe((result)=>{
        this.fetchCartOfUser();
      })
    }
    
  }
  showAddProduct(){
    this.editedProduct = null;
    this.drawer.toggle();
  }
  selectProduct($product){
  
    if(!this.isAdmin){
      const payload:any = {}
      payload.cart = this.cart.cart._id;
      payload.product = $product._id;
      payload.quantity = $product.quantity;
      this.cart_service.updateProductInCart(payload).subscribe((response)=>{
        this.fetchCartOfUser();
      })
    } else{
      this.editedProduct = $product;
    }
    this.drawer.open();
  }
  hasBeenEdited($event){
    if($event){
      this.service.fetchAllProducts().subscribe((products)=>{
        this.allProducts=products;
        this.drawer.close();
        this.editedProduct = null;
      })
    }
  }
  getProductsByCategory($event:any){
    if($event==-1){
      this.service.fetchAllProducts().subscribe((products)=>{
        this.allProducts=products;
      })
    } else{
      this.service.fetchProductsByCategoryID($event).subscribe((products)=>{
        this.allProducts=products;
      })
    }
   
  }

}
