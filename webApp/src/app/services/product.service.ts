import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  constructor() {}
  getProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/product');
  }

  addProduct(model: string) {
    return this.http.post(environment.apiUrl + '/product', model);
  }
  updateProduct(id: string, model: Product) {
    return this.http.put(environment.apiUrl + '/product/' + id,model);
  }
  getProductById(id: string) {
    return this.http.get<Product>(environment.apiUrl + '/product/' + id);
  }
  deleteProductsById(id: string) {
    return this.http.delete(environment.apiUrl + '/product/' + id);
  }
//   updateProduct(id: string, data: any){
//   return this.http.put(environment.apiUrl + '/product/' + id, data);
// }

}
