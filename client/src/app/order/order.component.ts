import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {validateCreditCard} from '../utils/validators';
import { OrdersService } from '../orders.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() user: any = null;
  @Output() onOrderDemand = new EventEmitter();
  sendOrder:any=null;
  constructor(private formBuilder: FormBuilder, private ordersService:OrdersService) { }
  orderFormGroup: FormGroup;
  
  order(){
    const payload: any = {
      deliveryCity: this.orderFormGroup.get('city').value,
      deliveryStreet: this.orderFormGroup.get('street').value,
      paymentCardNumber: this.orderFormGroup.get('creditcard').value,
      deliveryDate:this.orderFormGroup.get('orderDate').value
    }

    this.onOrderDemand.emit(payload);
  }

  ngOnInit(): void {
    console.log(this.user);
    this.orderFormGroup = this.formBuilder.group({
      city: [this.user.city, [Validators.required]],
      street: [this.user.street, [Validators.required]],
      orderDate:[new Date(),[Validators.required]],
      creditcard: ['', [Validators.required,validateCreditCard, Validators.maxLength(16)]],

         
    });
   
  }

}
