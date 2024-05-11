import { Component, OnInit } from '@angular/core';
import { NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryModel } from '../../../shared/model/category.model';
import { SelectItem } from 'primeng/api';
import { RecordeImportExportService } from '../../../shared/services/record-import-export.service';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { NhiXuanUtil } from '../../../shared/utils/nhixuan_utils';
import { MilkCollect } from '../../../shared/model/MilkCollect';
import { WeighService } from '../../../shared/services/weigh.service';
import { MilkCollectService } from '../../../shared/services/milk-collect.service';
import { Weigh } from '../../../shared/model/user';
import { LoginService } from '../../../shared';

@Component({
  selector: 'app-thuoc-report',
  templateUrl: './thuoc-report.component.html',
  styleUrls: ['./thuoc-report.component.scss']
})
export class ThuocReportComponent implements OnInit {

  cols: any[];
  message: MilkCollect = null;
  messages: MilkCollect[] = [];
  weighs: Weigh[] = [];
  selectedWeigh: Weigh;
  dateProduce: Date = new Date();
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
    private logginService: LoginService,
    private thuocService: ThuocService,
    private categoryService: CategoryService,
    private recordService: RecordeImportExportService,
    private weighService: WeighService,
    private milkCollectService: MilkCollectService
  ) {
   }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'serialWeigher', header: 'Serial_Weigher' },
      { field: 'codeSeller', header: 'Code_Seller' },
      { field: 'nameSeller', header: 'Name_Seller' },
      // { field: 'imported_at', header: 'imported_at' },
      { field: 'codeTankSeller', header: 'Code_Tank_Seller' },
      { field: 'tankTareWeight', header: 'Tank_Tare_Weight' },
      { field: 'tankGrossWeight', header: 'Tank_Gross_Weight' },
      { field: 'tankNetWeght', header: 'Tank_Net_Weight' },
      { field: 'mqttStatus', header: 'Mqtt_Status' },
      // { field: 'type', header: 'created' },
      { field: 'createdAt', header: 'createdAt' }
    ];
    // this.getWeighsByUser(this.logginService.getCurrentUser().id);

    // this.selectedKho = this.khoNhaps[0];
    // this.selectedType = this.thuocTypes[0];
    // this.colsByType = [
    //   { field: 'loai', header: 'Thuốc' },
    //   { field: 'soluong', header: 'Số lượng' },
    //   { field: 'thanhtien', header: 'Thành tiền' },
    // ];
    //  thuoc, dongia, solo, shd, sum(soluong) sln, sum(soluongton) slton 
    // this.colsByKho = [
    //   { field: 'maThuoc', header: 'Mã thuốc' },
    //   { field: 'thuoc', header: 'Thuốc' },
    //   { field: 'unit', header: 'Đơn vị' },
    //   { field: 'dongia', header: 'Đơn giá' },
    //   { field: 'solo', header: 'Lô' },
    //   { field: 'shd', header: 'Số HĐ' },
    //   { field: 'sln', header: 'Số lượng nhập' },
    //   { field: 'slton', header: 'Tồn' },
    //   { field: 'thanhtien', header: 'Thành tiền' },
    // ];
    // pkb.mabenhnhan, pkb.fullname, rie.thuoc, 
    // t.tenthuoc, t.unit, sum(rie.soluong) tong
    // this.colsPatientThuoc = [
    //   { field: 'mabenhnhan', header: 'Mã' },
    //   { field: 'fullname', header: 'Tên' },
    //   { field: 'thuoc', header: 'Mã thuốc' },
    //   { field: 'tenthuoc', header: 'Tên thuốc' },
    //   { field: 'unit', header: 'Đơn vị' },
    //   { field: 'tong', header: 'Số lượng' },
    //   // { field: 'thanhtien', header: 'Thành tiền' },
    // ];
    // this.initCategories();
    // this.thuocService.getThuocsByType(1).subscribe(
    //   res => {
    //     this.thuocs = res.data;
    //   },
    //   err => {
    //     console.log(err);
    //     this.searching = false;
    //   }
    // );

    this.initCan()
  }

  initCan() {
    this.categories = []
    this.weighService.getAllWeighs().subscribe(
        data => {
          console.log('getAllCan: ', data);
          this.weighs = data;
          // this.categories = data.data;
          this.weighs.forEach(element => {
            if (element.serialWeigher) {
              const e = { label: element.serialWeigher, value: element.id };
              this.categories.push(e);
            }
          });
          this.selectedWeigh = this.weighs[0];
          console.log(' nhom categories: ', this.categories);
        },
        err => {
          console.log(err);
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

  xemDuLieu() {
    if (this.selectedWeigh != undefined && this.selectedWeigh.serialWeigher) {
      this.milkCollectService.getMilkCollectByCan(this.selectedWeigh.serialWeigher, this.tkFrom, this.tkTo).subscribe(
          data => {
            this.messages = data
          }, error => {

          }
      )

    } else {

      this.milkCollectService.getMilkCollectByDate(this.tkFrom, this.tkTo).subscribe(
          data => {
            this.messages = data
          }, error => {

          }
      )
    }

    // this.milkCollect.getWeighsByUser().subscribe(
    //   res => {
    //
    //   },
    //   error => {
    //
    //   }
    // );
    //
  }
  getWeighsByUser(id) {
    this.weighService.getWeighsByUser(id).subscribe(
      res => {
        this.weighs = res;
      },
      error => {

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

  changWeigh() {
    // this.milkCollectService.getMilkCollectByCan(this.selectedWeigh.serialWeigher, this.tkFrom, this.tkTo).subscribe(
    //   res => {
    //     this.messages = res.data;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    console.log('------this.selectedWeigh.serialWeigher: ', this.selectedWeigh.serialWeigher);
  }

  exportBNExcel() {}

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
