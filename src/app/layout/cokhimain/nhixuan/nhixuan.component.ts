import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
// import { ThuocsService } from '../../../shared/services/thuocs.service';
// import { ThuocModel } from '../../../shared/model/thuoc.model';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { ImportModel } from '../../../shared/model/import.model';

import { ExcelUtil } from '../../../shared/utils/excel-util';
import { DateService } from '../../../shared/services/date.util.service';
import { ImportService } from '../../../shared/services/import.service';
import { NhiXuanOptions, NXOption} from '../../../shared/common/selectitem';

@Component({
  selector: 'app-nhixuan',
  templateUrl: './nhixuan.component.html',
  styleUrls: ['./nhixuan.component.scss']
})
export class NhixuanComponent implements OnInit {

  msgs: Message[] = [];
  khoNhaps = NhiXuanOptions.khoNhaps;
  khuXuats: NXOption[] = [];
  khuXuatTN = NhiXuanOptions.khuXuatTN;
  khuXuatDVYT = NhiXuanOptions.khuXuatDVYT;
  khuXuatNS = NhiXuanOptions.khuXuatNS;
  // phieu: PhieuForm;
  phieuImportModel: ImportModel;
  phieuExportModel: ImportModel;
  listImportModel: ImportModel[] = [];
  listHSD: any[] = [];
  listExportModel: ImportModel[] = [];
  listAllPhieus: ImportModel[] = [];

  selectedThuoc: ThuocModel;
  selectedKhoNhap: NXOption;
  selectedKhoXuat: NXOption; // form Xuat
  selectedKhuXuat: NXOption;
  selectedMalo: ImportModel;

  nhapFrom: Date = new Date();
  nhapTo: Date = new Date();
  xuatFrom: Date = new Date();
  xuatTo: Date = new Date();
  searching = false;

  listMaLo: ImportModel[] = [];

  toncu: number = 0; // hien co cua thuoc
  tonmoi: number = 0; // sau khi nhap them
  tonTotal: number = 0;
  exportTotal: number = 0; // for get from db
  importTotal: number = 0; 

  thuocs: ThuocModel[] = [];
  // thuocOptions: any[] = [];
  thuocSelected: ThuocModel;

  imSelected: ImportModel;
  colsImport: any[];
  colsHSD: any[];

  exSelected: ImportModel;
  colsExport: any[];
  colsAll: any[];

  displayImportDialog: boolean;
  newImport: boolean = false;

  displayExportDialog: boolean;
  newExport: boolean = false;

