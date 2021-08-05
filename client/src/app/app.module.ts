import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
// import {FlexLayoutModule} from '@angular/flex-layout';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { OurStoreComponent } from './our-store/our-store.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageInformationComponent } from './main-page-information/main-page-information.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ShoppingComponent,
    OurStoreComponent,
    MainPageComponent,
    MainPageInformationComponent,
    HeaderComponent,
    ProductListComponent,
    AdminProductsComponent,
    CartComponent,
    ProductComponent,
    OrderComponent,
    OrderPageComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatStepperModule,
    MatGridListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    RouterModule.forRoot([
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component:  MainPageComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'shopping', component: ShoppingComponent },
      { path: 'order-page', component: OrderPageComponent },
      { path: '**', component: MainPageComponent }
    ])
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class AppModule { }







// proxy doesnt work with images
// heroku -doesnt work
