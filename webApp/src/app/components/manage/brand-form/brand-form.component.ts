import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from "@angular/material/input";
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
   imports: [FormsModule, MatInputModule, MatButtonModule, CommonModule],

  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
name!:string;
brandService=inject(BrandService)
router=inject(Router)
route=inject(ActivatedRoute)
isEdit!:boolean;
id!:string


ngOnInit(){
  this.id=this.route.snapshot.params['id'];
  console.log(this.id)
  if(this.id){
    this.isEdit=true
     this.brandService.getBrandById(this.id).subscribe((result: any) => {
        console.log('result',result);
        this.name = result.name;
      });
  }

}

add(){
  this.brandService.addBrand(this.name).subscribe((result)=>{
    this.router.navigateByUrl('admin/brands')
  })
}
update() {
    this.brandService.updateBrand(this.id,this.name).subscribe((result:any)=>{
      alert('Brand Updated '+ this.name)
      this.router.navigateByUrl('/admin/brands');

    })
  }
// update(){
// alert('updated')}
}
