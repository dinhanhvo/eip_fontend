import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExportExcelOption, NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { PatientService } from '../../../shared/services/patient.service';
import { PatientModel } from '../../../shared/model/patient.model ';
import { ScriptService } from '../../../shared/services/script.service';
import { PhieuKhamBenh, PhieuKhamBenhModel, CLS } from '../../../shared/model/phieukhambenh';
import { PhieukhambenhService } from '../../../shared/services/phieukhambenh.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { DateService} from '../../../shared/services/date.util.service';
import { RecordeImportExportService } from '../../../shared/services/record-import-export.service';
import { NhiXuanUtil } from '../../../shared/utils/nhixuan_utils';
import { ExcelUtil } from '../../../shared/utils/excel-util';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.scss']
})
export class ThongkeComponent implements OnInit {

  msgs: any[] = [];
  searching = false;
  exporting = false;

  exportExcelOption: ExportExcelOption;
  dataBE: any[] = [];
  cols: any[];
  theodoiFrom: Date = new Date();
  theodoiTo: Date = new Date();
  lanhthuocFrom: Date = new Date();
  lanhthuocTo: Date = new Date();
  thuocphatFrom: Date = new Date();
  loaiThuocFrom: Date = new Date();
  loaithuocTo: Date = new Date();
  linhThuocNgay: Date = new Date();
  thuocphatTo: Date = new Date();
  phieukhambenh: PhieuKhamBenh;
  phieuModel: PhieuKhamBenhModel;
  phieuModelTB: PhieuKhamBenhModel;
  phieuKBs: PhieuKhamBenhModel[];
  phieuYCKBs: PhieuKhamBenhModel[];
  phieuKBbyBNs: PhieuKhamBenhModel[];
  phieuKB1BNs: PhieuKhamBenhModel[];

  types = NhiXuanOptions.thuocTypes;
  selectedType: number;//{};//NXOption;// = { label: 'Loai 1', value: 1 };
  thuocs: ThuocModel[] = []; // store data from database
  patients: PatientModel[] = [];
  selectedPatient: PatientModel = null;
  khukbs = NhiXuanOptions.khukbs;
  phatthuocKhu: NXOption;
  lanhthuocKhu: NXOption;
  lanhthuocQueryCaption: string;
  phatthuocQueryCaption: string;
  theodoiQueryCaption: string;
  
  totalTien = 0;
  showMaBN = true;
  tkSetCol: Set<any>;
  tkSetRow: Set<any>; // = new Set(['sang', 'chieu', 'toi', 'songy', 'mabenhnhan', 'patient', 'namsinh', 'khu', 'thuoc']);
  tkcol: any[] = [];
  tkPhatThuocCols: any[] = [];
  tkPhatThuocRows: any[] = [];
  tkLinhThuocHangNgayCols: any[] = [];
  tkLinhThuocHangNgayRows: any[] = [];
  tkTheoDoiCols: any[] = [];
  tkTheoDoiRows: any[] = [];
  tkTheoDoiTTCols: any[] = [];
  tkTheoDoiTTRows: any[] = [];
  listYCRow: any[] = [];
  listYCcols: any[] = [];
  listYCLoaiRows: any[] = [];

  selectedThuoc: ThuocModel;
  listThuocs: any[] = [];

