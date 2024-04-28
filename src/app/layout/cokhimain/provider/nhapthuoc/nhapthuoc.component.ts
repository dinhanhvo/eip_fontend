import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RecordModel, PhieunhapForm, PhieuModel, RecordImportExportForm } from '../../../../shared/model/import.model';
import { PhieunhapService } from '../../../../shared/services/phieunhap.service';
import { ThuocService } from '../../../../shared/services/thuoc.service';
import { ProviderService } from '../../../../shared/services/provider.service';
import { ThuocModel } from '../../../../shared/model/thuoc.model';
import { ProviderModel } from '../../../../shared/model/provider.model';
import { DateService } from '../../../../shared/services/date.util.service';
import { NhiXuanOptions, NXOption } from '../../../../shared/common/selectitem';
import { ExcelUtil } from '../../../../shared/utils/excel-util';
import { AppStoreService } from '../../../../shared';
import { NhiXuanUtil } from '../../../../shared/utils/nhixuan_utils';

@Component({
  selector: 'app-nhapthuoc',
  templateUrl: './nhapthuoc.component.html',
  styleUrls: ['./nhapthuoc.component.scss']
})

export class NhapthuocComponent implements OnInit {
  id: number;
  numsThuoc = 0;
  chitietThuoc: any;
  // phieunhapModel: PhieunhapModel;
  khoNhaps = NhiXuanOptions.khoNhaps;
  phieuModel: PhieuModel;
  phieunhapForm: PhieunhapForm;
  phieunhapTable: any;
  listphieunhapModel: PhieuModel[] = [];
  listChiTietThuoc: any[] = [];
  listphieunhapTable: any[] = [];
  recordImportModel: RecordModel;
  listRecordImport: RecordImportExportForm[] = [];
  listRecordImportTable: RecordModel[] = [];
  provider: ProviderModel;
  // for searching
  selectedKhoNhap: NXOption;
  selectedThuoc: ThuocModel;
  nhapFrom: Date;
  nhapTo: Date;
  currenDate = new Date();

  thuocs: ThuocModel[] = [];
  listProvider: ProviderModel[] = [];
  cols: any[] = [];
  colsReport: any[] = [];
  colsHoaDonDetail: any[] = [];
  colsThuocDetail: any[] = [];
  displayDialog: boolean;
  // tslint:disable-next-line:no-inferrable-types
  newImport: boolean = true;

  tabIndex = 0;
  user = '';

  constructor(
    private messageService: MessageService,
    private thuocService: ThuocService,
    private providerService: ProviderService,
    private phieunhapService: PhieunhapService,
    private appStore: AppStoreService,
  ) { }

  ngOnInit() {
    this.initProperties();
    this.initData();
  }

  initProperties() {
    this.phieuModel = new PhieuModel();
    this.phieunhapForm = new PhieunhapForm();
    this.phieunhapForm.kho = this.khoNhaps[0];
    this.selectedThuoc = undefined;
    this.addRecord();
    this.cols = [
      { field: 'shd', header: 'Số HĐ' },
      { field: 'mst', header: 'MST' },
      { field: 'name', header: 'Tên Công Ty' },
      { field: 'mact', header: 'Mã Công Ty' },
      { field: 'imported_at', header: 'Ngày Nhập' },
      { field: 'sdt', header: 'SĐT' },
      { field: 'kho', header: 'Kho' },
    ];

    this.colsReport = [
      { field: 'shd', header: 'Số HĐ' },
      // { field: 'mst', header: 'MST' },
      { field: 'mact', header: 'Mã Công Ty' },
      { field: 'name', header: 'Tên Công Ty' },
      { field: 'imported_at', header: 'Ngày Nhập' },
      { field: 'kho', header: 'Kho' },
      { field: 'total', header: 'Tổng' },
    ];

    this.colsHoaDonDetail = [
      { field: 'mathuoc', header: 'Mã thuốc' },
      { field: 'tenthuoc', header: 'Tên thuốc' },
      { field: 'unit', header: 'Đơn vị' },
      { field: 'dongia', header: 'Đơn giá' },
      { field: 'taxplus', header: '+Tax' },
      { field: 'soluong', header: 'Số lượng' },
      { field: 'thanhtien', header: 'Thành tiền' },
      { field: 'solo', header: 'Số lô' },
      { field: 'ngayhh', header: 'Ngày hết hạn' },
    ];

    this.colsThuocDetail = [
      { field: 'id', header: 'Thứ tự' },
      { field: 'kho', header: 'Kho' },
      { field: 'mathuoc', header: 'Mã thuốc' },
      { field: 'thuoc', header: 'Tên thuốc' },
      { field: 'unit', header: 'Đơn vị' },
      // { field: 'dongia', header: 'Đơn giá' },
      { field: 'taxplus', header: 'Giá' },
      { field: 'soluong', header: 'Số lượng' },
      { field: 'thanhtien', header: 'Thành tiền' },
      { field: 'solo', header: 'Số lô' },
      { field: 'shd', header: 'Số Hóa Đơn' },
      { field: 'imported_at', header: 'Ngày nhập' },
      { field: 'ngayhh', header: 'Ngày hết hạn' },
    ];


  }

