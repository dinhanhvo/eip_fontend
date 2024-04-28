import { Component, OnInit } from '@angular/core';
import { NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryModel } from '../../../shared/model/category.model';
import { SelectItem } from 'primeng/api';
import { RecordeImportExportService } from '../../../shared/services/record-import-export.service';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { NhiXuanUtil } from '../../../shared/utils/nhixuan_utils';

@Component({
  selector: 'app-thuoc-report',
  templateUrl: './thuoc-report.component.html',
  styleUrls: ['./thuoc-report.component.scss']
})
export class ThuocReportComponent implements OnInit {

  msgs: any[] = [];
  searching = false;
  colsByType: any[];
  colsByKho: any[];
  colsPatientThuoc: any[];
  colsByGroup: any[];
  tkFrom: Date = new Date();
  tkTo: Date = new Date();
  tkTable: any[] = [];
  tkTonTable: any[] = [];
  tkPatientTable: any[] = [];
  thuocTypes = NhiXuanOptions.thuocTypes;
  selectedType: any;

  categorys: CategoryModel[] = [];
  categories: SelectItem[] = [];
  selectedGroup: CategoryModel;

  listLo: String[] = [];
  khoNhaps = NhiXuanOptions.khoNhaps;
  selectedKho: NXOption;

  thuocs: ThuocModel[] = [];
  selectedThuoc: ThuocModel;

  constructor(
    private thuocService: ThuocService,
    private categoryService: CategoryService,
    private recordService: RecordeImportExportService
  ) {
   }

  ngOnInit() {
    this.selectedKho = this.khoNhaps[0];
    this.selectedType = this.thuocTypes[0];
    this.colsByType = [
      { field: 'loai', header: 'Thuốc' },
      { field: 'soluong', header: 'Số lượng' },
      { field: 'thanhtien', header: 'Thành tiền' },
    ];
    //  thuoc, dongia, solo, shd, sum(soluong) sln, sum(soluongton) slton 
    this.colsByKho = [
      { field: 'maThuoc', header: 'Mã thuốc' },
      { field: 'thuoc', header: 'Thuốc' },
      { field: 'unit', header: 'Đơn vị' },
      { field: 'dongia', header: 'Đơn giá' },
      { field: 'solo', header: 'Lô' },
      { field: 'shd', header: 'Số HĐ' },
      { field: 'sln', header: 'Số lượng nhập' },
      { field: 'slton', header: 'Tồn' },
      { field: 'thanhtien', header: 'Thành tiền' },
    ];
    // pkb.mabenhnhan, pkb.fullname, rie.thuoc, 
    // t.tenthuoc, t.unit, sum(rie.soluong) tong
    this.colsPatientThuoc = [
      { field: 'mabenhnhan', header: 'Mã' },
      { field: 'fullname', header: 'Tên' },
      { field: 'thuoc', header: 'Mã thuốc' },
      { field: 'tenthuoc', header: 'Tên thuốc' },
      { field: 'unit', header: 'Đơn vị' },
      { field: 'tong', header: 'Số lượng' },
      // { field: 'thanhtien', header: 'Thành tiền' },
    ];
    // this.initCategories();
    this.thuocService.getThuocsByType(1).subscribe(
      res => {
        this.thuocs = res.data;
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );
  }

  initCategories() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        console.log('getAllCategories: ', data);
        this.categorys = data.data;
        // this.categories = data.data;
        this.categorys.forEach(element => {
          const e = { label: element.name, value: element.id };
          this.categories.push(e);
        });
        this.selectedGroup = this.categorys[0];
        // console.log(' nhom thuoc: ', this.categories);
      },
      err => {
        console.log(err);
      }
    );
    
  }

  xemDS() {
    this.recordService.getBCTonghopLoaiThuoc(this.tkFrom, this.tkTo, this.selectedKho.id).subscribe(
      res => {
        // this.tkTable = res.data;
        this.tkTable =  NhiXuanUtil.mapDataTable(res.data, this.colsByType);
      },
      err => {
        
      }
    );
  }

  xemTon() {
    this.recordService.getAllThuocTonByKho(this.selectedKho.id, this.selectedType.value).subscribe(
      res => {
        // this.tkTonTable = this.mapTonDataTable(res.data);
        this.tkTonTable = NhiXuanUtil.mapDataTable(res.data, this.colsByKho);
      },
      err => {
        
      }
    );
  }

  xemPatientThuoc() {
    this.recordService.getPatientUseThuocByKho(this.selectedThuoc.maThuoc, this.selectedKho.id, this.tkFrom, this.tkTo).subscribe(
      res => {
        this.tkPatientTable =  NhiXuanUtil.mapDataTable(res.data, this.colsPatientThuoc);
      },
      err => {
        
      }
    );
  }

  // mapDataTable(resData): any[] {
  //   return resData.map((row, i) => {
  //     let r = new Object();
  //     this.colsByType.forEach((col, j) => {
  //       r[col.field] = row[j];
  //     });
  //     console.log('------report row: ', r);
  //     return r;
  //   });
  // }

  // mapTonDataTable(resData): any[] {
  //   return resData.map((row, i) => {
  //     let r = new Object();
  //     this.colsByKho.forEach((col, j) => {
  //       r[col.field] = row[j];
  //     });
  //     console.log('------report row: ', r);
  //     return r;
  //   });
  // }

  // mapPatientThuocTable(resData): any[] {
  //   return resData.map((row, i) => {
  //     let r = new Object();
  //     this.colsByKho.forEach((col, j) => {
  //       r[col.field] = row[j];
  //     });
  //     console.log('------report row: ', r);
  //     return r;
  //   });
  // }

  changeGroup() {

  }

  changeType() {
    
  }

  changeThuoc() {
    
  }

  changKho() {
    this.thuocService.getThuocsByTypeAndKho(1, this.selectedKho.id).subscribe(
      res => {
        this.thuocs = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
