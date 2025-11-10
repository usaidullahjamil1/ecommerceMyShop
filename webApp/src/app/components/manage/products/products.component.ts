import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../types/brand';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/product';

@Component({
  selector: 'app-products',
      imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  displayedColumns: string[] = ['id', 'name','shortDescription','price','discount', 'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
productService=inject(ProductService)
  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(){
  this.getServerData()

   
  }
  private getServerData(){
  this.productService.getProducts().subscribe({
    next: (result) => {
      console.log('✅ API response:', result);
      this.dataSource.data = result;
    },
    error: (err) => {
      console.error('❌ Error fetching products:', err);
    }
  });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
   
  }
   delete(id:string){
    
      this.productService.deleteProductsById(id).subscribe((result)=>{
        alert('Product Deleted')
        this.getServerData()
      })
    }

}
