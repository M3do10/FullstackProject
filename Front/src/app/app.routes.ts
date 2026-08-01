import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { ProductDetails } from './components/product-details/product-details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';


export const routes: Routes = [
  { path: '', component: Home , title:"Home"},
  { path: 'products', component: Products, title:"Products" },
  { path: 'product/:id', component: ProductDetails, title: "Product Details" },
 
  { path: 'login', component: Login , title:"Login"},
  { path: 'register', component: Register },

  { path: 'cart', component: Cart , title:"Cart" },
  { path: 'checkout', component: Checkout, title:"Checkout" },

  { path: 'about', component: About, title:"About" },
  { path: 'contact', component: Contact , title:"Contact US"},

  { path: '**', redirectTo: '' }
];