  constructor(
    private thuocService: ThuocService,
    private importService: ImportService,
    private dateService: DateService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getPhieusByTypeToncu();
    // this.phieu = new PhieuForm();
    // this.selectedKhoNhap = this.khoNhaps[1];
    this.selectedThuoc = new ThuocModel();
    this.phieuImportModel = this.createImporModel();
    this.phieuExportModel = this.createImporModel();
    this.nhapFrom = DateService.newUTCDate(new Date());
    this.nhapTo = this.nhapFrom;

    this.xuatFrom = DateService.newUTCDate(new Date());
    this.xuatTo = this.xuatFrom;

    this.khuXuats = this.khuXuatDVYT;

    this.colsImport = [
      { field: 'id', header: 'Mã Lô' },
      { field: 'maphieu', header: 'Mã phiếu' },
      { field: 'tenthuoc', header: 'Tên thuốc' },
      { field: 'kho_name', header: 'Kho' },
      { field: 'soluongnhap', header: 'Số lượng nhập' },
      { field: 'donvi', header: 'Đơn vị ' },
      { field: 'soluongton', header: 'Tồn ' },
      { field: 'imported_at', header: 'Ngày nhập' },
      { field: 'ngayhh', header: 'Ngày hết hạn ' },
      { field: 'location', header: 'Nơi lưu trữ ' },
      { field: 'description', header: 'Diễn giải' },
    ];

    this.colsHSD = [
      { field: 'id', header: 'Mã Lô' },
      { field: 'maphieu', header: 'Mã phiếu' },
      { field: 'tenthuoc', header: 'Tên thuốc' },
      { field: 'kho_name', header: 'Kho' },
      { field: 'soluongnhap', header: 'Số lượng nhập' },
      { field: 'donvi', header: 'Đơn vị ' },
      { field: 'soluongton', header: 'Tồn ' },
      { field: 'imported_at', header: 'Ngày nhập' },
      { field: 'ngayhh', header: 'Ngày hết hạn ' },
      { field: 'HSD', header: 'Còn lại/ngày' },
      { field: 'location', header: 'Nơi lưu trữ ' },
      { field: 'description', header: 'Diễn giải' },
    ];

    this.colsExport = [
      { field: 'maphieu', header: 'Mã phiếu' },
      { field: 'kho_name', header: 'Kho' },
      { field: 'tenthuoc', header: 'Tên thuốc' },
      { field: 'soluongxuat', header: 'Số lượng xuất' },
      { field: 'donvi', header: 'Đơn vị ' },
      { field: 'khu_name', header: 'Khu' },
      { field: 'exported_at', header: 'Ngày xuất' },
      { field: 'soluongton', header: 'Tồn ' },
      { field: 'description', header: 'Diễn giải' },
      { field: 'loxuatId', header: 'Mã Lô xuất' },
      // { field: 'maphieuxuat', header: 'Lô xuất' },
      // { field: 'imagepath', header: 'Hình ảnh' },
    ];
    this.colsAll = [
      { field: 'maphieu', header: 'Mã phiếu' },
      { field: 'kho_name', header: 'Kho' },
      { field: 'tenthuoc', header: 'Tên thuốc' },
      { field: 'soluongnhap', header: 'Nhập' },
      { field: 'soluongxuat', header: 'SL Xuất' },
      { field: 'donvi', header: 'Đơn vị ' },
      // { field: 'maphieuxuat', header: 'Lô xuất' },
      { field: 'loxuatId', header: 'Lô xuất' },
      { field: 'khu_name', header: 'Khu' },
      { field: 'soluongton', header: 'Tồn ' },
      { field: 'exported_at', header: 'Ngày xuất' },
      { field: 'description', header: 'Diễn giải' },
      // { field: 'imagepath', header: 'Hình ảnh' },
    ];
    this.getAllPhieus();
    // data for thuoc options
    this.thuocService.getAllThuocs().subscribe(res => {
        console.log(res);
        this.thuocs = res.data;
      },
      err => {

      }
    );

    // data 
    this.getPhieusExport();  
    this.getPhieusExport();
  };

