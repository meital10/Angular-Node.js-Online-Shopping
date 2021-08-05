import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  base_url:string = `http://localhost:4000/img/`;
  constructor() { }
  quantity:number=1;
  @Input() product:any = null;
  @Input() isAdmin:boolean = false;
  @Output() onSelectedProduct = new EventEmitter();
  ngOnInit(): void {
   
  }
  addToCart():void{
    const payload:any ={...this.product,quantity:this.quantity};
    this.onSelectedProduct.emit(payload);
  }
  selectedProduct(): void{
    if(this.isAdmin){
      const payload:any ={...this.product};
      this.onSelectedProduct.emit(payload);
    }
   
  }
}
