import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatInput,
    MatLabel,
    FormsModule,
    MatFormField,
    MatButton,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formbuilder = inject(FormBuilder);
  // registerForm = this.formbuilder.group({
  //   name: ['', Validators.required],
  //   email: ['', Validators.required, Validators.email],
  //   password: ['', Validators.required, Validators.minLength(5)],
  // });
  registerForm = this.formbuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  authService = inject(AuthService);
  router = inject(Router);
  register() {
    console.log(this.registerForm.value);
    let value = this.registerForm.value;
    this.authService
      .register(value.name!, value.email!, value.password!)
      .subscribe((result) => {
        alert('User Registered');
        this.router.navigateByUrl('/login');
      });
  }
}
