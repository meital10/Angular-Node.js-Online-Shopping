import { Component, OnInit, ViewChild, ElementRef,Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { UploadService } from '../upload.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit ,OnChanges {

  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() product:any = null;
  @Output() onEditedProduct= new EventEmitter();
  fileAttr = 'Choose File';
  dataImage: any;
  selectedCategoryCtrl:FormControl;

  constructor(private categoriesService: CategoryService, private productService: ProductService, private uploadService: UploadService, private formBuilder: FormBuilder, private snackBar: MatSnackBar ) { }
  categories: Array<any> = [];
  productForm: FormGroup;
  isEdit:boolean = false;

  ngOnInit(): void {
    this.isEdit = this.product!==null;
    this.initForm();
    this.categoriesService.fetchCategories().subscribe((categoriesItems) => {
      this.categories = categoriesItems;
    });
  }
  initForm(){
    this.productForm = this.formBuilder.group({
      productName: [this.isEdit ? this.product.name : '' , [Validators.required]],
      productPrice: [this.isEdit ? this.product.price : '' , Validators.required],
      productImage: [this.isEdit ? this.product.image : '' , Validators.required],
      productCategory: [this.isEdit ? this.product.category : '' , Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.isEdit = this.product!==null;
    if(this.isEdit){
      this.product = changes.product.currentValue;
      this.categoriesService.fetchCategories().subscribe((categoriesItems) => {
        this.categories = categoriesItems;
       this.initForm();
      });
      this.dataImage = `http://localhost:4000/img/${this.product.image}`;
    } else{
      this.dataImage=null;
      this.initForm();
    }
    
      
  }
  addProduct() {
    console.log('this.productForm',this.productForm);
    
    if (this.productForm.valid) {
      const payload: any = {
        name: this.productForm.get('productName').value,
        price: this.productForm.get('productPrice').value,
        image: this.productForm.get('productImage').value,
        categoryID: this.productForm.get('productCategory').value
      }
      this.productService.addProduct(payload).subscribe((item) => {
        console.log(item);
        this.snackBar.open( 'product has been added', 'OK',{
          duration:2000,
          verticalPosition:'top'
        });
        
      }, (err) => {
        console.log(err);
       
      })
    }
  }
  editProduct(){
    const payload: any = {
      name: this.productForm.get('productName').value,
      price: this.productForm.get('productPrice').value,
      image: this.productForm.get('productImage').value,
      categoryID: this.productForm.get('productCategory').value
    }
    this.productService.editProduct(this.product._id,payload).subscribe((item)=>{
      this.snackBar.open('Product has been edited', 'OK',{
        duration:2000,
        verticalPosition:'top'
      });
      this.onEditedProduct.emit(true);
    })
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
        console.log(file.name);
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          let imgBase64Path = e.target.result;
          console.log(imgBase64Path);
          this.dataImage = imgBase64Path;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);


    } else {
      this.fileAttr = 'Choose File';
    }
  }
  uploadImage() {
    const formData = new FormData();
    formData.append('mypic', this.fileInput.nativeElement.files[0]);
    this.fileInput.nativeElement.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.fileInput.nativeElement.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.fileInput.nativeElement.inProgress = false;
        return of(`Upload failed: ${this.fileInput.nativeElement.data.name}`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          this.productForm.get('productImage').setValue(event.body);
        }
      });

  }
  

}