  initData() {
    this.user = this.appStore.getAuth()['username'];
    this.nhapFrom = DateService.newUTCDate(new Date());
    this.nhapTo = this.nhapFrom;

    this.thuocService.getAllThuocs().subscribe(
      res => {
        this.thuocs = res.data;
      },
      err => {
        console.log(err);
      }
    );
    // this.listRecordImport
    this.providerService.getAllProviders().subscribe(
      res => {
        this.listProvider = res.data;
      },
      err => {
        console.log(err);
      }
    );

    this.phieunhapService.getAllPhieunhaps().subscribe(
      res => {
        this.listphieunhapModel = res.data;
        this.mapTableData();
      },
      err => {
        console.log(err);
      }
    );
  }

  onTabChange(e) {
    this.newImport = true;
    this.phieunhapForm = new PhieunhapForm();
    this.tabIndex = e.index;
  }

  timPhieu(isNhap: boolean) {
    if (this.selectedKhoNhap && this.selectedKhoNhap.id !== '0') {
      this.phieunhapService.getPhieunhapByKhoAndDates(this.nhapFrom, this.nhapTo, this.selectedKhoNhap.id).subscribe(
        res => {
          this.listphieunhapModel = res.data;
          this.mapTableData();
        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Không lấy được dữ liệu');
        }
      );
    } else {
      this.phieunhapService.getPhieunhapByDates(this.nhapFrom, this.nhapTo).subscribe(
        res => {
          this.listphieunhapModel = res.data;
          this.mapTableData();
        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Không lấy được dữ liệu');
        }
      );
    }
  }

  clear() {
    this.initProperties();
  }

  xemBaoCaoNhap() {
    if (this.phieunhapForm.provider === undefined) {
      this.phieunhapForm.provider = new ProviderModel();
      this.phieunhapForm.provider.mact = '0';
    }

    if (this.phieunhapForm.solo === undefined) {
      this.phieunhapForm.solo = '';
    }
    if (this.phieunhapForm.shd === undefined) {
      this.phieunhapForm.shd = '';
    }

    let maThuoc = '';
    if (this.selectedThuoc) {
      maThuoc = this.selectedThuoc.maThuoc;
    }

    let khoId = this.phieunhapForm.kho ? this.phieunhapForm.kho.id : '0';

    this.phieunhapService.getThongKeNhap(this.phieunhapForm.provider.mact,
      this.phieunhapForm.shd, this.phieunhapForm.solo,
      this.nhapFrom, this.nhapTo, khoId, maThuoc).subscribe(
        res => {
          this.listphieunhapModel = res.data;
          this.mapTableData();
          // this.listphieunhapModel = NhiXuanUtil.mapDataTable(res.data, this.colsHoaDonDetail);
        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Không lấy được dữ liệu');
        }
    );
    
    this.phieunhapService.getThongKeChiTietThuocNhap(
      this.nhapFrom, this.nhapTo, khoId, maThuoc, this.phieunhapForm.provider.mact).subscribe(
        res => {
          this.listChiTietThuoc = this.mapDataTable2(res.data, this.colsThuocDetail);
          console.log('-------------', this.listChiTietThuoc);
          
        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Không lấy được dữ liệu');
        }
    );
    
  }

