import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { Category } from '../types/category';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  http = inject(HttpClient);
  constructor() {}

  getNewProducts() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/new-products',
    );
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/featured-products',
    );
  }

  getCategories() {
    return this.http.get<Category[]>(
      environment.apiUrl + '/customer/categories',
    );
  }

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + '/customer/brands');
  }

  getProductById(id: string) {
    return this.http.get<Product>(
      environment.apiUrl + '/customer/product/' + id,
    );
  }
  // getProducts(
  //   searchTerm: string,
  //   categoryId: string,
  //   sortBy: string,
  //   sortOrder: number,
  //   brandId: string,
  //   page: number,
  //   pageSize: number,
  // ) {
  // return this.http.get<Product[]>(
  //   environment.apiUrl +
  //     `/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}&brandId=${brandId}`,
  // );
  //     const url =
  //   environment.apiUrl +
  //   `/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}&brandId=${brandId}`;
  // console.log('🔗 API URL:', url);
  // return this.http.get<Product[]>(url);

  //   }

  getProducts(
    searchTerm: string,
    categoryId: string,
    sortBy: string,
    sortOrder: number,
    brandId: string,
    page: number,
    pageSize: number,
  ) {
    const url =
      environment.apiUrl +
      `/customer/products?searchTerm=${searchTerm || ''}&categoryId=${categoryId || ''}&sortBy=${sortBy || ''}&sortOrder=${sortOrder || '-1'}&page=${page?.toString() || '1'}&pageSize=${pageSize?.toString() || '6'}&brandId=${brandId || ''}`;

    console.log('🔗 API URL:', url);
    return this.http.get<Product[]>(url);
  }

}
