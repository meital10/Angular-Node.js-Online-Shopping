import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';

import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

 
 @Input() products:Array<any> = [];
  @Input() categories:Array<any> = [];
  @Input() isAdmin:boolean = false;
  @Output() onSelectedCategory = new EventEmitter();
  @Output() onSelectedProduct = new EventEmitter();
  searchText: string ='';

 
  constructor() { }

  ngOnInit(): void {
  }

 
  selectedProduct($event){

    this.onSelectedProduct.emit($event);

  }
  chooseCategory(categoryID:any){
    this.onSelectedCategory.emit(categoryID);
  }

}



