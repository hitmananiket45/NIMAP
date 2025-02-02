import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductMasterComponent } from './product-master/product-master.component';
import { CategoryMasterComponent } from "./category-master/category-master.component";

const routes: Routes = [
  { path: "", component: ProductMasterComponent },
  { path: "category", component: CategoryMasterComponent },
  { path: "product", component: ProductMasterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
