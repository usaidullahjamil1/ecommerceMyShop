import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormField,
  MatInput,
  MatInputModule,
} from '@angular/material/input';

import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { MatButton } from "@angular/material/button";
@Component({
  selector: 'app-shopping-cart',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormField,
    MatRadioModule,
    FormsModule,
    MatButton
],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  ngOnInit() {
    this.cartService.init();
  }
  get cartItems() {
    return this.cartService.cartItems;
  }
  sellingPrice(product: Product) {
    const price = Number(product.price || 0);
    const discount = Number(product.discount || 0);
    return Math.round(price - (price * discount) / 100);
  }
  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe((result) => {
      this.cartService.init();
    });
  }
  // get totalAmount() {
  //   let amount = 0;
  //   for (let index = 0; index < this.cartItems.length; index++) {
  //     const element = this.cartItems[index];
  //     amount=this.sellingPrice(element.product)*element.quantity

  //   }
  //   return amount;
  // }

  get totalAmount(): number {
    return this.cartItems.reduce((sum, item) => {
      const itemTotal = this.sellingPrice(item.product) * item.quantity;
      return sum + itemTotal;
    }, 0);
  }

  // ✅ Total Quantity (sum of all quantities)
  get totalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  orderStep = 0;
  formBuilder = inject(FormBuilder);
  paymentType = 'cash';
  addressForm = this.formBuilder.group({
    address1: [''],
    address2: [''],
    city: [''],
    pincode: [''],
  });
  checkout() {
    this.orderStep = 1;
  }
  addAddress() {
    this.orderStep = 2;
  }
  completeOrder() {
    let order: Order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
    };
    this.orderService.addOrder(order).subscribe((result) => {
      alert('Your order is completed');
      this.cartService.init();
      this.orderStep = 0;
    });
    console.log(order);
  }
}
