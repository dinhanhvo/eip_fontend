import { Component, OnInit } from '@angular/core';
import { ExportExcelOption, NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { PatientModel } from '../../../shared/model/patient.model ';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { PhieuKhamBenhModel } from '../../../shared/model/phieukhambenh';
import { PhieunhapService } from '../../../shared/services/phieunhap.service';
import { AppStoreService, UserService } from '../../../shared';
import { DateService } from '../../../shared/services/date.util.service';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-thekho',
  templateUrl: './thekho.component.html',
  styleUrls: ['./thekho.component.scss']
})
export class ThekhoComponent implements OnInit {

  exporting = false;
  isTheKho = true;
  tondauObj: any;
  toncuoiObj: any;
  tons: any;

  khoNhaps = NhiXuanOptions.khoNhaps;
  khukbs = NhiXuanOptions.khukbs;
  khusTN: NXOption[] = [];
  khusDVY: NXOption[] = [];
  khusNS: NXOption[] = [];
  
  kho: NXOption;
  tkFrom: Date;
  tkTo: Date;

  patients: PatientModel[] = [];
  thuocs: ThuocModel[] = [];
  pkbModels: PhieuKhamBenhModel[] = [];
  colsThekho: any[];
  reportData: any[];
  exportData: any[];
  reportRow: any;

  selectedThuoc: ThuocModel;

  phieuModelTB: PhieuKhamBenhModel;
  phieuKBsphieuKBsTB: PhieuKhamBenhModel[];

  msgs: any[] = [];
  displayDialog = false;

  private userProfile: Object = {
    id: 0,
    username: '',
    name: ''
  }

  constructor(
    // private patientService: PatientService,
    private thuocService: ThuocService,
    // private phieukbService: PhieukhambenhService,
    private messageService: MessageService,
    private nhapxuatService: PhieunhapService,
    private appStore: AppStoreService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.tkFrom = DateService.newUTCDate(new Date());
    this.tkTo = this.tkFrom;
    this.initData();
    this.initForm();
    this.kho = this.khoNhaps[this.khoNhaps.length - 1];

    this.colsThekho = this.getColsByKho(this.kho.id);
    console.log('------colsThekho----', this.colsThekho);
  }

  getColsByKho(khoId: string) {
    let khus = [];
    if (khoId === 'KTN') {
      khus = [...NhiXuanOptions.khuXuatTN];
    } else if (khoId === 'DVY') {
      khus = [...NhiXuanOptions.khuXuatDVYT];
    } else if (khoId === 'KNS') {
      khus = [...NhiXuanOptions.khuXuatNS];
    }
    khus.splice(0, 1);
    let cols = [
      { field: 'ixDate', header: 'Ngày ' },
      { field: 'sct', header: 'SCT' },
      { field: 'provider', header: 'DIỄN GIẢI' },
      { field: 'sln', header: 'SỐ LƯỢNG NHẬP' },
    ];
    khus.forEach(khu => {
      cols.push({ field: khu.id, header: khu.name });
    });
    cols.push(
      { field: 'tongxuat', header: 'Tổng Xuất' },
      { field: 'ton', header: 'Tồn' }
    )
    return cols;
  }

  initForm() {
    // this.kho = this.khoNhaps[0];
    
    // this.changeKho();
    console.log('-----col the kho: ', this.colsThekho);
    
  }

  initData() {
    // this.patients = this.patientService.getAllPatients();
    this.userService.getUserProfile(this.appStore.getAuth()['username']).subscribe(
      res => {
        this.userProfile = res;
      }, err => {

      }
    );

    this.thuocService.getThuocsByType(1).subscribe(
      res => {
        this.thuocs = res.data;
      }
    )
  }

  mapDataTable(resData): any[] {
    return resData.map((row, i) => {
      let r = new Object();
      this.colsThekho.forEach((col, j) => {
        r[col.field] = row[j];
      });
      console.log('------report row: ', r);
      return r;
    });
  }

  xemDS() {
    if (this.isTheKho) {
      if (!this.validateForm()) {
        return;
      }
      this.getTon();
    } else {
      // old
      this.nhapxuatService.getThuocXuatToKhus(this.tkFrom, this.tkTo, this.kho.id).subscribe(
        res => {
          this.exportData = [...res.data];
          this.reportData = this.mapDataTable(res.data);
        },
        err => {
          
        }
      );
    }
    
  }

  exportThekhoExcel() {
    this.exporting = true;
    // ExcelUtil.exportExcell('TongHopTienThuocTheoNgay-' + this.kho.id, this.listHVTheongay);
    let opts: ExportExcelOption = new ExportExcelOption();
    opts.fileName = "Thekho_Th" + (this.tkTo.getMonth() + 1) +
      "_" + this.kho.id + "_" + this.selectedThuoc.maThuoc.toUpperCase() + ".xlsx";
    opts.tkFrom = this.tkFrom;
    opts.tkTo = this.tkTo;
    opts.objId = this.kho.name.toUpperCase();
    opts.type = 5;
    opts.sheetHeader = 'THẺ KHO - ' + this.kho.name;
    opts.sheetName = 'THEKHO'
    // if (this.exportData[0].length < 17) {
    //   this.exportData.forEach((item) => {
    //     item = item.splice(3, 0, 'sln');
    //   })
    // }
    this.nhapxuatService.exportTheKho(opts, this.exportData, this.tons).subscribe(
        res => {
          const urlDownload = 'http://smartevn.com:8083/download/' + opts.fileName;
          console.log("========================" + urlDownload + "===================================" + urlDownload);
          window.location.href = urlDownload;
          this.exporting = false;
        }, err => {
          this.exporting = false;
        }
    );    
  }

