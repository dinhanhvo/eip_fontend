import { Component, OnInit } from '@angular/core';
import { ThuocModel } from '../../../shared/model/thuoc.model';
// import { ThuocService } from '../../../shared/services/thuoc.service';
import { PhieukhambenhService } from '../../../shared/services/phieukhambenh.service';
import { PhieuKhamBenhModel } from '../../../shared/model/phieukhambenh';
import { MessageService } from 'primeng/api';
import { DateService } from '../../../shared/services/date.util.service';
import { NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { PhieuxuatService } from '../../../shared/services/phieuxuat.service';
import { PhieuModel, PhieuxuatForm } from '../../../shared/model/import.model';
import { AppStoreService } from '../../../shared';
import * as _ from 'lodash';
import { NhiXuanUtil } from '../../../shared/utils/nhixuan_utils';

@Component({
  selector: 'app-xuatthuoc',
  templateUrl: './xuatthuoc.component.html',
  styleUrls: ['./xuatthuoc.component.scss']
})
export class XuatthuocComponent implements OnInit {

  sourceThuocs: ThuocModel[];

  targetThuocs: ThuocModel[];

  phieuxuat: PhieuModel;
  phieuxuatForm: PhieuxuatForm;
  phieuxuatTable: any;
  listphieuxuatModel: PhieuModel[] = [];
  listphieuxuatTable: any[] = [];

  khoNhaps = NhiXuanOptions.khoNhaps;
  khoXuat: NXOption;
  khuXuat: NXOption;

  ngayxuat: Date;
  xuatFrom: Date;
  xuatTo: Date;

  phieuYCKBs: PhieuKhamBenhModel[];
  listYCcols: any[] = [];
  listYCRow: any[] = [];
  targetYCKBs: any[] = [];
  msgs: any[] = [];
  searching = false;

  // selectedKhoXuat: NXOption;
  selectedThuoc: ThuocModel;
  khukbs = NhiXuanOptions.khukbs;
  khukhuXuatskbs = NhiXuanOptions.khukbs;

  selectedKhuXuat: NXOption;
  selectedKhoXuat: NXOption;
  khuXuats: NXOption[] = NhiXuanOptions.khukbs;
  khuXuatTN = NhiXuanOptions.khuXuatTN;
  khuXuatDVYT = NhiXuanOptions.khuXuatDVYT;
  khuXuatNS = NhiXuanOptions.khuXuatNS;

  cols: any[] = [];

  // tslint:disable-next-line:no-inferrable-types
  displayDialog: boolean = false;

  constructor(
    // private thuocService: ThuocService,
    private phieukbService: PhieukhambenhService,
    private phieuxuatService: PhieuxuatService,
    private messageService: MessageService,
    private appStore: AppStoreService,

  ) { }

  ngOnInit() {
    this.initProperties();
    this.initData();
  }

  initProperties() {
    this.ngayxuat = DateService.newUTCDate(new Date());
    this.xuatFrom = DateService.newUTCDate(new Date());
    this.xuatTo = DateService.newUTCDate(new Date());
    this.phieuxuat = new PhieuModel();
    this.phieuxuatForm = new PhieuxuatForm();
    this.cols = [
      { field: 'kho', header: 'Kho' },
      { field: 'khu', header: 'Khu' },
      { field: 'exported_at', header: 'Ngày xuất' },
    ];
  }

  initData() {
    this.getAllPhieuxuats();
  }

  getAllPhieuxuats() {
    this.phieuxuatService.getAllPhieuxuats().subscribe(
      res => {
        this.listphieuxuatModel = res.data;
        this.mapTableData();
      },
      err => {
        console.log(err);
      }
    );
  }

  xemDanhSach() {
    const from = DateService.newUTCDate(this.phieuxuatForm.exported_at);
    const to = DateService.newUTCDate(from);
    if (this.phieuxuatForm.khu === undefined || this.phieuxuatForm.khu.id === '0') {
      this.phieukbService.getPhieukhambenhsByDates(from, to).subscribe(
        res => {
          // this.exportTotal = 0;
          this.phieuYCKBs = res.data;
          this.buildYCDataTable();
          this.searching = false;
        },
        err => {
          this.searching = false;
          // this.addSingle('error', 'Lỗi', 'Không kết nối được CS Dữ liệu')
          return;
        });
    } else {
      this.phieukbService.getPhieukhambenhsByKhu(this.phieuxuatForm.khu.id, from, to).subscribe(
        res => {
          // this.exportTotal = 0;
          this.phieuYCKBs = res.data;
          this.buildYCDataTable();
          this.searching = false;
        },
        err => {
          this.searching = false;
        }
      );
    }
  }

  xuat() {
    if (this.validateForm()) {
      return;
    }
    this.parsePhieuxuatToModel();
    this.phieuxuatService.addPhieuxuat(this.phieuxuat).subscribe(
      res => {
        console.log(res);
        this.listphieuxuatModel = res.data;
        this.mapTableData();
        this.resetForm();
        this.addSingle('success', 'Thành công', 'Đã thêm phiếu');
      },
      err => {
        this.addSingle('error', 'Lỗi server', 'Thất bại');
        console.log(err);
      }
    );
  }

  mapTableData() {
    this.listphieuxuatTable = this.listphieuxuatModel.map(phieu => {
      const row: any = { ...phieu };
      const kho: NXOption = JSON.parse(phieu.kho);
      if (kho) {
        row.kho = kho.name;
      }
      if (phieu.khu) {
        const khu: NXOption = JSON.parse(phieu.khu);
        row.khu = khu.name;
      }
      row.exported_at = DateService.getDDMMYYY(row.exported_at);
      return row;
    });
  }

  resetForm() {
    this.targetYCKBs = [];
    this.listYCRow = [];
    this.phieuxuat = new PhieuModel();
  }

  parsePhieuxuatToModel() {
    // this.phieuxuat.kho = JSON.stringify(this.phieuxuatForm.kho);
    this.phieuxuat.khu = JSON.stringify(this.phieuxuatForm.khu);
    // this.phieuxuat.listRecord = JSON.stringify(this.targetYCKBs);
    this.phieuxuat.type = -1;
    this.phieuxuat.user = this.appStore.getAuth()['username'];
    let khu = JSON.stringify(this.phieuxuatForm.khu);
    let kho = JSON.stringify(NhiXuanUtil.timKho(this.phieuxuatForm.khu));
    this.phieuxuat.kho = kho;
    this.phieuxuat.shd = DateService.getDDMMYYY(this.phieuxuat.exported_at)
        + _.get(this, 'phieuxuatForm.khu.id');
    let rdModel: any = {...this.phieuxuat}
    // parse record list
    this.phieuxuat.listRecordImportExportModel = this.targetYCKBs.map(rd => {
      const row: any = { ...rd };
      row.thuoc = rd.tenthuoc;
      // rd.taxplus = model.taxplus; // free from local
      row.kho = kho;
      row.khu = khu;
      row.exported_at = this.phieuxuat.exported_at;
      row.type = this.phieuxuat.type;
      row.shd = this.phieuxuat.shd;
      // dongia waiting for disscusing
      // must define a thuoc will be get from which phieunhap by shd;
      // ==> dongia, soluongton maybe set at BE side
      // soluongton
      console.log('row to xuat: ', row);
      
      return row;
    });    
  }

  parsePhieuxuatToForm() {
    this.phieuxuat = this.listphieuxuatModel.filter(phieu => {
      return phieu.id === this.phieuxuatTable.id;
    })[0];
    const phieu: any = { ...this.phieuxuat };
    phieu.kho = JSON.parse(this.phieuxuat.kho);
    phieu.khu = JSON.parse(this.phieuxuat.khu);
    // this.targetYCKBs = JSON.parse(this.phieuxuat.listRecord);
    this.phieuxuatForm = { ...phieu };
  }

  validateForm() {
    return false;
  }

  xemThongkeXuat() {

  }

  timPhieuXuat() {
    if (this.phieuxuatForm.kho) {
      this.getAllPhieuxuats();
    } else {
      if (this.phieuxuatForm.khu) {
        this.phieuxuatService.getPhieuxuatByKhuAndDates(this.xuatFrom, this.xuatTo, this.phieuxuatForm.khu.id).subscribe(
          res => {
            this.listphieuxuatModel = res.data;
            this.mapTableData();
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }

  changeKho(isImport = false) {
    this.loadKhuXuatsOption(isImport);
    // this.getToncu(this.selectedThuoc.id, this.selectedKhoXuat.id, false);
  }

  changeKhu() {
  }

  loadKhuXuatsOption(isImport = false) {
    const kho = this.phieuxuatForm.kho;
    // if (!isImport) {
    //   kho = this.selectedKhoXuat;
    // }

    if (kho === undefined || kho.id === '0') {
    } else if (kho.id === 'KTN') {
      this.khuXuats = this.khuXuatTN;
    } else if (kho.id === 'DVY') {
      this.khuXuats = this.khuXuatDVYT;
    } else {
      this.khuXuats = this.khuXuatNS;
    }
  }

  // Lĩnh thuốc thường
  buildYCDataTable() {
    this.listYCcols = [
      { field: 'stt', header: 'STT' },
      // { field: 'mathuoc', header: 'mathuoc' },
      { field: 'tenthuoc', header: 'Tên thuốc' },
      { field: 'soluong', header: 'Số lượng' },
      { field: 'unit', header: 'Đơn vị' },
    ];
    this.listYCRow = [];

    let i = 0;
    this.phieuYCKBs.forEach((phieu, idx) => {
      const dts = JSON.parse(phieu.donthuocjs);
      if (dts !== undefined) {
        console.log('=====linh thuoc thuong=====phieu=' + idx + '=========================');
        console.log(phieu);
        console.log('====================================');
      }
      // build row linh thuoc thuong, each row is thuoc need to yc
      dts.forEach(dt => {
        if (dt.selectedThuoc === undefined) { // thuoc trong don thuoc
        } else {
          // Tìm danh thuốc cần của tất cả bnhan
          const tent = dt.selectedThuoc.tenThuoc;
          const thuocCu = this.listYCRow.filter(e => {
            return e['tenthuoc'] === tent;
          })[0];

          if (thuocCu === undefined) { // new thuoc need to yc
            let thuocMoi = {};
            if (dt.cachdung) {
              if (dt.cachdung.type === 1) {
                thuocMoi = {
                  'stt': ++i,
                  'tenthuoc': tent,
                  'unit': dt.selectedThuoc.unit,
                  'soluong': (dt.sang + dt.chieu + dt.toi) * dt.songay,
                  'type': dt.selectedThuoc.type
                };
              } else {
                thuocMoi = {
                  'stt': ++i,
                  'tenthuoc': tent,
                  'unit': dt.selectedThuoc.unit,
                  'soluong': dt.ton,
                  'type': dt.selectedThuoc.type
                };
              }
            }
            if (thuocMoi['tenthuoc']) {
              this.listYCRow.push(thuocMoi);
            }
          } else {
            if (dt.cachdung) {
              if (dt.cachdung.type === 1) {
                thuocCu['soluong'] += (dt.sang + dt.chieu + dt.toi) * dt.songay;
              } else {
                thuocCu['soluong'] += dt.ton;
              }
            }
          }

        }
      });
    });

    console.log('---buildYCDataTable----listYCRow: ', this.listYCRow);
  }

  xemChiTietPhieu() {

  }

  onRowSelect(e) {
    this.displayDialog = true;
    console.log('------------> listphieuxuatTable: ', this.listphieuxuatTable);

  }

  cancelDel() {
    this.displayDialog = false;
  }

  editPhieu() {
    this.displayDialog = false;
    // this.acctionAdd = false;
    // this.phieukhambenh.sohoso = this.selectedPhieu.sohoso;
    // this.updateForm(this.acctionAdd); // edit mode
    // this.checkValidButtons();
    this.parsePhieuxuatToForm();
  }

  delete() {
    this.clearMsg();
    this.displayDialog = false;
    this.phieuxuatService.deletePhieuxuat(this.phieuxuatTable.id).subscribe(
      res => {
        this.listphieuxuatModel = res.data;
        this.mapTableData();
        this.addSingle('success', 'Thành công', 'Đã xóa');
      },
      err => {
        this.addSingle('error', 'Lỗi Server', 'Không xóa được');
      }
    );
    this.resetForm();
  }


  addSingle(type, summary, detail) {
    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.messageService.add({ severity: type, summary: summary, detail: detail });
  }

  addMultiple() {
    this.messageService.addAll([{
      severity: 'success', summary: 'Service Message',
      detail: 'Via MessageService'
    }, { severity: 'info', summary: 'Info Message', detail: 'Via MessageService' }]);
  }

  clearMsg() {
    this.messageService.clear();
  }

}
