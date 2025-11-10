import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatInput,
    MatLabel,
    FormsModule,
    MatFormField,
    MatButton,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formbuilder = inject(FormBuilder);
  loginForm = this.formbuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  authService = inject(AuthService);
  router = inject(Router);
  // login() {
  //   console.log(this.loginForm.value);
  //   this.authService
  //     .login(this.loginForm.value.email!, this.loginForm.value.password!)
  //     .subscribe((result) => {
  //       console.log('result', result);
  //       localStorage.setItem("token",result.result.token)
  //     });
  // }
  // login() {
  //   this.authService
  //     .login(this.loginForm.value.email!, this.loginForm.value.password!)
  //     .subscribe((res) => {
  //       const data = res as { result?: { token?: string } };
  //       const token = data.result?.token;
  //       const user = JSON.stringify(data.result?.user);

  //       if (token) {
  //         localStorage.setItem('token', token);
  //         localStorage.setItem('token', user);

  //         console.log('Token stored:', token);
  //       } else {
  //         console.error('Token missing in response');
  //       }
  //     });
  // }

  // login() {
  //   this.authService
  //     .login(this.loginForm.value.email!, this.loginForm.value.password!)
  //     .subscribe((res) => {
  //       const data = res as { result?: { token?: string; user?: any } };
  //       const token = data.result?.token;
  //       const user = data.result?.user;

  //       if (token) {
  //         localStorage.setItem('token', token);
  //         console.log('Token stored:', token);
  //       }

  //       if (user) {
  //         localStorage.setItem('user', JSON.stringify(user));
  //         console.log('User stored:', user);
  //       } else {
  //         console.error('User missing in response');
  //       }
  //     });

  // }
  login() {
    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe((res) => {
        const data = res as { result?: { token?: string; user?: any } };
        const token = data.result?.token;
        const user = data.result?.user;

        if (token && user) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          console.log('Token stored:', token);
          console.log('User stored:', user);

          // ✅ Navigate after successful login
          this.router.navigateByUrl('/');
        } else {
          console.error('Missing token or user in response');
        }
      });
  }
}
