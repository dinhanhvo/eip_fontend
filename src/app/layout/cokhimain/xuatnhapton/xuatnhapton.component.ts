import { Component, OnInit } from '@angular/core';

import { ExportXntExcelOption, NhiXuanOptions, NXOption, XntReportRowModel, XntSummaryModel } from '../../../shared/common/selectitem';
import { PatientModel } from '../../../shared/model/patient.model ';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { PhieuKhamBenhModel } from '../../../shared/model/phieukhambenh';
import { PatientService } from '../../../shared/services/patient.service';
import { ThuocService } from '../../../shared/services/thuoc.service';
// import { PhieukhambenhService } from '../../../shared/services/phieukhambenh.service';
// import { MessageService } from 'primeng/api';
// import { PhieunhapService } from '../../../shared/services/phieunhap.service';
import { AppStoreService, UserService } from '../../../shared';
// import { ClsService } from '../../../shared/services/cls.service';
import { RecordeImportExportService } from '../../../shared/services/record-import-export.service';
import { NhiXuanUtil } from '../../../shared/utils/nhixuan_utils';
import { DateService } from '../../../shared/services/date.util.service';

@Component({
  selector: 'app-xuatnhapton',
  templateUrl: './xuatnhapton.component.html',
  styleUrls: ['./xuatnhapton.component.scss']
})
export class XuatnhaptonComponent implements OnInit {
  // tondau: boolean = true;
  // showsCheck: boolean[]; // tondau, nhap, xuat, toncuoi
  // nhap: boolean = true;
  // xuat: boolean = true;
  // toncuoi: boolean = true;
  GD = '';
  KT = '';
  YT = '';
  specificDialog = false;
  searching = false;

  khoNhaps = NhiXuanOptions.khoNhaps;
  kho: NXOption;
  // tkFrom: Date;
  // tkTo: Date;
  // allThuoc: boolean;

  patients: PatientModel[] = [];
  thuocs: ThuocModel[] = [];
  cols: any[];
  
  dmCols: any[];
  tondauCols: any[];
  nhapCols: any[];
  xuatCols: any[];
  toncuoiCols: any[];

  reportData: XntReportRowModel[];
  reportDataBE: any[];
  exportDataBE: any[] = [];// to store data from BE side
  summaryData: XntSummaryModel[];
  dmThuocs: any[] = [];
  tds: any[] = [];
  nhaps: any[];
  xuats: any[];
  tcs: any[];

  exportXntExcelOption: ExportXntExcelOption;

  reportRow: any;

  phieuModelTB: PhieuKhamBenhModel;
  phieuKBsphieuKBsTB: PhieuKhamBenhModel[];

  msgs: any[] = [];
  displayDialog = false;
  exporting = false;

  private userProfile: Object = {
    id: 0,
    username: '',
    name: ''
  }

  constructor(
    private patientService: PatientService,
    private thuocService: ThuocService,
    private recordService: RecordeImportExportService,
    // private messageService: MessageService,
    // private nhapxuatService: PhieunhapService,
    private appStore: AppStoreService,
    private userService: UserService,
  ) { 
    
  }

  ngOnInit() {
    // this.tkFrom =  new Date();//DateService.newUTCDate(new Date());
    // this.tkTo =  new Date();//DateService.newUTCDate(new Date());
    this.initData();
    this.initForm();
  }

  changeKho() {
    this.exportXntExcelOption.objId = this.kho.id;
  }
  
