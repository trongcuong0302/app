import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const baseUrl = 'http://localhost:3000/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProduct(pageIndex: number, pageSize: number, searchValue: string, filters: Array<{ key: string; value: string[] }>): Observable<any> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('search', `${searchValue}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http.get(baseUrl, {params});
  }

  getProductStatistics(data: any): Observable<any> {
    return this.http.get(`${baseUrl}/statistics`, data);
  }

  getAnProduct(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  postAProduct(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateProductById(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteProductById(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
