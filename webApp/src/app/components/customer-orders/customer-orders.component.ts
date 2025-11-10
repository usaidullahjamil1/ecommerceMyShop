import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../types/product';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss',
})
export class CustomerOrdersComponent {
  orders: Order[] = [];
  orderService = inject(OrderService);
  ngOnInit() {
    return this.orderService.getCustomerOrders().subscribe((result) => {
      this.orders = result;
      console.log(this.orders);
    });
  }
  sellingPrice(product: Product) {
    const price = Number(product.price || 0);
    const discount = Number(product.discount || 0);
    return Math.round(price - (price * discount) / 100);
  }
}
