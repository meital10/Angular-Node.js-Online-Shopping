import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-page-information',
  templateUrl: './main-page-information.component.html',
  styleUrls: ['./main-page-information.component.css']
})
export class MainPageInformationComponent implements OnInit {

  constructor(private orderService:OrdersService,private productService:ProductService) { }

  totalNumberOfOrders:number = 0;
  totalNumberOfProducts:number = 0;
  
  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((orders)=>{
      this.totalNumberOfOrders= orders.length;
    });
    this.productService.fetchAllProducts().subscribe((products)=>{
      this.totalNumberOfProducts=products.length;
    });

  }

}
