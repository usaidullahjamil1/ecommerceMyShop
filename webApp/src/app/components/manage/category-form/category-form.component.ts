

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {

  fb = inject(FormBuilder);
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // ✅ Reactive form
  categoryForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  isEdit = false;
  id!: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.isEdit = true;

      this.categoryService.getCategoryById(this.id).subscribe((result: any) => {
        this.categoryForm.patchValue({
          name: result.name
        });
      });
    }
  }

  add(): void {
    const value = this.categoryForm.value.name;

    this.categoryService.addCategory(value).subscribe(() => {
      alert(`${value} added`);
      this.router.navigateByUrl('/admin/categories');
    });
  }

  update(): void {
    const value = this.categoryForm.value.name;

    this.categoryService.updateCategory(this.id, value).subscribe(() => {
      alert(`Category Updated: ${value}`);
      this.router.navigateByUrl('/admin/categories');
    });
  }
}
