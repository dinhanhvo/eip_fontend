import { Component, OnInit } from '@angular/core';
import { ClsService } from '../../../shared/services/cls.service';
import { NhiXuanOptions } from '../../../shared/common/selectitem';
import { CLSModel } from '../../../shared/model/cls.model';
import { MessageService } from 'primeng/api';

import { ExcelUtil } from '../../../shared/utils/excel-util';


@Component({
  selector: 'app-giacls',
  templateUrl: './giacls.component.html',
  styleUrls: ['./giacls.component.scss']
})
export class GiaclsComponent implements OnInit {

  // cls: CLSModel;
  selectedCLS: CLSModel;
  newCate: boolean;
  clss: CLSModel[] = [];
  cols: any[];
  loaiCLSs = NhiXuanOptions.loaiCLSs;
  displayDialog: boolean;
  constructor(
    private clsService: ClsService,
    private messageService: MessageService
  ) { 

  }

  ngOnInit() {
    // this.cls = new CLSModel();
    this.selectedCLS = new CLSModel();
    this.clsService.getAllCLSs().subscribe(
      data => {
        console.log('getAllCategories: ', data.data);
        this.clss = data.data;
      },
      err => {
        console.log(err);
      }
    );

    this.cols = [
      { field: 'name', header: 'Tên' },
      { field: 'tentimkiem', header: 'Tên tìm kiếm' },
      { field: 'dongia', header: 'Đơn giá' },
      { field: 'description', header: 'Miêu tả' },
    ];
  }

  showDialogToAdd() {
    console.log('showDialogToAdd =========');

    this.newCate = true;
    this.selectedCLS = new CLSModel();
    this.displayDialog = true;
  }

  save() {
    console.log('-----add cate: ', this.selectedCLS);
    this.selectedCLS.type = this.selectedCLS.type['id'];
    // let cates = [...this.clss];
    if (this.newCate) {
      this.clsService.addCls(this.selectedCLS).subscribe(
        data => {
          console.log('saved ', data);
          this.clss = data.data;
          this.displayDialog = false;
          this.addSingle('success', 'Thành công', 'Đã thêm CLS');
        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Không lấy được dữ liệu');
        }
      )
    }
    else {
      this.clsService.editCls(this.selectedCLS).subscribe(
        res => {
          console.log('updated: ', res);
          this.clss = res.data;
          this.displayDialog = false;
        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Không lấy được dữ liệu');
        }
      )
    }
  }

  exportCLSExcel() {
    ExcelUtil.exportExcell('Danh sách CLS', this.clss);
  }
  delete() {
    console.log('>>>>>>> selected: ', this.selectedCLS);
    let index = this.clss.indexOf(this.selectedCLS);
    this.clsService.deleteCls(this.selectedCLS.id).subscribe(
      res => {
        console.log(res);
        this.displayDialog = false;
        this.clss = res.data;
      }
    )

    // this.cls = this.cls.filter((val, i) => i != index);
    // this.cls = null;
  }

  onRowSelect(event) {
    this.newCate = false;
    // this.cls = this.cloneCar(event.data);
    this.selectedCLS = event.data;
    console.log('>>>>>>> selected: ', this.selectedCLS);

    this.displayDialog = true;
  }

  cloneCar(c: CLSModel) {
    let cate: CLSModel;
    for (let prop in c) {
      cate[prop] = c[prop];
    }
    return cate;
  }

  addSingle(type, summary, detail) {
    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.messageService.add({ severity: type, summary: summary, detail: detail });
  }
  clearMsg() {
    this.messageService.clear();
  }

}