  constructor(
    private scriptService: ScriptService,
    private patientService: PatientService,
    private thuocService: ThuocService,
    private phieukbService: PhieukhambenhService,
    private messageService: MessageService,
    private recordService: RecordeImportExportService
  ) {

    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  ngOnInit() {
    this.searching = true;
    this.thuocService.getAllThuocs().subscribe(
      res => {
        this.thuocs = res.data;
        this.searching = false;
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );

    this.patients = this.patientService.getAllPatients();
    this.selectedPatient = new PatientModel();

    this.theodoiFrom = DateService.newUTCDate(new Date());
    this.theodoiTo  = DateService.newUTCDate(new Date());
    this.lanhthuocFrom = DateService.newUTCDate(new Date());
    this.lanhthuocTo = DateService.newUTCDate(new Date());
    this.thuocphatFrom = DateService.newUTCDate(new Date());
    this.linhThuocNgay = DateService.newUTCDate(new Date());
    this.thuocphatTo = DateService.newUTCDate(new Date());
    this.selectedType = 1;//this.types[0];

    this.lanhthuocKhu = this.khukbs[0];
    this.xemDS(true);
    this.xemDS(false);
    this.xemLinhThuocHangNgay();
    this.listThuocs = [];
    this.exportExcelOption = new ExportExcelOption();
  }

  changePatient() {
    this.theodoiFrom = DateService.parseImportted_At(this.selectedPatient.imported_at)
  }

  changeThuoc() {

  }

  changeType() { };

  focusPatient() {
    console.log('--khambenh----focusPatient-------', this.patients);
    if (this.patients) {
      return;
    }
    this.patients = this.patientService.getAllPatients();
  }

  xemDS(isLanhthuoc) {
    let khu: NXOption;
    let from, to: Date;
    if (isLanhthuoc) { // Lĩnh thuốc thường
      khu = this.lanhthuocKhu;
      from = DateService.newUTCDate(this.lanhthuocFrom);
      to = DateService.newUTCDate(this.lanhthuocTo);
      // this.lanhthuocQueryCaption = 'Thống kê Lãnh thuốc theo Khu:' + khu.name + ' từ ngày: ' + from + ' tới ngày: ' + to;
    } else { // Lĩnh thuốc Cắt Cơn TAB
      khu = this.phatthuocKhu;
      from = DateService.newUTCDate(this.thuocphatFrom);
      to = DateService.newUTCDate(this.thuocphatTo);
      // this.phatthuocQueryCaption = 'Thống kê Phát thuốc theo Khu:' + khu.name + ' từ ngày: ' + from + ' tới ngày: ' + to;
    }
    this.searching = true;
    if (isLanhthuoc) {
      this.buildLinhThuoc(khu.id, from, to, this.selectedType);
    } else {
      if (khu === undefined || khu.id === '0') {
        this.phieukbService.getPhieukhambenhsByDates(from, to).subscribe(
          res => {
              this.phieuKBs = res.data;
              this.buildPhatThuocDataTable();
              this.searching = false;
          },
          err => {
            this.searching = false;
            this.addSingle('error', 'Lỗi', 'Không kết nối được CS Dữ liệu')
            return;
        });
      } else {
        this.phieukbService.getPhieukhambenhsByKhu(khu.id, from, to).subscribe(
          res => {
            // this.exportTotal = 0;
              this.phieuKBs = res.data;
              this.buildPhatThuocDataTable();
              this.searching = false;
          },
          err => {
            this.searching = false;
            this.addSingle('error', 'Lỗi', 'Không kết nối được CS Dữ liệu')
            return;
          }
        );
      }
    }

  }

  xemLinhThuocHangNgay() {
    // this.linhThuocNgay = new Date(DateService.getDDMMYYY(this.linhThuocNgay));
    this.searching = true;
    let date: Date = DateService.newUTCDate(this.linhThuocNgay);
    // this.phieukbService.getPhieukhambenhsByDates(date, date).subscribe(
    if (this.lanhthuocKhu === undefined || this.lanhthuocKhu.id === '0') {
      this.phieukbService.getPhieukhambenhsByDates(date, date).subscribe(
        res => {
          // this.exportTotal = 0;
          this.phieuKB1BNs = res.data;
          this.buildLinhThuocHangNgayDataTable();
          this.searching = false;
        },
        err => {
          this.searching = false;
          this.addSingle('error', 'Lỗi', 'Không kết nối được CS Dữ liệu')
          return;
        });
    } else {
      this.phieukbService.getPhieukhambenhsByKhu(this.lanhthuocKhu.id, date, date).subscribe(
        res => {
          // this.exportTotal = 0;
          this.phieuKB1BNs = res.data;
          this.buildLinhThuocHangNgayDataTable();
          this.searching = false;
        },
        err => {
          this.searching = false;
        });
    }
  }

  xemSotheodoi() {
    if (this.selectedPatient === undefined) {
      this.addSingle('warn', 'Nhắc bạn:', 'Chưa chọn bệnh nhân!')
      return;
    }
    if (this.theodoiFrom > this.theodoiTo) {
      this.addSingle('warn', 'Nhắc bạn:', 'Ngày tìm kiếm không đúng!')
      return;
    }

    this.searching = true;
    let from: Date = DateService.newUTCDate(this.theodoiFrom);
    let to: Date = DateService.newUTCDate(this.theodoiTo);
    this.phieukbService.getPhieukhambenhsByMabenhnhan(this.selectedPatient.patientId, from, to).subscribe(
      res => {
        this.theodoiQueryCaption = 'Danh sách Phiếu khám bệnh:' + this.selectedPatient.patientName + ' từ ngày: ' + this.theodoiFrom + ' tới ngày: ' + this.theodoiTo;
        // this.exportTotal = 0;
        this.phieuKBbyBNs = res.data;
        this.buildBenhNhanDataTable();
        // this.buildDataTable();
        this.buildBenhNhanTTDataTable();
        this.searching = false;
      },
      err => {
        this.searching = false;
        this.addSingle('error', 'Lỗi server:', 'Khống tìm thấy CSDL');
      }
    );
  }

  xemTKThuoc() {}

  // XemDS phat thuoc CCON
  buildPhatThuocDataTable() {
    this.tkPhatThuocCols = [
      { field: 'stt', header: 'STT' },
      // { field: 'mabn', header: 'Mã bn' }, // open if neee
      { field: 'ten', header: 'Tên' },
      { field: 'namsinh', header: 'Năm sinh' },
      { field: 'ngaykham', header: 'Ngày bắt đầu' },
      { field: 'songay', header: 'Số Ngày' },
    ];
    if (this.showMaBN) {
      this.tkPhatThuocCols.splice(1, 0, { field: 'mabn', header: 'Mã bệnh nhân' });
    }
    this.tkPhatThuocRows = [];
    if (this.phieuKBs.length === 0) {
      return;
    }

    let i = 0;
    this.phieuKBs.forEach((phieu, idx) => {
      const dts = JSON.parse(phieu.donthuocjs);
      if (dts !== undefined) {
        console.log('=====buildPhatThuocDataTable=====phieu='+idx+'=========================');
        console.log(phieu);
        console.log('====================================');
      }
      // build cols
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          // Tìm danh thuốc cần của tất cả bnhan
          const tent = dt.selectedThuoc.tenThuoc;
          let yc = this.tkPhatThuocCols.filter(e => {
            return e.field == tent;
          })[0];
          if (yc === undefined) { // new thuoc need to yc
            let col = {
              field: tent,
              header: tent
            }
            this.tkPhatThuocCols.push(col);
          }
        }
      });

      // build row
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          const tent = dt.selectedThuoc.tenThuoc;
          let ri = this.tkPhatThuocRows.filter(e => {
            return e['mabn'] === phieu.mabenhnhan;
          })[0];
          if (dt.cachdung) {
            if (dt.cachdung) {
              if (ri === undefined) {
                console.log('--- New row for patient:');
                let r: any = {};
                r['stt'] = ++i;
                r['mabn'] = phieu.mabenhnhan;
                r['ten'] = phieu.fullname;
                r['ngaykham'] = DateService.getDDMM(phieu.ngaykham);
                r['songay'] = dt.songay;
                r['namsinh'] = phieu.namsinh;
                if (dt.cachdung.type === 1 ) {
                  r[tent] = (dt.sang + '.' + dt.chieu + '.' + dt.toi);
                  // if (dt.cachdung.type === 4) {
                  //   r[tent] = dt.ton;
                  // }
                } else {
                  r[tent] = dt.ton;
                }

                if (r.mabn !== undefined) {
                  this.tkPhatThuocRows.push({ ...r });
                }
                // else if (dt.cachdung.type === 2) {
                // } else if (dt.cachdung.type === 3) {
                // } else {
                // }
              } else {
                console.log('--- Found patient:', ri); // just update old row
                if (dt.cachdung.type === 1) {
                  ri[tent] = (dt.sang + '.' + dt.chieu + '.' + dt.toi);
                } else if (dt.cachdung.type === 4) {
                  ri[tent] = (dt.sang + '.' + dt.chieu + '.' + dt.toi);
                }
              }
            }
          }
        }
      });
    });
    // add kyten column
    this.tkPhatThuocCols.push({
      field: 'kyten',
      header: 'Ký Tên'
    })
    console.log('---buildPhatThuocDataTable----tkPhatthuocCols: ', this.tkPhatThuocCols);
    console.log('---buildPhatThuocDataTable----tkPhatThuocRows: ', this.tkPhatThuocRows);

  }

  buildLinhThuocHangNgayDataTable() {
    this.tkLinhThuocHangNgayCols = [
      { field: 'stt', header: 'STT' },
      // { field: 'mabn', header: 'Mã bn' },
      { field: 'ten', header: 'Tên' },
      { field: 'namsinh', header: 'NS' },
      // { field: 'soluong', header: 'Số lượng' },
    ];
        
    if (this.showMaBN) {
      this.tkLinhThuocHangNgayCols.splice(1, 0, { field: 'mabn', header: 'Mã bn' });
    }
    this.tkLinhThuocHangNgayRows = [];
    if (this.phieuKB1BNs.length === 0) {
      return;
    }
    let i = 0;
    let rowTotal = {
      'ten': 'Tổng'
    }
    this.phieuKB1BNs.forEach((phieu, idx) => {
      const dts = JSON.parse(phieu.donthuocjs);
      if (dts !== undefined) {
        console.log('=====buildLinhThuocHangNgayDataTable=====phieu='+idx+'=========================');
        console.log(phieu);
        console.log('====================================');
      }
      // build cols
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          // Tìm danh thuốc cần của tất cả bnhan
          const tent = dt.selectedThuoc.tenThuoc;
          let yc = this.tkLinhThuocHangNgayCols.filter(e => {
            return e.field == tent;
          })[0];
          if (yc === undefined) { // new thuoc need to yc
            let col = {
              field: tent,
              header: tent
            }
            this.tkLinhThuocHangNgayCols.push(col);
            rowTotal[tent] = 0; // init total for rowTotal when add new thuoc
          }
        }
      });

      // build row
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          const tent = dt.selectedThuoc.tenThuoc;
          let ri = this.tkLinhThuocHangNgayRows.filter(e => { // tim benh nhan trong list
            return e['mabn'] === phieu.mabenhnhan;
          })[0];
          if (dt.cachdung) {
            if (ri === undefined) {// ko thay, them moi benh nhan vao list
              console.log('--- New row for patient:');
              let r: any = {};
              r['stt'] = ++i;
              r['mabn'] = phieu.mabenhnhan;
              r['ten'] = phieu.fullname;
              r['namsinh'] = phieu.namsinh;
              if (dt.cachdung.type === 1) {
                r[tent] = (dt.sang + dt.chieu + dt.toi) * dt.songay;
                rowTotal[tent] += r[tent];
              } else  {
                r[tent] = dt.ton ;
                rowTotal[tent] += dt.ton;
              }
              this.tkLinhThuocHangNgayRows.push({ ...r });
            } else { // benh nhan da co trong list => them thuoc moi == cột mới
              console.log('--- Found patient:', ri); // just update old row
              if (dt.cachdung.type === 1) {
                ri[tent] = (dt.sang + dt.chieu + dt.toi) * dt.songay;
                rowTotal[tent] += ri[tent];
              } else  {
                ri[tent] = dt.ton ;
                rowTotal[tent] += dt.ton;
              }
              
            }
          }
        }
      });
    });
    // add more row total
    this.tkLinhThuocHangNgayRows.push(rowTotal);
    console.log('---buildLinhThuocHangNgayDataTable----tkLinhThuocHangNgayCols: ', this.tkLinhThuocHangNgayCols);
    console.log('---buildLinhThuocHangNgayDataTable----tkLinhThuocHangNgayRows: ', this.tkLinhThuocHangNgayRows);

  }
  // same all patients, add more date column
  //Sotheodoi
  buildBenhNhanDataTable() {
    this.tkTheoDoiCols = [
      { field: 'stt', header: 'STT' },
      // { field: 'mabn', header: 'Mã bn' },
      // { field: 'ten', header: 'Tên' },
      // { field: 'namsinh', header: 'NS' },
      { field: 'date', header: 'Ngày khám' },
      { field: 'songay', header: 'Số Ngày' },
    ];
    this.tkTheoDoiRows = [];
    
    if (this.phieuKBbyBNs.length === 0) {
      return;
    }

    let i = 0;
    this.phieuKBbyBNs.forEach((phieu, idx) => {
      const dts = JSON.parse(phieu.donthuocjs);
      
      if (dts !== undefined) {
        console.log('=====buildBenhNhanDataTable=====phieu='+idx+'=========================');
        console.log(phieu);
        console.log('====================================');
      }
      // build cols
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          // Tìm danh thuốc cần của tất cả bnhan
          const tent = dt.selectedThuoc.tenThuoc;
          let yc = this.tkTheoDoiCols.filter(e => {
            return e.field == tent;
          })[0];
          if (yc === undefined) { // new thuoc need to yc
            let col = {
              field: tent,
              header: tent
            }
            this.tkTheoDoiCols.push(col);
          }
        }
      });

      // build row
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          const tent = dt.selectedThuoc.tenThuoc;
          let ri = this.tkTheoDoiRows.filter(e => {
            return e.id === phieu.id;
          })[0];

          // start add thuoc in other phieu
          if (dt.cachdung) {
            if (ri === undefined) {
              console.log('--- New row for phieu:');
              let r: any = {};
              r.id = phieu.id;
              r['stt'] = ++i;
              r['mabn'] = phieu.mabenhnhan;
              r['ten'] = phieu.fullname;
              r['namsinh'] = phieu.namsinh;
              r['songay'] = dt.songay;
              r['date'] = DateService.getDDMMYYY(phieu.ngaykham);
              if (dt.cachdung.type === 1 || dt.cachdung.type === 4) {
                r[tent] = (dt.sang + '.' + dt.chieu + '.' + dt.toi);
                console.log('-----ngaykham-', phieu.ngaykham);
              // }
              // else if (dt.cachdung.type === 2) {
              // } else if (dt.cachdung.type === 3) {
              } else {
                r[tent] = dt.ton;
              }
              this.tkTheoDoiRows.push({ ...r });
            } else {
              // other thuoc in phieu
              console.log('--- Found phieu:', ri); // just update old row
              if (dt.cachdung.type === 1 || dt.cachdung.type === 4) {
                ri[tent] = (dt.sang + '.' + dt.chieu + '.' + dt.toi);
              } else {
                ri[tent] = dt.ton;
              }
            }
          }
        }
      });
    });
    // add date column
    // this.tkTheoDoiCols.push({
    //   field: 'date',
    //   header: 'Ngày '
    // })
    // add kyten column
    this.tkTheoDoiCols.push({
      field: 'kyten',
      header: 'Ký Tên'
    });

    console.log('---buildBenhNhanDataTable----tkTheoDoiCols: ', this.tkTheoDoiCols);
    console.log('---buildBenhNhanDataTable----tkTheoDoiRows: ', this.tkTheoDoiRows);

  }

  buildBenhNhanTTDataTable() {
    this.tkTheoDoiTTCols = [
      { field: 'stt', header: 'STT' },
      // { field: 'mabn', header: 'Mã bn' },
      // { field: 'ten', header: 'Tên' },
      // { field: 'namsinh', header: 'NS' },
      { field: 'date', header: 'Ngày khám' },
      { field: 'songay', header: 'Số Ngày' },
    ];

    this.tkTheoDoiTTRows = [];
    
    if (this.phieuKBbyBNs.length === 0) {
      return;
    }

    let i = 0;
    let rowTotal = {
      'date': 'Tổng'
    }
    this.phieuKBbyBNs.forEach((phieu, idx) => {
      const dts = JSON.parse(phieu.donthuocjs);
      
      if (dts !== undefined) {
        console.log('=====buildBenhNhanDataTable=====phieu='+idx+'=========================');
        console.log(phieu);
        console.log('====================================');
      }
      // build cols
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          // Tìm danh thuốc cần của tất cả bnhan
          const tent = dt.selectedThuoc.tenThuoc;
          let yc = this.tkTheoDoiTTCols.filter(e => {
            return e.field == tent;
          })[0];
          if (yc === undefined) { // new thuoc need to yc
            let col = {
              field: tent,
              header: tent
            }
            this.tkTheoDoiTTCols.push(col);
            rowTotal[tent] = 0;
          }
        }
      });

      // build row
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          const tent = dt.selectedThuoc.tenThuoc;
          let ri = this.tkTheoDoiTTRows.filter(e => {
            return e.id === phieu.id;
          })[0];

          // start add thuoc in other phieu
          if (dt.cachdung) {
            if (ri === undefined) {
              console.log('--- New row for phieu:');
              let r: any = {};
              r.id = phieu.id;
              r['stt'] = ++i;
              r['mabn'] = phieu.mabenhnhan;
              r['ten'] = phieu.fullname;
              r['namsinh'] = phieu.namsinh;
              r['songay'] = dt.songay;
              r['date'] = DateService.getDDMMYYY(phieu.ngaykham);
              if (dt.cachdung.type === 1 || dt.cachdung.type === 4) {
                r[tent] = (dt.sang +  dt.chieu +  dt.toi) * dt.songay;
                console.log('-----ngaykham-', phieu.ngaykham);
                rowTotal[tent] += r[tent];
              } else {
                r[tent] = dt.ton;
                rowTotal[tent] += dt.ton;
              }
              this.tkTheoDoiTTRows.push({ ...r });
            } else {
              // other thuoc in phieu
              console.log('--- Found phieu:', ri); // just update old row
              if (dt.cachdung.type === 1 || dt.cachdung.type === 4) {
                ri[tent] = (dt.sang + dt.chieu + dt.toi) * dt.songay;
                rowTotal[tent] += ri[tent];
              } else {
                ri[tent] += dt.ton;
                rowTotal[tent] += dt.ton;
              }
            }
          }
        }
      });
    });
    // add date column
    // this.tkTheoDoiTTCols.push({
    //   field: 'date',
    //   header: 'Ngày '
    // })
    // add kyten column
    this.tkTheoDoiTTRows.push(rowTotal);
    this.tkTheoDoiTTCols.push({
      field: 'kyten',
      header: 'Ký Tên'
    });

    console.log('---buildBenhNhanDataTable----tkTheoDoiTTCols: ', this.tkTheoDoiTTCols);
    console.log('---buildBenhNhanDataTable----tkTheoDoiTTRows: ', this.tkTheoDoiTTRows);

  }

  checkExit(t: any, ts: any[]) {
    
  }

  buildLinhThuoc(khuId: string, from: Date, to: Date, loai: number) {
    // rie.thuoc, t.tenthuoc, rie.dongia, t.unit, 
    this.listYCcols = [
      // { field: 'stt', header: 'STT' },
      // { field: 'mathuoc', header: 'mathuoc' },
      { field: 'tenthuoc', header: 'Tên thuốc' },
      // { field: 'dongia', header: 'Đơn giá' },
      { field: 'unit', header: 'Đơn vị' },
      { field: 'soluong', header: 'Số lượng' },
      // { field: 'thanhtien', header: 'Thành tiền' },
    ];
    this.recordService.getPhieuLinhThuocHangNgay(khuId, from, to, loai).subscribe(
      res => {
        this.dataBE = res.data;
        this.listYCRow = NhiXuanUtil.mapDataTable(res.data, this.listYCcols);
        this.searching = false;
      }, err => {
        this.searching = false;
        this.addSingle('error', 'Lỗi', 'Không kết nối được CS Dữ liệu');
      }
    );
  }

   // Lĩnh thuốc thường
  buildYCDataTable() {
    // if (this.phieuYCKBs.length === 0) {
    //   return;
    // }
    this.listYCcols = [
      { field: 'stt', header: 'STT' },
      // { field: 'mathuoc', header: 'mathuoc' },
      { field: 'tenthuoc', header: 'Tên thuốc' },
      { field: 'unit', header: 'Đơn vị' },
      { field: 'soluong', header: 'Số lượng' },
      // { field: 'dongiaXuat', header: 'Đơn giá' },
      // { field: 'thanhtien', header: 'Thành tiền' },
    ];
    this.listYCRow = [];
    this.listYCLoaiRows = [];

    let i = 0;
    this.totalTien = 0;
    this.phieuYCKBs.forEach((phieu, idx) => {
      const dts = JSON.parse(phieu.donthuocjs);
      if (dts !== undefined) {
        console.log('=====linh thuoc thuong=====phieu='+idx+'=========================');
        console.log(phieu);
        console.log('====================================');
      }
      // build row linh thuoc thuong, each row is thuoc need to yc
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          // Tìm danh thuốc cần của tất cả bnhan
          const tent = dt.selectedThuoc.tenThuoc;
          let thuocCu = this.listYCRow.filter(e => {
            return e['mathuoc'] == tent;
          })[0];

          if (thuocCu === undefined) { // new thuoc need to yc
            let thuocMoi = {};
            if (dt.cachdung) {
              let tt = 0;
              if (dt.cachdung.type === 1) {
                // tt = dt.selectedThuoc.dongiaXuat * (dt.sang + dt.chieu + dt.toi) * dt.songay;
                thuocMoi = {
                  'stt': ++i,
                  'tenthuoc': tent,
                  'unit': dt.selectedThuoc.unit,
                  // 'dongiaXuat': dt.selectedThuoc.dongiaXuat,
                  // 'soluong': (dt.sang + dt.chieu + dt.toi) * dt.songay,
                  // 'thanhtien': tt,
                  'type': dt.selectedThuoc.type
                }
              } else {
                // tt = dt.selectedThuoc.dongiaXuat * dt.ton;
                thuocMoi = {
                  'stt': ++i,
                  'tenthuoc': tent,
                  'unit': dt.selectedThuoc.unit,
                  // 'dongiaXuat': dt.selectedThuoc.dongiaXuat,
                  // 'soluong': dt.ton,
                  // 'thanhtien': tt, 
                  'type': dt.selectedThuoc.type
                }
              }
              this.totalTien += tt;
            }
            if (thuocMoi['tenthuoc']) {
              this.listYCRow.push(thuocMoi);
            }
          } else {
            if (dt.cachdung) {
              if (dt.cachdung.type === 1) {
                thuocCu['soluong'] += (dt.sang +  dt.chieu +  dt.toi) * dt.songay;
              } else {
                thuocCu['soluong'] += dt.ton;
              }
            }
          }

        }
      });
    });

    this.listYCRow.forEach((e, k) => {
      if (e.type === 99) {
        this.listYCLoaiRows.push(e);
      }
    })

    console.log('---buildYCDataTable----listYCRow: ', this.listYCRow);

  }

  buildDataTable() {
    this.buildPhatThuocDataTable();
    this.buildLinhThuocHangNgayDataTable();
    // this.buildYCDataTable();
    this.buildLinhThuoc(this.lanhthuocKhu.id, this.lanhthuocFrom,
      this.lanhthuocTo, this.selectedType['value']);
  }
  onRowSelect() {

  }

  exportPhatThuocCC() {
    console.log('-----data export excel:', this.tkPhatThuocRows);
    let title = "THUỐC PHÁT CẮT CƠN-" + DateService.getDDMMYYY(this.thuocphatFrom);
    ExcelUtil.exportExcell(title, this.tkPhatThuocRows);
  }

  exportLinhThuoc1DateThuoc() {
    console.log('-----exportLinhThuoc1DateThuoc export excel:', this.tkLinhThuocHangNgayRows);
    let title = "PHIẾU LĨNH THUỐC HÀNG NGÀY-" + DateService.getDDMMYYY(this.linhThuocNgay);
    ExcelUtil.exportExcell(title, this.tkLinhThuocHangNgayRows);
  }

  exportSotheidoi() {
    let title = "SỔ THEO DÕI-" + this.selectedPatient.patientName + '-' + DateService.getDDMMYYY(this.theodoiFrom);
    ExcelUtil.exportExcell(title, this.tkTheoDoiRows);
  }

  exportYCThuoc() {
    let fileName = 'PhieuLanhThuoc-' + this.theodoiFrom.getDate() + '-T' + (this.theodoiFrom.getMonth() + 1)+ '.xlsx';

    this.exportExcelOption.fileName = fileName;
    this.exportExcelOption.objId = this.lanhthuocKhu.name;
    this.exportExcelOption.sheetHeader = "PHIẾU LÃNH THUỐC THƯỜNG";
    this.exportExcelOption.sheetName = "Lanh Thuoc";
    this.exportExcelOption.tkFrom = this.theodoiFrom;
    this.exportExcelOption.type = 9;

    this.recordService.exportPhieuLinhThuocHangNgay(this.exportExcelOption, this.dataBE).subscribe(
      res => {
        console.log('write excell success');
        let fname = res.data;
        const urlDownload = 'http://smartevn.com:8083/download/' + fileName;
        console.log("========================" + urlDownload + "===================================" + fname);
        this.exporting = false;
        window.location.href = urlDownload;

      },
      err => {
        this.exporting = false;
      }
    );
  }
  exportYCThuocFE() {
    let title = "PHIẾU LĨNH THUỐC-" + DateService.getDDMMYYY(this.lanhthuocFrom);
    // console.log('---------this.listYCRow=', this.listYCRow);
    let row2 = [];
    row2 = this.listYCRow.map(e => {
      return e;
    })
    let cols = this.listYCcols.map(e => {
      return e.header;
    });

    var data = [
      [title],
      [this.selectedPatient.patientName],
      cols,
      ... this.listYCRow.map(e => {
        let keys = Object.keys(e);
        let row = [];
        keys.forEach(element => {
          row.push(e[element])
        });
        row.pop();
        return row;
      })
    ];

    var worksheet = XLSX.utils.aoa_to_sheet(data, { cellDates: true });
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: cols.length - 1 } },
      {s : {r:1, c: 0}, e: {r:1, c:cols.length - 1}}
    ]
    // this.listYCRow.push(title);
    // const worksheet = XLSX.utils.json_to_sheet(this.listYCRow);

    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, title);
    // ExcelUtil.exportExcell(title, data);
    
  }

  exportLinhThuocLoai() {
    let title = "PHIẾU LĨNH THUỐC-KHÁC -" + DateService.getDDMMYYY(this.lanhthuocFrom);
    ExcelUtil.exportExcell(title, this.listYCLoaiRows);
    // const worksheet = XLSX.utils.json_to_sheet(this.listYCLoaiRows);
    // const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, title);
  }

  formatDate(dt) {
    let d = new Date(dt);
    return DateService.getDDMMYYY(d);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + EXCEL_EXTENSION);
  }
  
  addSingle(type, summary, detail) {
    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.messageService.add({ severity: type, summary: summary, detail: detail });
  }

  // addMultiple() {
  //   this.messageService.addAll([{
  //     severity: 'success', summary: 'Service Message',
  //     detail: 'Via MessageService'
  //   }, { severity: 'info', summary: 'Info Message', detail: 'Via MessageService' }]);
  // }

  clearMsg() {
    this.messageService.clear();
  }
}
