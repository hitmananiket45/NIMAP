import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }
  getList(filter): Observable<any> {
    let query = {}
    if (filter != null) {
      query["CurrentPage"] = filter.currentPage;
      query["PageSize"] = filter.pageSize;
    }
    return this.http.get(environment.APPURL + "category?query=" + JSON.stringify(query))
  }
  save(formValue): Observable<any> {
    let data = {
      categoryName: formValue.categoryName
    }
    return this.http.post(environment.APPURL + "category", data);
  }
  edit(formValue): Observable<any> {
    let data = {
      id: formValue.id,
      categoryName: formValue.categoryName
    }
    return this.http.put(environment.APPURL + "category/" + data.id, data)
  }
  delete(formValue): Observable<any> {
    let id = formValue._id
    return this.http.delete(environment.APPURL + "category/" + id)
  }
}
