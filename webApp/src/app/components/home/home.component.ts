import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, CarouselModule, RouterLink],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  customerService = inject(CustomerService);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  newProducts: Product[] = [];
  featuredProducts: Product[] = [];

  bannerImages: Product[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  ngOnInit() {
    this.customerService.getNewProducts().subscribe((result) => {
      console.log('new', result);
      this.newProducts = result;
    });
    this.customerService
      .getFeaturedProducts()
      .subscribe((result: Product[]) => {
        console.log('featured', result);
        this.featuredProducts = result;
        this.bannerImages.push(...result);
      });

    this.customerService.getFeaturedProducts().subscribe((result) => {
      console.log('featured', result);
      this.bannerImages.push(...result);
    });

  }
}
