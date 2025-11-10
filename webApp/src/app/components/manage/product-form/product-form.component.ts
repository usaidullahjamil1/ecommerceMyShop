import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatButtonModule, MatButton, MatIconButton, } from '@angular/material/button';
import { MatInputModule, MatInput, MatFormField, MatLabel } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/product';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-product-form',
  standalone:true,
  imports: [MatInput, MatFormField, MatLabel, MatButton, ɵInternalFormsSharedModule,ReactiveFormsModule, MatSelectModule,CommonModule,MatCheckboxModule,MatRadioModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  
formBuilder=inject(FormBuilder)
productForm=this.formBuilder.group({
   name:[[null],[Validators.required]],
   shortDescription:[[null],[Validators.required]],
   description:[[null],[Validators.required]],
   price:[[null],[Validators.required]],
   discount:[],
   images:this.formBuilder.array([]),
   categoryId:[[null],[Validators.required]],
   brandId:[[null],[Validators.required]],
   isFeatured:false,
   isNewProduct:false,



})
brands:Brand[]=[];
categories:Category[]=[];
categoryService=inject(CategoryService)
brandService=inject(BrandService)
productService=inject(ProductService)
id!:string;
route=inject(ActivatedRoute)
ngOnInit(){
  this.addImage()
  this.categoryService.getCategories().subscribe((result)=>{
    this.categories=result
  })

   this.brandService.getBrands().subscribe((result)=>{
    this.brands=result
  });
 this.id = this.route.snapshot.params['id'];
    console.log(this.id);
 
  if(this.id){
    this.productService.getProductById(this.id).subscribe(result=>{
      for (let index = 0; index < result.images.length-1; index++) {
  this.addImage()
        
      }
      this.productForm.patchValue(result as any)
    })
  }
  else{
  this.addImage()
    
  }
}
router=inject(Router)
  addProduct(){
    let value=this.productForm.value;
    console.log(value)
    this.productService.addProduct(value as any).subscribe(result=>{
      alert('Product Added')
      this.router.navigateByUrl("/admin/product")
    })

  } 
  updateProduct(){
  // this.router.navigateByUrl(`/admin/product/${this.id}`);
  // console.log(this.id)

 let value=this.productForm.value;
    console.log(value)
    this.productService.updateProduct(this.id,value as any).subscribe(result=>{
      alert('Product Updated')
      this.router.navigateByUrl("/admin/product")
    })
  }

  addImage(){
    this.images.push(this.formBuilder.control(null))
  }
  removeImage(){
    this.images.removeAt(this.images.controls.length-1)
    // alert(index+1)
    //   this.images.removeAt(index);

  }
  get images(){
    return this.productForm.get('images') as FormArray
  }
}
