import { Component, inject, Input, input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  @Input() product!: Product;
  get sellingPrice() {
    const price = Number(this.product?.price || 0);
    const discount = Number(this.product?.discount || 0);
    return Math.round(price - (price * discount) / 100);
  }
  addToWishlist(product: Product) {
    console.log(product);
    if (this.isInWishlist(product)) {
      this.wishlistService
        .removeFromWishlist(product._id!)
        .subscribe((result) => {
          this.wishlistService.init();
        });
    } else {
      this.wishlistService.addInWishlist(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product: Product) {
    let productExists = this.wishlistService.wishlists.find(
      (x) => x._id === product._id,
    );
    if (productExists) {
      return true;
    } else {
      return false;
    }
  }

  addToCart(product: Product) {
    // this.cartService.addToCart(product).subscribe((result) => {});
    console.log(product);
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        this.cartService.init();
        alert('Product added to cart');
      });
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(() => {
        this.cartService.init();
        alert('product removed from cart');
      });
    }
  }
  isProductInCart(productId: string) {
    if (this.cartService.cartItems.find((x) => x.product._id === productId)) {
      return true;
    } else {
      return false;
    }
  }
}
