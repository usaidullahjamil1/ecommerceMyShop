import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatButton,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  customerService = inject(CustomerService);
  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  brandId: string = '';
  products: Product[] = [];
  page = 1;
  pageSize = 6;
  category: Category[] = [];
  brand: Brand[] = [];
  // ngOnInit() {
  //   this.customerService
  //     .getProducts(
  //       this.searchTerm,
  //       this.categoryId,
  //       this.sortBy,
  //       this.sortOrder,
  //       this.brandId,
  //       this.page,
  //       this.pageSize,
  //     )
  //     .subscribe((result) => {

  //       this.products = result;
  //       console.log('products', this.products);
  //     });
  // }
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.customerService.getCategories().subscribe((result) => {
      this.category = result;
    });
    this.customerService.getBrands().subscribe((result) => {
      this.brand = result;
    });
    // 👇 Listen for query param changes
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params['categoryId'] || '';
      this.searchTerm = params['search'] || '';
      console.log('📦 New categoryId:', this.categoryId);
      console.log('🔍 Search term:', this.searchTerm);

      // call API again with new params
      this.loadProducts();
    });
  }

  // loadProducts() {
  //   this.customerService
  //     .getProducts(
  //       this.searchTerm,
  //       this.categoryId,
  //       this.sortBy,
  //       this.sortOrder,
  //       this.brandId,
  //       this.page,
  //       this.pageSize,
  //     )
  //     .subscribe((result) => {
  //       this.products = result;
  //       console.log('✅ Products loaded:', this.products);
  //     });
  // }
  loadProducts() {
    // agar koi category select ni hui, to kuch mat bhejo
    setTimeout(() => {
      if (!this.categoryId && !this.searchTerm) {
        console.warn('⚠️ No category or search term, skipping API call');
        return;
      }
      console.log('📡 Fetching products for category:', this.categoryId);

      this.customerService
        .getProducts(
          this.searchTerm,
          this.categoryId,
          this.sortBy,
          this.sortOrder,
          this.brandId,
          this.page,
          this.pageSize,
        )
        .subscribe({
          next: (result) => {
            this.products = result;
            console.log('✅ Products loaded:', this.products);
            if (result.length < this.pageSize) {
              this.isNext = false;
              console.log('isNext in next', this.isNext);
            }
          },
          error: (err) => {
            console.error('❌ Error loading products:', err);
          },
        });
    }, 500);
  }
  orderChange(event: any) {
    this.sortBy = 'price';
    this.sortOrder = event;
    console.log('📊 Sorting by', this.sortBy, 'Order:', this.sortOrder);
    this.loadProducts();
  }
  isNext = true;
  pageChange(page: number) {
    this.page = page;
    this.isNext = true;
    console.log('isNext in pageChange', this.isNext);
    this.loadProducts();
  }
}