  changeShow(val) {
    console.log('-------show-----', val);
    this.cols = [];
    this.pushCols(this.cols, this.dmCols);
    this.reportData = [];
    this.pushCols(this.reportData, this.dmThuocs);

    if (this.exportXntExcelOption.tondau) {
      this.pushCols(this.cols, this.tondauCols);
      // this.pushCols(this.reportData, this.tds);
      this.tds.forEach((td, i) => {
        let row = { ...this.reportData[i], ...td };
        this.reportData[i] = {...row} ;
      })
    }
    if (this.exportXntExcelOption.nhap) {
      this.pushCols(this.cols, this.nhapCols);
      this.nhaps.forEach((td, i) => {
        let row = { ...this.reportData[i], ...td };
        this.reportData[i] = {...row} ;
      })
    }
    if (this.exportXntExcelOption.xuat) {
      this.pushCols(this.cols, this.xuatCols);
      this.xuats.forEach((td, i) => {
        let row = { ...this.reportData[i], ...td };
        this.reportData[i] = {...row} ;
      })
    }
    if (this.exportXntExcelOption.toncuoi) {
      this.pushCols(this.cols, this.toncuoiCols);
      this.tcs.forEach((td, i) => {
        let row = { ...this.reportData[i], ...td };
        this.reportData[i] = {...row} ;
      })
    }
  }

  initForm() {
    this.exportXntExcelOption = new ExportXntExcelOption();
    this.exporting = false;

    this.initCols();
  }

  initCols() {
    this.cols = [
      { field: 'thuoc', header: 'Tên thuốc' },
      { field: 'unit', header: 'ĐV' },
      { field: 'type', header: 'Loại' },
      { field: 'mathuoc', header: 'Mã' },
    ];
    this.dmCols = [
      { field: 'thuoc', header: 'Tên thuốc' },
      { field: 'unit', header: 'ĐV' },
      { field: 'type', header: 'Loại' },
      { field: 'mathuoc', header: 'Mã' },
    ];
    this.tondauCols = [
      { field: 'tondauky', header: 'Tồn đầu' },
      { field: 'taxplus', header: 'Giá' },
      { field: 'ttd', header: 'Thành Tiền' }
    ]
    this.nhapCols = [
      { field: 'sln', header: 'Nhập' },
      { field: 'dgn', header: 'Giá' },
      { field: 'ttn', header: 'Thành Tiền' }
    ]
    this.xuatCols = [
      { field: 'slx', header: 'Xuất' },
      { field: 'dgx', header: 'Giá' },
      { field: 'ttx', header: 'Thành Tiền' }
    ]
    this.toncuoiCols = [
      { field: 'toncuoi', header: 'Tồn cuối' },
      { field: 'dgc', header: 'Giá' },
      { field: 'ttc', header: 'Thành tiền' }
    ]
    this.pushCols(this.cols, this.tondauCols);
    this.pushCols(this.cols, this.nhapCols);
    this.pushCols(this.cols, this.xuatCols);
    this.pushCols(this.cols, this.toncuoiCols);
    console.log('------------init cols: ', this.cols);
    
  }
  pushCols(cols: any[], subCols: any[]) {
    subCols.forEach(c => {
      cols.push(c);
    });
  }

  // pushTonData(data: any[], subdata: any[]) {
  //   subdata.forEach(s)
  // }

  initData() {
    this.kho = this.khoNhaps[3];
    this.patients = [];
    this.thuocService.getThuocsByType(1).subscribe(
      res => {
        this.thuocs = res.data;
      },
      err => {
        console.log(err);
      }
    );

    this.patients = this.patientService.getAllPatients();

    this.userService.getUserProfile(this.appStore.getAuth()['username']).subscribe(
      res => {
        this.userProfile = res;
      }, err => {

      }
    );
  }

  mapSubDataTable(resData, cols: any[], from: number, to: number){
    let tdss = resData.map(row => {
      let td = row.slice(from, to);
      return td;
    })
    let tds = NhiXuanUtil.mapDataTable(tdss, cols);
    return tds;
  }

  mapExportDataTable(resData, cols: any[], from: number, num: number){
    resData.forEach(row => {
      row.splice(from, num);
    })
    // let tds = NhiXuanUtil.mapDataTable(tdss, cols);
    // return tdss;
  }

