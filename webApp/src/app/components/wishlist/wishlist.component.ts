import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../types/product';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  whishlists: Product[] = [];
  wishlistService = inject(WishlistService);
  ngOnInit(){
    this.wishlistService.init()

    
  }
}
