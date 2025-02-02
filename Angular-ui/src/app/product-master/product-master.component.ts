import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from '../category-master/service/category.service';
import { ProductService } from "./service/product.service"

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {
  modalRef: BsModalRef;
  actionType: any;
  id: FormControl;
  productName: FormControl;
  categoryId: FormControl;
  productGroup: FormGroup;
  isLoading: any = true;
  productList: any = [];
  categoryList: any = [];
  productInfo: any = {};
  currentPage: any = 1;
  pageSize: any = 2;
  totalRecords: any = 0;
  totalPages: any;
  constructor(private modalService: BsModalService, private _service: ProductService, private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getList()
  }

  refreshPage() {
    this.currentPage = 1
    this.getList()
  }
  previewPage() {
    this.currentPage = this.currentPage - 1;
    this.getList();
  }
  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.getList()
  }
  getList() {
    let filter = {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
    }
    this._service.getList(filter).subscribe(res => {
      if (res) {
        this.productList = res.data;
        this.totalRecords = res.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize).toFixed()
        this.isLoading = false;
      }
    })
  }
  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }
  formGroupLoad() {
    this.id = new FormControl("", Validators.required);
    this.productName = new FormControl("", Validators.required);
    this.categoryId = new FormControl("", Validators.required);
    this.productGroup = new FormGroup({
      id: this.id,
      productName: this.productName,
      categoryId: this.categoryId
    })
    return this.productGroup;
  }
  viewRecord(contain, record) {
    this.productInfo = record;
    this.modalOpen(contain, "view", null);
  }
  getCategoryList() {
    this._categoryService.getList(null).subscribe(res => {
      if (res) {
        this.categoryList = res.data
      }
    })
  }
  modalOpen(contain, type, itemDetails) {
    this.actionType = type;
    switch (type) {
      case "add": {
        this.getCategoryList()
        this.formGroupLoad();
        this.productGroup.patchValue({
          id: 0
        })
        this.modalRef = this.modalService.show(contain, { backdrop: 'static' })
        break;
      }
      case "view": {
        this.modalRef = this.modalService.show(contain, { backdrop: 'static' });
        break
      }
      case "edit": {
        this.modalRef.hide();
        this.getCategoryList()
        this.formGroupLoad();
        this.productGroup.patchValue({
          id: itemDetails._id,
          productName: itemDetails.productName,
          categoryId: itemDetails.categoryId
        })
        this.modalRef = this.modalService.show(contain, { backdrop: 'static' })
      }
    }
  }
  delete(data) {
    if (confirm("Are you sure delete this record?")) {
      this._service.delete(data).subscribe(res => {
        this.getList()
        this.modalRef.hide();
      })
    }
  }
  onChange(e) {
    this.productGroup.patchValue({
      categoryId: e
    });
  }
  save() {
    if (this.productGroup.valid) {
      if (this.actionType == "add") {
        this._service.save(this.productGroup.value).subscribe(res => {
          if (res != "Record already Exist") {
            alert("Insert successful");
            this.getList()
            this.modalRef.hide();
          }
          else {
            alert(res);
          }
        })
      }
      if (this.actionType == "edit") {
        this._service.edit(this.productGroup.value).subscribe(res => {
          if (res) {
            alert("Edit successful");
            this.getList();
          }
          else {
            alert("Something is wrong");
          }
          this.modalRef.hide();
        })
      }
    }

  }
}
