import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnChanges {

  constructor(private router:Router) { }
  
  @Input() cart:any = null;
  @Input() isOrder:boolean =false;
  @Output() onDeleteCartItem = new EventEmitter();
  BASE_URL:string  = 'http://localhost:4000/img/';

  order(){
    this.router.navigate(['/order-page']);
  }

  removeCartItem(cartItemID){
    this.onDeleteCartItem.emit({id:cartItemID,isAll:false});
  }
  removeAllCartItems(){
    this.onDeleteCartItem.emit({id:this.cart.cart._id,isAll:true});
  }
  totalProductsPrice:number=0;

  ngOnInit(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {
   const currentCart = changes.cart.currentValue;
   if(currentCart){
    this.totalProductsPrice = this.cart.cartItems.reduce((prod1,prod2)=>prod1+prod2.generalPrice,0);
   }
  }


}
