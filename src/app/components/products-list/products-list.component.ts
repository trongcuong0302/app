import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products?: Product[];
  currentProduct: Product = {};
  pageSize = 10;
  pageIndex = 1;
  total = 1;
  loading = true;
  visible = false;
  searchValue = '';
  filterPrice = [
    { text: '<13', value: '13' },
    { text: '<12', value: '12' },
    { text: '<11', value: '11' }
  ];
  filterCategoryCode = [
    { text: 'C1', value: 'C1' },
    { text: 'C2', value: 'C2' },
    { text: 'C3', value: 'C3' }
  ];
  
  constructor(
    private productsService: ProductsService, 
    private router: Router) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.searchValue, []);
  }

  setActiveProduct(product: Product): void {
    this.currentProduct = product;
    this.router.navigate([`/products/${this.currentProduct._id}`]);
  }

  loadDataFromServer(pageIndex: number, pageSize: number, searchValue: string, filter: Array<{ key: string; value: string[] }>): void {
    this.loading = true;
    this.productsService.getAllProduct(pageIndex, pageSize, searchValue, filter).subscribe({
      next: (data) => {
        this.loading = false;
        this.total = data.total;
        this.products = data.dataPage;
        //console.log(this.products);
        
      },
      error: (err) => console.log(err)
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageIndex, pageSize, filter} = params;
    const searchValue = this.searchValue;
    
    this.loadDataFromServer(pageIndex, pageSize, searchValue, filter);
  }

  search() :void {
    this.visible = false;
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.searchValue, []);
  }

  reset() :void {
    this.searchValue = '';
    this.search();
  }
}
