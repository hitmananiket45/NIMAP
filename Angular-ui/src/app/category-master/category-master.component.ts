import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from "./service/category.service"

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css']
})
export class CategoryMasterComponent implements OnInit {
  modalRef: BsModalRef;
  actionType: any;
  id: FormControl;
  categoryName: FormControl;
  categoryGroup: FormGroup;
  isLoading: any = true;
  categoryList: any = [];
  categoryInfo: any = {};
  currentPage: any = 1;
  pageSize: any = 2;
  totalRecords: any = 0;
  totalPages: any;
  constructor(private modalService: BsModalService, private _service: CategoryService) { }

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
        this.categoryList = res.data;
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
    this.categoryName = new FormControl("", Validators.required);
    this.categoryGroup = new FormGroup({
      id: this.id,
      categoryName: this.categoryName
    })
    return this.categoryGroup;
  }
  viewRecord(contain, record) {
    this.categoryInfo = record;
    this.modalOpen(contain, "view", null);
  }
  modalOpen(contain, type, itemDetails) {
    this.actionType = type;
    switch (type) {
      case "add": {
        this.formGroupLoad();
        this.categoryGroup.patchValue({
          id: 0,
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
        this.formGroupLoad();
        this.categoryGroup.patchValue({
          id: itemDetails._id,
          categoryName: itemDetails.categoryName,
        })
        this.modalRef = this.modalService.show(contain, { backdrop: 'static' })
      }
    }
  }
  delete(data) {
    if (confirm("Are you sure delete this record?")) {
      this._service.delete(data).subscribe(res => {
        this.getList();
        this.modalRef.hide();
      })
    }
  }
  save() {
    if (this.categoryGroup.valid) {
      if (this.actionType == "add") {
        this._service.save(this.categoryGroup.value).subscribe(res => {
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
        this._service.edit(this.categoryGroup.value).subscribe(res => {
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
