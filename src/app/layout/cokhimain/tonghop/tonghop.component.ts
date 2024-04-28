import { Component, OnInit } from '@angular/core';
import { NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { PatientModel } from '../../../shared/model/patient.model ';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { PhieuKhamBenhModel } from '../../../shared/model/phieukhambenh';
import { PatientService } from '../../../shared/services/patient.service';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { PhieukhambenhService } from '../../../shared/services/phieukhambenh.service';
// import { MessageService } from 'primeng/api';
// import { PhieunhapService } from '../../../shared/services/phieunhap.service';
import { AppStoreService, UserService } from '../../../shared';
import { ClsService } from '../../../shared/services/cls.service';
import { DateService } from '../../../shared/services/date.util.service';
import { RecordeImportExportService } from '../../../shared/services/record-import-export.service';
import { ExcelUtil } from '../../../shared/utils/excel-util';

@Component({
  selector: 'app-tonghop',
  templateUrl: './tonghop.component.html',
  styleUrls: ['./tonghop.component.scss']
})
export class TonghopComponent implements OnInit {

  isXnt: boolean = true;
  totalTonDau = 0;
  totalNhap = 0;
  totalXuat = 0;
  totalTonCuoi = 0;
  khoNhaps = NhiXuanOptions.khoNhaps;
  kho: NXOption;
  tkFrom: Date;
  tkTo: Date;

  patients: PatientModel[] = [];
  thuocs: ThuocModel[] = [];
  pkbModels: PhieuKhamBenhModel[] = [];
  cols: any[];
  reportData: any[];
  reportRow: any;

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
    private patientService: PatientService,
    private thuocService: ThuocService,
    private phieukbService: PhieukhambenhService,
    private recordService: RecordeImportExportService,
    // private messageService: MessageService,
    // private nhapxuatService: PhieunhapService,
    private appStore: AppStoreService,
    private userService: UserService,
    // private clsService: ClsService
  ) { }

  ngOnInit() {
    this.tkFrom = DateService.newUTCDate(new Date());
    this.tkTo = this.tkFrom;
    this.initData();
    this.initForm();
  }

  initForm() {
    this.cols = [
      // { field: 'kho', header: 'KHO' },
      { field: 'loai', header: 'TÊN DANH MỤC' },
      { field: 'tondau', header: 'TỒN ĐẦU' },
      { field: 'nhap', header: 'NHẬP' },
      { field: 'xuat', header: 'XUẤT' },
      { field: 'toncuoiky', header: 'TỒN CUỐI KỲ' },
    ];
}

  initData() {
    this.kho = this.khoNhaps[0];
    // this.phieukbService.getBCTonghop(this.kho.id, this.tkFrom, this.tkTo).subscribe(
    //   res => {
    //     this.reportData = this.mapDataTable(res.data);
    //   }, 
    //   err => {
        
    //   }
    // );
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

    this.phieukbService.getAllPhieukhambenhs().subscribe(
      res => {
        this.pkbModels = res.data;
        // this.cloneDataTable();
      },
      err => {
        console.log(err);
      }
    );

    this.userService.getUserProfile(this.appStore.getAuth()['username']).subscribe(
      res => {
        this.userProfile = res;
      }, err => {

      }
    );
  }

  mapDataTable(resData): any[] {
    return resData.map((row, i) => {
      let r = new Object();
      this.cols.forEach((col, j) => {
        r[col.field] = row[j];
        // if (col.field === 'kho') {
        //   let kho = JSON.parse(r[col.field]).name;
        //   r[col.field] = kho;
        // }
      });
      console.log('------report row: ', r);
      return r;
    });
  }

  xemDS() {
    this.recordService.getBCTonghop(this.kho.id, this.tkFrom, this.tkTo).subscribe(
      res => {
        this.reportData = this.mapDataTable(res.data);
        this.totalXuat = 0;
        this.totalNhap = 0;
        this.totalTonDau = 0;
        this.totalTonCuoi = 0;
        this.reportData.forEach(r => {
          console.log('------r: ', r);
          
          this.totalTonDau = this.totalTonDau +   r.tondau;
          this.totalNhap = this.totalNhap + r.nhap;
          this.totalTonCuoi = this.totalTonCuoi + r.toncuoiky;
          this.totalXuat = this.totalXuat + r.xuat;
        });

      },
      err => {
      }
    );
    // if (this.isXnt) {
    // } else {
    //   this.phieukbService.getBCXuatTheoLoaiThuoc(this.kho.id, this.tkFrom, this.tkTo).subscribe(
    //     res => {
    //       this.reportData = this.mapDataTable(res.data);
    //       this.total = 0;
    //       this.reportData.forEach(r => {
    //         this.total = this.total + r.tongtien;
    //       })
    //     },
    //     err => {
          
    //     }
    //   );
    // }
  }

  exportExcel() {
    ExcelUtil.exportExcell('BÁO CÁO TỔNG HỢP', this.reportData);
  }

  changeXnt() {
    this.cols = [
      // { field: 'kho', header: 'Kho' },
      { field: 'loai', header: 'TÊN DANH MỤC' },
      { field: 'tondau', header: 'TỒN ĐẦU' },
      { field: 'nhap', header: 'NHẬP' },
      { field: 'xuat', header: 'XUẤT' },
      { field: 'toncuoiky', header: 'TỒN CUỐI KỲ' },
    ];
  // if (this.isXnt) {
  // } else {
  //     this.cols = [
  //       { field: 'kho', header: 'Kho' },
  //       // { field: 'khu_name', header: 'Tồn đầu' },
  //       { field: 'tienthuoc', header: 'Tiền Thuốc' },
  //       { field: 'tiensa', header: 'Tiền Siêu Âm' },
  //       { field: 'tienxq', header: 'Tiền XQuang' },
  //       { field: 'tienxn', header: 'Tiền Xét Nghiệm' },
  //       { field: 'tiendt', header: 'Tiền Điện Tim:' },
  //       { field: 'tongtien', header: 'Tổng' },
  //     ];
  //   }
  }

  onRowSelect(e) {

  }

}