  mapDataTable2(resData, cols: any[]): any[] {
    return resData.map((row, i) => {
      let r = new Object();
      cols.forEach((col, j) => {
        r[col.field] = row[j];
      });
      // console.log('------report row: ', r);
      return r;
    });
  }

  mapTableData() {
    this.listphieunhapTable = this.listphieunhapModel.map(phieu => {
      const row: any = { ...phieu };

      let provider: ProviderModel;
      try {
        provider = JSON.parse(phieu.provider);
      } catch (error) {
        provider = this.listProvider.find(prv => prv.mact === phieu.provider);
      }
      if (provider) {
        row.mact = provider.mact;
        row.name = provider.name;
        row.address = provider.address;
        row.sdt = provider.sdt;
        row.mst = provider.mst;
      }
      row.imported_at = DateService.getDDMMYYY(phieu.imported_at);
      row.kho = phieu.kho;
      return row;
    });
  }

  mapTableDetail() {
    // this.provider = JSON.parse(this.phieuModel.provider);
    // this.selectedKhoNhap = JSON.parse(this.phieuModel.kho);
    this.listRecordImportTable = this.phieuModel.listRecordImportExportModel.map(record => {
      const rt: any = { ...record };
      const thuoc: ThuocModel = JSON.parse(record.thuoc);
      rt.mathuoc = thuoc.maThuoc;
      rt.tenthuoc = thuoc.tenThuoc;
      rt.unit = thuoc.unit;
      rt.ngayhh = DateService.getDDMMYYY(record.ngayhh);
      return rt;
    });
    console.log('==== listRecordImportTable: ', this.listRecordImportTable);
  }

  nhap() {
    if (this.validateForm()) {
      return;
    }
    this.parsePhieunhapToModel();
    // let list: RecordModel[] = JSON.parse(this.phieunhapModel.listRecordImport);
    this.phieunhapService.addPhieunhap(this.phieuModel).subscribe(
      res => {
        console.log(res);
        this.listphieunhapModel = res.data;
        this.mapTableData();
        this.resetForm();
        this.addSingle('success', 'Thành công', 'Đã thêm phiếu');
      },
      err => {
        this.addSingle('error', 'Thất bại', 'Lỗi không kết nối tới server');
        console.log(err);
      }
    );
  }

  parsePhieunhapToModel() {
    const model: any = { ...this.phieunhapForm };
    model.provider = this.phieunhapForm.provider.mact;

    model.soluongton = model.soluong;
    model.type = 1; // import
    // parse record list
    let total = 0;
    model.listRecordImportExportModel = this.phieunhapForm.listRecordImportExportModel.map(rd => {
      const row: any = { ...rd };
      row.thuoc = rd.thuoc.maThuoc;
      // row.taxplus = model.taxplus;
      row.kho = model.kho.id;
      row.shd = model.shd;
      row.type = 1;
      total += rd.thanhtien;
      return row;
    });
    model.imported_at = DateService.newUTCDate(this.phieunhapForm.imported_at);
    model.kho = model.kho.id; // JSON.stringify(model.kho);
    model.user = this.appStore.getAuth()['username'];
    model.total = total;
    this.phieuModel = { ...model };
  }

  parsePhieunhapToForm() {
    const phieu: any = { ...this.phieuModel };
    phieu.provider = this.listProvider.find(pr => pr.mact = this.phieuModel.provider);
    phieu.kho = this.khoNhaps.find(k => phieu.kho === k.id);
    const list = this.phieuModel.listRecordImportExportModel;
    if (list) {
      phieu.listRecordImportExportModel = list.map(record => {
        const rd: any = { ...record };
        rd.ngayhh = DateService.newUTCDate(rd.ngayhh);
        rd.thuoc = this.thuocs.find(t => t.maThuoc === record.thuoc);
        if (rd.thuoc !== undefined) {
          rd.tenthuoc = rd.thuoc.tenThuoc;
          rd.mathuoc = rd.thuoc.maThuoc;
          rd.unit = rd.thuoc.unit;
        }
        return rd;
      });
    }
    phieu.imported_at = DateService.newUTCDate(this.phieuModel.imported_at);
    this.phieunhapForm = { ...phieu };
    this.tinhTotal();
  }

