import { Component, OnInit, TemplateRef } from '@angular/core';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  constructor(private cart_service:CartService,private userService:UserService, private ordersService:OrdersService,private dialog:MatDialog,private router:Router) { }
  cart:any = null;
  user:any = null;
  link:string=null;
  @ViewChild('dialogAlert') dialogAlert: TemplateRef<any>;


  opendialogAlert() {
    this.dialog.open(this.dialogAlert);
  }

  
  
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data:any) => {
     
      this.user = data["user"];
      console.log('getCurrentUser',this.user);
      this.fetchCartOfUser();
    });
  
  }
  backToShop(){
    this.router.navigate(['/shopping']);
  }

  orderDelivery($payload){
    const totalPrice = this.cart.cartItems.reduce((prod1,prod2)=>prod1+prod2.generalPrice,0);
    const payloadOrder = {...$payload};
    payloadOrder.cart = this.cart.cart._id;
    payloadOrder.client = this.user._id;
    payloadOrder.totalPrice = totalPrice;

    this.ordersService.sendOneOrder(payloadOrder).subscribe((item:any)=>{
      let orderedProductList:string  = "";
      this.cart.cartItems.forEach(cartItem => {
        orderedProductList +=`${cartItem.product.name} * ${cartItem.quantity} = ${cartItem.generalPrice} \n`;
      });
      const receiptString1:string = `${item._id}\n
        Products ordered: \n
       ${orderedProductList} 
       Total Price : ${totalPrice}`
       const payloadReceipt = {client:this.user._id,receiptString:receiptString1}
       this.ordersService.generateReceipts(payloadReceipt).subscribe((receiptLink:any)=>{
        this.link = receiptLink.path;

        this.opendialogAlert();
       })
      });
     
  }
  fetchCartOfUser(){
    this.cart_service.getCurrentUserCart(this.user._id).subscribe((cartObj)=>{
      this.cart = cartObj;  
    });
  }

}
