import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../types/category';
import { Brand } from '../types/brand';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  http=inject(HttpClient)
  getBrands(){
    return this.http.get<Brand[]>(environment.apiUrl+ "/brand")
  }
  addBrand(name:string){
    return this.http.post(environment.apiUrl+"/brand",{
      name:name
    })
  }
  updateBrand(id:string,name:string){
    return this.http.put(environment.apiUrl+"/brand/"+id,{
      name:name
    })
  }
  getBrandById(id:string){
    return this.http.get<Brand>(environment.apiUrl+"/brand/"+id)
  }
  deleteBrandsById(id:string){
    return this.http.delete(environment.apiUrl+"/brand/"+id)
  }
}
