import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product-detail',
  imports: [ProductCardComponent, MatIconModule, MatButtonModule, CommonModule],
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  customerService = inject(CustomerService);
  similarProducts: Product[] = [];
  product!: Product;
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  ngOnInit() {
    // const id = this.router.snapshot.params['id'];
    this.route.params.subscribe((x: any) => {
      this.getProductDetail(x.id);
    });
  }
  getProductDetail(id: string) {
    this.customerService.getProductById(id).subscribe((result) => {
      this.product = result;
      console.log('product by id', this.product);
      this.customerService
        .getProducts('', this.product.categoryId, '', -1, '', 1, 4)
        .subscribe((result) => {
          this.similarProducts = result;
        });
    });
  }
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
        .subscribe((result: any) => {
          this.wishlistService.init();
        });
    } else {
      this.wishlistService
        .addInWishlist(product._id!)
        .subscribe((result: any) => {
          this.wishlistService.init();
        });
    }
  }

  isInWishlist(product: Product) {
    let productExists = this.wishlistService.wishlists.find(
      (x: any) => x._id === product._id,
    );
    if (productExists) {
      return true;
    } else {
      return false;
    }
  }

  //cart

  addToCart(product: Product) {
    // this.cartService.addToCart(product).subscribe((result) => {});
    console.log(product);
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        this.cartService.init();
        alert('product added to cart');
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