  xemDS() {
    this.searching = true;
    // let from = DateService.newUTCDate(this.tkFrom);
    // let to = DateService.newUTCDate(this.tkTo);
    this.recordService.getXuatNhapTonByKho(this.kho.id, this.exportXntExcelOption.tkFrom,
      this.exportXntExcelOption.tkTo, this.exportXntExcelOption.allThuoc).subscribe(
        res => {
          const resData = res.data;
          this.reportDataBE = resData.data;
          this.summaryData = resData.summary;
          this.reportData = NhiXuanUtil.mapDataTable(resData.data, this.cols);
          // this.reportDataBK = [...this.reportData];
          console.log('-------XntDtos: ', resData.summary);
          console.log('-------data: ', resData.data);
            
          this.tcs = this.mapSubDataTable(this.reportDataBE, this.toncuoiCols, 13, 16);
          this.xuats = this.mapSubDataTable(this.reportDataBE, this.xuatCols, 10, 13);
          this.nhaps = this.mapSubDataTable(this.reportDataBE, this.nhapCols, 7, 10);
          this.tds = this.mapSubDataTable(this.reportDataBE, this.tondauCols, 4, 7);
          this.dmThuocs = this.mapSubDataTable(this.reportDataBE, this.dmCols, 0, 4);
          this.searching = false;
      },
      err => {
        this.searching = false;
      }
    );
  }

  exportXNTExcel() {
    this.exporting = true;
    let fileName: string = (this.exportXntExcelOption.tkTo.getMonth() + 1) + '.xlsx';
    console.log('------------- data at reportDataBE: ', this.reportDataBE);
    this.exportXntExcelOption.objId = this.kho.id;
    
    this.exportXntExcelOption.tkFrom = DateService.newUTCDate(this.exportXntExcelOption.tkFrom);
    this.exportXntExcelOption.tkTo = DateService.newUTCDate(this.exportXntExcelOption.tkTo);
    this.exportDataBE = [];
    this.exportDataBE = [...this.dmThuocs];
    let dataBE = [];
    if (this.exportXntExcelOption.nhap && this.exportXntExcelOption.xuat) {
      this.exportXntExcelOption.type = 3;
      fileName = 'XNT-Th' + fileName;
      dataBE = [...this.reportDataBE];
      // dataBE.forEach(row => {
      //   row.splice(2, 2); // remove columns: loai, unit 
      // })


    } else if (this.exportXntExcelOption.nhap) {
      this.exportXntExcelOption.type = 1;
      dataBE = this.reportDataBE.filter(row => {
        return row[7] != null && row[7] > 0;
      })
      dataBE.forEach(row => {
        row.splice(10, 6);
        row.splice(2, 5);
      })
      // this.exportDataBE.concat(this.tds);
      fileName = 'Nhap-th' + fileName;
    } else if (this.exportXntExcelOption.xuat) {
      this.exportXntExcelOption.type = 2;
      // this.exportDataBE.concat(this.tcs)
      dataBE = this.reportDataBE.filter(row => {
        return row[10] != null && row[10] > 0;
      })
      dataBE.forEach(row => {
        row.splice(13, 3);
        row.splice(2, 8);
      })
      fileName = 'Xuat-th' + fileName;
    } else {
    }
    this.exportXntExcelOption.fileName = fileName;
    this.recordService.writeXNTFile(this.exportXntExcelOption, dataBE, this.summaryData).subscribe(
      res => {
        console.log('write excell success');
        let fname = res.data;
        const urlDownload = 'http://smartevn.com:8083/download/' + fileName;
        // const urlDownload = 'D:\\sources\\AD_TMP\\download\\' + fileName;

        // console.log("========================" + urlDownload + "===================================" + fname);
        this.exporting = false;
        window.location.href = urlDownload;

      },
      err => {
        this.exporting = false;
      }
    );
  }

  onRowSelect(e) {

  }

  onDialogBtnCancel() {

  }

  onDialogBtnOK() {

  }
}
