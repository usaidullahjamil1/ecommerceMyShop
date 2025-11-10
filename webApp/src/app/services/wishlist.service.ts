import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  http = inject(HttpClient);

  wishlists: Product[] = [];
  constructor() {}

  init() {
    return this.getWishLists().subscribe((result) => {
      this.wishlists = result;
    });
  }
  getWishLists() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/wishlists/',
    );
  }
  addInWishlist(productId: string) {
    return this.http.post<Product[]>(
      environment.apiUrl + '/customer/wishlists/' + productId,
      {},
    );
  }

  removeFromWishlist(productId: string) {
    return this.http.delete<Product[]>(
      environment.apiUrl + '/customer/wishlists/' + productId,
    );
  }
}