  getPhieusImport() {
    this.searching = true;
    this.importService.getPhieusByType(1).subscribe(
      res => {
        console.log(res);
        this.listImportModel = res.data;
        this.searching = false;
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );
  }

  getPhieusByTypeToncu() {
    this.importService.getPhieusByTypeToncu().subscribe(
      res => {
        console.log(res);
        // [[34, "DVY262IN20200314", "Cefuroxim ", "Kho Dịch Vụ y tế", 
        //    11, "Viên", 992, "2020-03-13T17:00:00.000+0000", "2020-03-15", 2, null, null]]
        let i = -1;
        this.listHSD = res.data.map((e, i) => {
          let ei = {
            'id': e[0],
            'maphieu': e[1],
            'tenthuoc': e[2],
            'kho_name': e[3],
            'soluongnhap': e[4],
            'donvi': e[5],
            'soluongton': e[6],
            'imported_at': e[7],
            'ngayhh': e[8],
            'HSD': e[9],
            'location': e[10],
            'description': e[11],
          };
          if (ei.HSD < 181) {
            ei['css'] = {
                'background-color': 'red'
            }
          } else if (ei.HSD < 271) {
            ei['css'] = {
              'background-color': 'yellow'
            }
          } else {
            ei['css'] = {
              'background-color': 'lawngreen'
            }
          }
          return ei;
        });
        console.log('-------', this.listHSD);
        
      },
      err => {
        console.log(err);
      }
    );
  }

  getPhieusExport() {
    // data for import table
    this.searching = true;
    this.importService.getPhieusByType(-1).subscribe(
      res => {
        console.log(res);
        this.listExportModel = res.data;
        this.searching = false;
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );
  }

  getAllPhieus() {
    // data for All table
    this.searching = true;
    this.importService.getAllImports().subscribe(
      res => {
        console.log(res);
        this.listAllPhieus = res.data;
        this.searching = false;
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );
  }

  xemNhap(isImport: true) {
    let type = 1;
    // if (!isImport) {
    //   type = -1;
    // }
    this.searching = true;
    const from = DateService.newUTCDate(this.nhapFrom);
    const to = DateService.newUTCDate(this.nhapTo);
    if (this.selectedKhoNhap.name === undefined) {
      this.importService.getThuocByTypeAndDates(type, from, to,
         this.selectedThuoc.id).subscribe(
          res => {
            console.log(res);
             this.listImportModel = res.data;
             this.tinhImportTotal();
             this.searching = false;
          },
          err => {
            console.log(err);
            this.searching = false;
          }
        );
    } else {
      this.importService.getThuocByTypeAndDatesAndKho(type, from, to,
        this.selectedKhoNhap.id, this.selectedThuoc.id).subscribe(
          res => {
            console.log(res);
            this.listImportModel = res.data;
            this.tinhImportTotal();
            this.searching = false;
          },
          err => {
            console.log(err);
            this.searching = false;
          }
        );
    }
  }

  tinhImportTotal() {
    this.importTotal = 0;
    this.listImportModel.forEach(ex => {
      this.importTotal += ex.soluongnhap;
    });
    this.getToncu(this.selectedThuoc.id, this.selectedKhoNhap.id);
  }

  tinhExportTotal() {
    this.exportTotal = 0;
    this.listExportModel.forEach(ex => {
      this.exportTotal += ex.soluongxuat;
    });
    this.getToncu(this.selectedThuoc.id, this.selectedKhoXuat.id);
  }

  xemThongkeXuat() {
    const from = DateService.newUTCDate(this.xuatFrom);
    const to = DateService.newUTCDate(this.xuatTo);
    if (this.selectedKhoXuat === undefined) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa chọn kho' });
      return;
    }
    this.searching = true;
    if (this.selectedKhuXuat === undefined) {
      this.selectedKhuXuat = this.khuXuatDVYT[0];
    }
    if (this.selectedThuoc.id === undefined) {
      this.importService.getExportByDatesAndKhoAndKhu(from, to, this.selectedKhoXuat.id,
        this.selectedKhuXuat.id).subscribe(
        res => {
          console.log(res);
            this.listExportModel = res.data;
            this.tinhExportTotal();
          this.searching = false;
        },
        err => {
          console.log(err);
          this.searching = false;
        }
      );    
    } else {
      this.importService.getExportThuocByDatesAndKhoAndKhu(this.selectedThuoc.id, from, to,
        this.selectedKhoXuat.id, this.selectedKhuXuat.id).subscribe(
        res => {
          console.log(res);
          this.listExportModel = res.data;
          this.tinhExportTotal();
          this.searching = false;
        },
        err => {
          console.log(err);
          this.searching = false;
        }
      );    
      
    }
  }

  onTabChange(event) {
    switch (event.index) {
      case 0:
      case 2: // Xuat
        this.getPhieusExport();
        break;
      case 1:
      case 3: // Nhap
        this.getPhieusImport();
        break;
      case 4: // xuat & nhap
        this.getAllPhieus();
        break;
      case 5:
        this.getPhieusByTypeToncu();
        break;
      default:
        break;
    }
  }

  hideMessage() {
    this.msgs = [];
  }

  // default is export
  validateExForm(isImport=false): boolean {
    let err = false;
    // console.log('validateExForm totalExport: ', this.soluongTon);
    if (this.selectedThuoc.id === undefined) {
      this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa chọn thuốc' });
      err = true;
    }

    if (isImport) {
      let phieu = this.phieuImportModel;
  
      if (phieu.soluongnhap < 1) {
        this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Số lượng nhập phải lớn hơn 0' });
        err = true;
      }
  
      if (!this.selectedKhoNhap) {
        this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa chọn Kho ' });
        err = true;
      }
  
      if (!phieu.imported_at) {
        this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa chọn ngày nhập' });
        err = true;
      }
    } else {
      let phieu = this.phieuExportModel;
      if (phieu.soluongxuat < 1) {
        this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Số lượng xuất phải lớn hơn 0' });
        err = true;
        return;
      }

      if (!this.selectedMalo) {
        this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chọn lại Lô xuất' });
        err = true;
        return;
      }
  
      if (this.selectedMalo.soluongton < phieu.soluongxuat) {
        this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Xuất quá số lượng tồn của Lô' });
        err = true;
        return;
      }
  
      if (!this.selectedKhoXuat) {
        this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa chọn Kho xuất' });
        err = true;
        return;
      }

      if (!this.selectedKhuXuat) {
        this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa chọn khu xuất' });
        err = true;
        return;
      }

      if (!phieu.exported_at) {
        this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa chọn ngày' });
        err = true;
        return;
      }
    }
    return err;
  }

  changeThuocXuat() {
    if (this.selectedKhoXuat) {
      // this.changeKhoXuat();
      this.getListMalo();
      // this.getToncu(this.selectedThuoc.id, this.selectedKhoXuat.id);
    }
  }

  changeMaLo() {
    console.log('-----changeMaLo----', this.selectedMalo);
    this.getToncu(this.selectedThuoc.id, this.selectedKhoXuat.id)
  }

  getListMalo() {
    this.listMaLo = [];
    this.selectedMalo = undefined;

    if (this.selectedThuoc !== undefined && this.selectedThuoc.id !== undefined && this.selectedThuoc.id !== undefined) {
      this.importService.getMaloByKhoAndThuocTon(this.selectedKhoXuat.id, this.selectedThuoc.id).subscribe(
        res => {
          this.listMaLo = res.data;
          console.log('-------listMalo: ', this.listMaLo);
          
          if (this.listMaLo.length > 0) {
            this.selectedMalo = this.listMaLo[0];
            let total = 0;
            this.listMaLo.forEach((e) => {
              total += e.soluongton;
            });
            this.tonTotal = total;
          };

          this.getToncu(this.selectedThuoc.id, this.selectedKhoXuat.id);
        },
        err => {
          
        }
      )
    }
  }

  changeKhoXuat() {
    this.getListMalo();
    // this.getToncu(this.selectedThuoc.id, this.selectedKhoXuat.id);
    this.loadKhuXuatsOption(false);
  }

  changeSoluongXuat() {
    if (this.selectedMalo.id && this.phieuExportModel.soluongxuat) {
      this.tonmoi = this.selectedMalo.soluongton - this.phieuExportModel.soluongxuat;
    }
  }

  updateTon() {
    // this.tonmoi = this.toncu - this.phieuExportModel.soluongxuat;
  }

  xuat() {
    this.hideMessage();
    if (this.validateExForm(false)) {
      return;
    }
    this.parseToPhieuModel(false);
    this.importService.addImport(this.phieuExportModel).subscribe(
      res => {
        console.log(res);
        this.listExportModel = res.data;
        this.resetForm(true);
        
      },
      err => {
        console.log(err);
      }
    );
  }

  createImporModel(): ImportModel {
    let im = new ImportModel();
    im.imported_at = DateService.newUTCDate(new Date());
    return im;
  }

  resetForm(isExport: true) {
    if (isExport) {
      this.phieuExportModel = this.createImporModel();
      this.selectedThuoc = new ThuocModel();
      this.selectedKhuXuat = undefined;
      this.selectedMalo = undefined;
      this.listMaLo = [];
      this.toncu = 0;
      this.tonmoi = 0;
    } else {

      this.phieuImportModel = this.createImporModel();
    }
  }

  changeKho(isImport = false) {
    this.loadKhuXuatsOption(isImport);
    this.getToncu(this.selectedThuoc.id, this.selectedKhoXuat.id, false);
  }

  loadKhuXuatsOption(isImport = false) {
    let kho = this.selectedKhoNhap;
    if (!isImport) {
      kho = this.selectedKhoXuat;
    }

    if (kho === undefined || kho.id == '0') {

    } else if (kho.id === 'KTN') {
      this.khuXuats = this.khuXuatTN;
    } else if (kho.id === 'DVY') {
      this.khuXuats = this.khuXuatDVYT;
    } else {
      this.khuXuats = this.khuXuatNS;
    }
  }
 
  changeKhu() {

  }

  createMaPhieu(isImport = false) {
    if (isImport) {
      this.phieuImportModel.maphieu = '' + this.selectedKhoNhap.id
        + this.selectedThuoc.id
        + 'IN'
        + DateService.getStringYYYYMMDD(this.phieuImportModel.imported_at);
    } else {
      this.phieuExportModel.maphieu = this.selectedKhoXuat.id
        + this.selectedThuoc.id
        + 'OUT'
        + this.selectedKhuXuat.id
        + DateService.getStringYYYYMMDD(this.phieuExportModel.exported_at);
    }
    
    console.log('--------phieuModel: ', this.phieuImportModel);
  }

  parseToPhieuModel(isImport = false) {
    let phieu = this.phieuExportModel;
    if (isImport) {
      phieu = this.phieuImportModel;
    }
    this.createMaPhieu(isImport);
    phieu.thuoc_id = this.selectedThuoc.id;
    phieu.mathuoc = this.selectedThuoc.maThuoc;
    phieu.tenthuoc = this.selectedThuoc.tenThuoc;
    phieu.donvi = this.selectedThuoc.unit;
    if (isImport) {
      phieu.type = 1; // Nhap
      phieu.kho_name = this.selectedKhoNhap.name;
      phieu.kho_id = this.selectedKhoNhap.id;
    } else {
      phieu.type = -1; // Nhap
      phieu.kho_name = this.selectedKhoXuat.name;
      phieu.kho_id = this.selectedKhoXuat.id;
      phieu.khu_id = this.selectedKhuXuat.id;
      phieu.khu_name = this.selectedKhuXuat.name;
      phieu.loxuatId = this.selectedMalo.id; // to get exactly phieu
      phieu.maphieuxuat = this.selectedMalo.maphieu;
    }
    // this.phieuModel.khuName = this.selectedKhuXuat.name;
  }

  nhap(e) {
    this.hideMessage();
    if (this.validateExForm(true)) {
      return;
    }
    this.parseToPhieuModel(true);
    this.importService.addImport(this.phieuImportModel).subscribe(
      res => {
        console.log(res);
        this.listImportModel = res.data;
        this.resetForm(true);
      },
      err => {
        console.log(err);
      }
    );
  }

  tinh(a: any[]): number {
    let sum = 0;
    a.forEach(e => {
      if ((typeof(e) === "number") || (Number.parseInt(e))) {
        console.log('value: ', e);
        sum += Number.parseInt(e);
      }
    });
    return sum;
  }
  changeSoluongNhap() {
    // this.tonTotal =  this.tinh([this.phieuImportModel.soluongton, this.phieuImportModel.soluongnhap]);
    this.tonmoi = this.tinh([this.toncu, this.phieuImportModel.soluongnhap]);
    // console.log('-----changeSoluongNhap-------', this.tonTotal);
  }

  showDialogToEdit(isImport) {
    console.log('showDialogToAdd =========');
  }

  updatePhieu(isExport = false) {
    console.log('-----updateImport: ', this.imSelected);
    // this.parseToPhieuModel();
    let phieu = this.imSelected;
    
    let date = new Date();
    let type = 'IN';
    if (isExport) {
      phieu = this.exSelected;
      // kho = this.selectedKhoXuat;
      date = phieu.exported_at;
      type = 'OUT' + phieu.khu_id; // if export add khu_id
    } else {
      date = this.imSelected.imported_at;
    }
    // phieu.kho_name = kho.name;
    // phieu.kho_id = kho.id;
    let kho = phieu.kho_id;

    let dateU = DateService.newUTCDate(date);
    let ds = DateService.getStringYYYYMMDD(dateU); // 15/03/2020
    phieu.maphieu = '' + kho
      + phieu.thuoc_id
      + type
      + ds;
    this.importService.editImport(phieu).subscribe(
      res => {
        console.log('updated: ', res);
        if (isExport) {
          this.listExportModel = res.data;
          this.displayExportDialog = false;
        } else {
          this.listImportModel = res.data;
          this.displayImportDialog = false;
        }
        // this.resetForm(true);
      },
      err => {
        this.displayImportDialog = false;
        this.displayExportDialog = false;
      }
    );
  }

  delete(isImport = false) {
    let phieu = this.imSelected;
    let list = this.listImportModel;
    if (isImport) {
      console.log('>>>>>>> delete import: ', this.imSelected);
      phieu = this.imSelected;
    } else {
      console.log('>>>>>>> delete export: ', this.exSelected);
      phieu = this.exSelected;
    }
    this.importService.deleteImport(phieu.id).subscribe(
      res => {
        console.log(res);
        this.displayImportDialog = false;
        this.displayExportDialog = false;
        if (isImport) {
          this.listImportModel = res.data;
        } else {
          this.listExportModel = res.data;
        }
      }
    )
  }

  onImportRowSelect() {
    this.newImport = false;
    console.log('>>>>>>> selected: ', this.imSelected);
    this.displayImportDialog = true;
  }

  cloneImport(c: ImportModel) {
    let cate = {};
    for (let prop in c) {
      cate[prop] = c[prop];
    }
    return cate;
  }

  onExportRowSelect() {
    // this.newExport = false;
    // this.epm = this.cloneExport(event.data);
    // this.exSelected = event.data;
    console.log('>>>>>>> exSelected: ', this.exSelected);
    this.displayExportDialog = true;
  }

  cloneExport(c: ImportModel) {
    let cate = {};
    for (let prop in c) {
      cate[prop] = c[prop];
    }
    return cate;
  }

  getToncu(thuoc_id = 0, kho: string, isExport = true) {
    if (this.selectedThuoc === undefined || this.selectedThuoc.id === undefined) {
      return;
    }
    this.importService.getToncuByThuocAndKho(this.selectedThuoc.id, kho).subscribe(
      res => { // [thuoc_id, tenthuoc, totalTon] = [265, 'ten thuoc', 5555]
        this.toncu = res.data[0] ? res.data[0][1] : 0;
        if (isExport) {
          if (this.selectedMalo) {
            this.tonmoi = this.selectedMalo.soluongton - this.phieuExportModel.soluongton;
          }
        } else {
          this.tonmoi = this.tinh([this.toncu, this.phieuImportModel.soluongnhap]);
        }
        // this.tonTotal =  this.tinh([this.phieuImportModel.soluongton, this.phieuImportModel.soluongnhap]);
      },
      err => {

      }
    )

  }

  changeThuoc() {
    // let t = this.thuocs.filter(el => el.value === e.value)[0];
    // this.name = t.label;
    console.log('========chonThuoc===selectedThuoc====', this.selectedThuoc);
    // this.getToncu(this.selectedThuoc.id);

    // this.importService.geImportsByThuoc(this.selectedThuoc.id).subscribe(
    //   res => {
    //     console.log(res);
    //     this.listImportModel = res.data;
    //     console.log('----geImportsByThuoc--------', this.listImportModel);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  xemExports(isExport) {
    if (this.selectedThuoc.id != undefined) {
      if (isExport) {
        // this.exportService.geExportsByThuocAndDates(this.thuocId, this.from, this.to).subscribe(
        //   res => {
        //     this.exportTotal = 0;
        //     this.epms = res.data;
        //     this.epms.forEach(e => {
        //       this.exportTotal += e.amount;
        //     })
        //   },
        //   err => {

        //   }
        // );
      } else {
        // this.importService.getImportsByThuocAndDates(this.thuocId, this.from, this.to).subscribe(
        //   res => {
        //     this.importTotal = 0;
        //     this.ipms = res.data;
        //     this.ipms.forEach(e => {
        //       this.importTotal += e.soluongnhap;
        //     })
        //   },
        //   err => {

        //   }
        // );
      }
    } else {
    }
  }

  exportBaocaoExcel(isExport:true) {
    console.log('-----data export excel:', this.xuatFrom);
    if (isExport) {
      let t = this.selectedThuoc.maThuoc ? this.selectedThuoc.maThuoc
        + DateService.getDDMMYYY(this.xuatFrom) 
        + '-' + DateService.getDDMMYYY(this.xuatTo) : '';
      let title = "Xuất thuốc-" + t;
      ExcelUtil.exportExcell(title, this.listExportModel);
    } else {
      let t = this.selectedThuoc.maThuoc ? this.selectedThuoc.maThuoc
          + DateService.getDDMMYYY(this.nhapFrom) 
          + '-' + DateService.getDDMMYYY(this.nhapTo) : '';
      let title = "Xuất thuốc-" + t;
      ExcelUtil.exportExcell(title, this.listImportModel);

    }
  }
  
}