  onRowSelect(e) {
    this.displayDialog = true;
    this.phieuModel = this.listphieunhapModel.find(phieu => phieu.shd === this.phieunhapTable.shd);
  }

  onChiTietThuocRowSelect(e) {}
  cancelDel() {
    this.displayDialog = false;
  }

  editPhieu() {
    this.newImport = true;
    this.parsePhieunhapToForm();
    this.displayDialog = false;
  }

  delete() {
    this.clearMsg();
    this.displayDialog = false;
    this.phieunhapService.deletePhieunhap(this.phieunhapTable.id).subscribe(
      res => {
        this.listphieunhapModel = res.data;
        this.mapTableData();
        this.addSingle('success', 'Thành công', 'Đã xóa');
      },
      err => {
        this.addSingle('error', 'Lỗi Server', 'Không xóa được');
      }
    );
    this.resetForm();
  }

  xemChiTietPhieu() {
    this.newImport = false;
    this.displayDialog = false;
    // this.listRecordImport = JSON.parse(this.phieunhapTable.listRecordImportExportModel);
    this.parsePhieunhapToForm();
    // this.mapTableDetail();
  }

  exportDanhsachNhap() {
    ExcelUtil.exportExcell('DS phiếu nhập', this.listphieunhapTable);
  }


  resetForm() {
    this.newImport = true;
    this.phieuModel = new PhieuModel();
    this.phieunhapForm = new PhieunhapForm();
    this.addRecord();
  }

  validateForm() {
    const ret = true;
    if (!this.phieunhapForm.kho || this.phieunhapForm.kho.id == '0') {
      this.addSingle('error', 'Lỗi nhập', 'Chưa chọn kho');
      return ret;
    }
    if (!this.phieunhapForm.provider || this.phieunhapForm.provider.mact == '0') {
      this.addSingle('error', 'Lỗi nhập', 'Chưa chọn Công Ty');
      return ret;
    }
    if (this.phieunhapForm.tax < 0) {
      this.addSingle('error', 'Lỗi nhập', 'Số lượng phải lớn hơn 0');
      return ret;
    }

    // if (!this.phieunhapForm.shd) {
    //   this.addSingle('error', 'Lỗi nhập', 'Chưa có Số hóa đơn');
    //   return ret;
    // }

    if (this.checkExprise()) {
      this.addSingle('error', 'Lỗi nhập', 'Thuốc hết hạn');
      return ret;
    }
    return false;
  }

  checkExprise() {
    const ret = false;
    this.listRecordImport.forEach(rd => {
      if (rd.ngayhh < this.phieunhapForm.imported_at) {
        return true;
      }
    });
    return false;
  }

  changeThuoc() {

  }

  changeNumThuoc() {
    this.listRecordImport = [];
    this.phieunhapForm.listRecordImportExportModel = [];
    const num: number = this.phieunhapForm.numThuocs;
    for (let i = 0; i < num; i++) {
      this.addRecord();
    }
  }

  addRecord() {
    const rd = new RecordImportExportForm();
    this.phieunhapForm.listRecordImportExportModel.push(rd);
    this.phieunhapForm.numThuocs = this.phieunhapForm.listRecordImportExportModel.length;
    this.tinhTotal();
  }

  removeRecord() {
    this.phieunhapForm.listRecordImportExportModel.pop();
    this.phieunhapForm.numThuocs = this.phieunhapForm.listRecordImportExportModel.length;
    this.tinhTotal();
  }

  spliceRecord(i) {
    this.phieunhapForm.listRecordImportExportModel.splice(i, 1);
    this.tinhTotal();
  }

  xemPdf() {
  }

  generatePdf(action = 'open') {
  }

  tinhPlusTax(record: RecordImportExportForm): number {
    record.taxplus = Number.parseFloat(record.dongia.toString())
      + Number.parseFloat((record.dongia * this.phieunhapForm.tax / 100).toString());
    return record.taxplus;
  }

