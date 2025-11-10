import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-guard';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/admin-guard';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { OrdersComponent } from './components/manage/orders/orders.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },

  //categories
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories/add',
    component: CategoryFormComponent,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/categories/:id',
    component: CategoryFormComponent,
    canActivate: [adminGuard],
  },

  //brands

  {
    path: 'admin/brands',
    component: BrandsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brand/add',
    component: BrandFormComponent,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/brands/:id',
    component: BrandFormComponent,
    canActivate: [adminGuard],
  },

  //products

  {
    path: 'admin/product',
    component: ProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/product/add',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/product/:id',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },

  //product-list
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard],
  },

  //product-detail
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [authGuard],
  },
  // register
  {
    path: 'register',
    component: RegisterComponent,
  },
  // register
  {
    path: 'login',
    component: LoginComponent,
  },

  // dash-board
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  // customer-profile
  {
    path: 'profile',
    component: CustomerProfileComponent,
    canActivate: [authGuard],
  },
  //wishlist
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [authGuard],
  },
  //wishlist
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [authGuard],
  },
  //wishlist
  {
    path: 'orders',
    component: CustomerOrdersComponent,
    canActivate: [authGuard],
  },
  //admin-orders
  
  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [adminGuard],
  },
];