  changeThe() {
    if (this.isTheKho) {
      this.colsThekho = [
        { field: 'exDate', header: 'Ngày xuất' },
        { field: 'thuoc', header: 'Mã Thuốc' },
        { field: 'tenthuoc', header: 'Tên Thuốc' },
        { field: 'CCDV', header: 'CC DVu' },
        { field: 'CCA', header: 'CCA' },
        { field: 'CCB', header: 'CCB' },
        { field: 'KHU1', header: 'KHU 1' },
        { ifieldd: '2A', header: '2A' },
        { field: '2B', header: '2B' },
        { field: 'KHU3', header: 'KHU 3' },
        { field: 'NO', header: 'NO' },
        { field: 'DAN', header: 'DAN' },
        { field: 'YTCC', header: 'Y tế CCơn' },
        { field: 'TN', header: 'TN' },
        { field: 'tongxuat', header: 'Tổng Xuất' },
        { field: 'ton', header: 'Tồn' },
      ];
    } else {
      this.colsThekho = [
        { field: 'thuoc', header: 'Mã Thuốc' },
        { field: 'tenthuoc', header: 'Tên Thuốc' },
        { field: 'CCDV', header: 'CC DVu' },
        { field: 'CCA', header: 'CCA' },
        { field: 'CCB', header: 'CCB' },
        { field: 'KHU1', header: 'KHU 1' },
        { ifieldd: '2A', header: '2A' },
        { field: '2B', header: '2B' },
        { field: 'KHU3', header: 'KHU 3' },
        { field: 'NO', header: 'NO' },
        { field: 'DAN', header: 'DAN' },
        { field: 'YTCC', header: 'Y tế CCơn' },
        { field: 'TN', header: 'TN' },
        { field: 'tongxuat', header: 'Tổng Xuất' },
        { field: 'ton', header: 'Tồn' },
      ];
    }
  }

  validateForm() {
    let ok = true;
    
    if (!this.selectedThuoc) {
      this.addSingle('warn', 'Nhắc :', 'Chưa chọn thuốc');
      return false;
    }

    if (this.kho.id === '0') {
      this.addSingle('warn', 'Nhắc :', 'Chưa chọn kho');
      return false;
    }
    return ok;
  }

  changeKho() {
    this.colsThekho = this.getColsByKho(this.kho.id);
  }

  changeThuoc() {
    // if (this.selectedThuoc && this.kho) {
    //   this.getTon();
    // } 
  }

  getTon() {
    let from = DateService.newUTCDate(this.tkFrom);
    let to = DateService.newUTCDate(this.tkTo);
    this.nhapxuatService.getTonDauCuoiByKhoAndThuoc(this.selectedThuoc.maThuoc,
      this.kho.id, from, to).subscribe(
        res => {
          // this.tondauObj = res.data[1];
          // this.toncuoiObj = res.data[2];
          this.tons = res.data;
          
          this.nhapxuatService.getThekhos(this.tkFrom, to,
            this.selectedThuoc.maThuoc, this.kho.id).subscribe(
              res => {
                this.exportData = [...res.data];
                let tondau = this.tons[2]?this.tons[2]:0;
                this.reportData = this.mapDataTable(res.data);
                this.reportData.forEach((rd, i) => {
                  let ton = rd.ton?rd.ton:0;
                  rd.ton = tondau + ton + rd.sln - rd.tongxuat;
                  tondau = rd.ton;
                  this.exportData[i].push(rd.ton);
                });
            },
            err => {
              
            }
          );
        }
    )
    
    // this.nhapxuatService.getTonDauByKho(this.selectedThuoc.maThuoc,
    //   this.kho.id, this.tkTo).subscribe(
    //   res => {
    //       this.toncuoiObj = res.data[0];
    //     }
    // )
    // this.toncuoiObj = res.data[1];
  }

  getKhusByKho(kho) {
    let khus = [...this.khukbs];//.splice(1, this.khukbs.length);
    if (kho === 'KTN') {
      khus = [...NhiXuanOptions.khuXuatTN];//.splice(1, NhiXuanOptions.khuXuatTN.length);
    } else if (kho === 'KNS') {
      khus = [...NhiXuanOptions.khuXuatNS];//.splice(1, NhiXuanOptions.khuXuatNS.length);
    } else if (kho === 'DVY') {
      khus = [...NhiXuanOptions.khuXuatDVYT];//.splice(1, NhiXuanOptions.khuXuatDVYT.length);
    }
    return khus.splice(1, khus.length);  
  }

  onRowSelect(e) {

  }

  addSingle(type, summary, detail) {
    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.messageService.add({ severity: type, summary: summary, detail: detail });
  }
  clearMsg() {
    this.messageService.clear();
  }
}