  tinhThanhTien(record: RecordImportExportForm) {
    record.taxplus = this.tinhPlusTax(record);
    record.thanhtien = record.taxplus * record.soluong;
    // return ret;
  }

  changeSoluongNhap() {
    this.tinhTotal();
  }

  tinhTotal() {
    this.phieunhapForm.total = 0;
    this.phieunhapForm.listRecordImportExportModel.forEach((record, i) => {
      record.thanhtien = this.tinhPlusTax(record) * record.soluong;
      this.phieunhapForm.total = this.phieunhapForm.total + record.thanhtien;
    });
  }

  setTon() {
    const sl = 1000000, dg = 100, tax = 0.1, type = 1;
    this.khoNhaps.forEach((kho, index) => {
      let phieunhap = new PhieuModel();
      // const kho = this.khoNhaps[0];
      let j = index;
      if (j > 2) j = 2;
      phieunhap.provider = JSON.stringify(this.listProvider[j]);
      console.log('========== them cho kho: ', kho);

      phieunhap.shd = 'shdtest' + index;
      phieunhap.type = type;
      phieunhap.kho = JSON.stringify(kho);
      phieunhap.imported_at = DateService.newUTCDate('2020-06-14T07:02:47.027Z');
      phieunhap.listRecordImportExportModel = [];
      // them all thuocs into eache kho
      this.thuocs.forEach((t, i) => {
        const rd = new RecordModel();
        rd.thuoc = JSON.stringify(t);
        rd.soluong = sl;
        rd.soluongton = sl;
        rd.dongia = dg;
        rd.kho = JSON.stringify(kho);
        rd.taxplus = (rd.dongia + rd.dongia * tax);
        rd.thanhtien = sl * rd.taxplus;
        rd.type = type;
        rd.phieu_id = 1;
        rd.shd = phieunhap.shd;
        rd.ngayhh = new Date('2020-09-24T07:02:47.027Z');
        phieunhap.listRecordImportExportModel.push(rd);
      });

      // phieunhap.listRecord = JSON.stringify(phieunhap.listRecordImportExportModel);
      this.phieunhapService.addPhieunhap(phieunhap).subscribe(
        res => {
          console.log(res);
          this.listphieunhapModel = res.data;
          this.mapTableData();
          this.resetForm();
          this.addSingle('success', 'Thành công', 'Đã thêm phiếu');
        },
        err => {
          this.addSingle('error', 'Thất bại', 'Lỗi không kết nối tới server');
          console.log(err);
        }
      );
    });

  }

  exportThuocExcel() {
    ExcelUtil.exportExcell('Chi tiết nhập thuốc', this.listChiTietThuoc);
  }

  addSingle(type, summary, detail) {
    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.messageService.add({ severity: type, summary: summary, detail: detail });
  }
  clearMsg() {
    this.messageService.clear();
  }

  onDetailRowSelect() { };

  auto() {
    let model = this.phieunhapForm;
    model.shd = model.provider.mact + '_' + model.kho.id + '_' + DateService.getMMDDYYY(model.imported_at);
    this.removeRecord();
    // model.listRecordImportExportModel = []
    let total = 0;
    let dongia = 1000;
    if (model.provider.mact == 'svn') {
      dongia = 2000;
    } else if (model.provider.mact == 'adv') {
      dongia = 3000;
    } else if (model.provider.mact == 'codu') {
      dongia = 4000;
    }
    let soluong = 100;
    this.thuocService.getAllThuocs().subscribe(
      res => {
        let thuocs = res.data;
        thuocs.forEach(t => {
          let rd: RecordImportExportForm = new RecordImportExportForm();
          rd.thuoc = t;
          // const row: any = { ...rd };
          // row.thuoc = rd.thuoc.maThuoc;
          rd.dongia = dongia;
          rd.soluong = soluong;
          rd.solo = 'solo_' + model.shd;
          rd.taxplus = this.tinhPlusTax(rd);
          this.tinhThanhTien(rd);
          // row.kho = model.kho.id;
          // row.shd = model.shd;
          // row.type = 1;
          total += rd.thanhtien;
          model.listRecordImportExportModel.push(rd);
        });
      }, err => {

      }
    )
  }
}
