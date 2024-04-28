import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../shared/services/patient.service';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { PhieukhambenhService } from '../../../shared/services/phieukhambenh.service';
import { MessageService } from 'primeng/api';
import { PhieunhapService } from '../../../shared/services/phieunhap.service';
import { AppStoreService, UserService } from '../../../shared';
import { ClsService } from '../../../shared/services/cls.service';
import { PatientModel } from '../../../shared/model/patient.model ';
// import { ThuocComponent } from '../thuoc/thuoc.component';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { PhieuKhamBenhModel } from '../../../shared/model/phieukhambenh';
import { NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { DateService } from '../../../shared/services/date.util.service';
import { NhiXuanUtil } from '../../../shared/utils/nhixuan_utils';

@Component({
  selector: 'app-ketoanthongke',
  templateUrl: './ketoanthongke.component.html',
  styleUrls: ['./ketoanthongke.component.scss']
})
export class KetoanthongkeComponent implements OnInit {

  titleTM = 'BẢNG THUYẾT MINH CHI TIẾT TIỀN THUỐC';
  // isKhu = true;
  khoNhaps = NhiXuanOptions.khoNhaps;
  kho: NXOption;

  khukbs = NhiXuanOptions.khukbs;
  khu: NXOption;
  tkFrom: Date;
  tkTo: Date;

  patients: PatientModel[] = [];
  thuocs: ThuocModel[] = [];
  pkbModels: PhieuKhamBenhModel[] = [];
  cols: any[];
  colsTM: any[];
  colsKho: any[];
  reportData: any[];
  reportDataKho: any[];
  reportDataTM: any[];
  reportRow: any;
  reportRowTM: any;
  totalKho: any[];

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
    // private messageService: MessageService,
    // private nhapxuatService: PhieunhapService,
    private appStore: AppStoreService,
    private userService: UserService,
    // private clsService: ClsService
  ) { }

  ngOnInit() {
    this.tkFrom = DateService.newUTCDate(new Date());
    this.tkTo = this.tkFrom;
    this.kho = this.khoNhaps[0];
    this.initData();
    this.initForm();
  }

  initForm() {
    this.cols = [
      // { field: 'id', header: 'ID' },
      // { field: 'mabenhnhan', header: 'Mã bệnh nhân' },
      // { field: 'fullname', header: 'Tên bệnh nhân' },
      { field: 'khu_name', header: 'Khu' },
      { field: 'kho', header: 'Kho' },
      { field: 'tienthuoc', header: 'Tiền thuốc' },
      { field: 'tien_sa', header: 'Tiền Siêu âm' },
      { field: 'tien_xq', header: 'Tiền Xquang' },
      { field: 'tien_xn', header: 'Tiền Xét nghiệm' },
      { field: 'tien_dt', header: 'Tiền Điện tim' },
      { field: 'tongtien', header: 'Tổng:' },
      // { field: 'donthuocjs', header: 'Đơn thuốc' },
      // { field: 'others', header: 'KHác' }
    ];
    this.colsKho = [
      { field: 'kho', header: 'Kho' },
      { field: 'tienthuoc', header: 'Tiền thuốc' },
      { field: 'tien_sa', header: 'Tiền Siêu âm' },
      { field: 'tien_xq', header: 'Tiền Xquang' },
      { field: 'tien_xn', header: 'Tiền Xét nghiệm' },
      { field: 'tien_dt', header: 'Tiền Điện tim' },
      { field: 'tongtien', header: 'Tổng:' },
    ];

    this.colsTM = [
      { field: 'tenkhu', header: 'Tên Khu' },
      { field: 'danhmuc', header: 'Nhóm Danh Mục' },
      { field: 'tongtien', header: 'Tiền thu vào' },
      { field: 'ghichu', header: 'Ghi Chú' },
    ];
  }

  initData() {
    this.khu = this.khukbs[0];
    // this.phieukbService.getThongkeKeToanByKhu(this.khu.id, this.tkFrom, this.tkTo).subscribe(
    //   res => {
    //     this.reportData = NhiXuanUtil.mapDataTable(res.data);
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

  // mapDataTable(resData, cols: any[]): any[] {
  //   return resData.map((row, i) => {
  //     let r = new Object();
  //     cols.forEach((col, j) => {
  //       r[col.field] = row[j];
  //       if (col.field === 'kho') {
  //         let kho = JSON.parse(r[col.field]);
  //         r[col.field] = kho.name;
  //       }
  //     });
  //     console.log('------report row: ', r);
  //     return r;
  //   });
  // }

  xemDS() {
    // if (this.isKhu) {
      this.phieukbService.getThongkeKeToanByKhu(this.khu.id, this.tkFrom, this.tkTo).subscribe(
        res => {
          let reportData = NhiXuanUtil.mapDataTable(res.data, this.cols);
          if (this.kho.id == '0') {
            this.reportData = reportData;
            
          } else {
            this.reportData = reportData.filter(row => {
              let kho = JSON.parse(row.kho);
              if (kho.id == this.kho.id) {
                return row;
              }
            })
          }
          this.reportData.forEach(row => {
            let kho = JSON.parse(row.kho);
            row.kho = kho.name;
          })
        },
        err => {
          
        }
      );
    // } else {
      this.phieukbService.getThongkeKeToanByKho(this.kho.id, this.tkFrom, this.tkTo).subscribe(
        res => {
          this.reportDataKho = NhiXuanUtil.mapDataTable(res.data, this.colsKho);
          this.reportDataKho.forEach(row => {
            try {
              let kho = JSON.parse(row.kho);
              row.kho = kho.name;
            } catch (error) {
              
            }
          })
        },
        err => {
          
        }
      );
    // }
  }

  changeKho() {
    // this.reportDataKho = this.reportDataKho.filter(row => row.id == this.kho.id);
    this.reportData = [];
    this.phieukbService.getThongkeKeToanByKhu(this.khu.id, this.tkFrom, this.tkTo).subscribe(
      res => {
        let reportData = NhiXuanUtil.mapDataTable(res.data, this.cols);
        if (this.kho.id == '0') {
          this.reportData = reportData;
        } else {
          this.reportData = reportData.filter(row => {
            let kho = JSON.parse(row.kho);
            if (kho.id == this.kho.id) {
              return row;
            }
          })
        }
        this.reportData.forEach(row => {
          let kho = JSON.parse(row.kho);
          row.kho = kho.name;
        })
      },
      err => {
        
      }
    );
  }

  onRowSelect(e) {

  }
  onRowSelectTM(e) {

  }

  exportTMTTExcel() {

  }
}
