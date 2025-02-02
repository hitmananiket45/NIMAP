import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  getList(filter): Observable<any> {
    let query = {
      CurrentPage: filter.currentPage,
      PageSize: filter.pageSize,
    };
    return this.http.get(environment.APPURL + "product?query=" + JSON.stringify(query))
  }
  save(formValue): Observable<any> {
    let data = {
      productName: formValue.productName,
      categoryId: formValue.categoryId
    }
    return this.http.post(environment.APPURL + "product", data);
  }
  edit(data): Observable<any> {
    return this.http.put(environment.APPURL + "product/" + data.id, data)
  }
  delete(formValue): Observable<any> {
    let id = formValue._id
    return this.http.delete(environment.APPURL + "product/" + id)
  }
}
