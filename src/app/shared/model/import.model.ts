import { NXOption, NhiXuanOptions } from '../../shared/common/selectitem';
import { ThuocModel } from './thuoc.model';
import { ProviderModel } from './provider.model';
import { DateService } from '../services/date.util.service';

export class PhieunhapForm {
  id: number;
  provider: ProviderModel;
  imported_at: Date;
  shd: string;
  solo: string;
  tax: number;
  numThuocs: number;
  listRecordImportExportModel: RecordImportExportForm[];
  total: number;
  tien: string;
  kho: NXOption;
  type: number;
  constructor() {
    this.imported_at = new Date();
    this.shd = '';
    this.tax = 10;
    this.numThuocs = 0;
    this.total = 0;
    this.type = 1;
    this.listRecordImportExportModel = [];
    // this.listRecordImportExportModel.push(new RecordImportExportForm());
  }
}

// xuat & nhap
export class PhieuModel {
  id: number;
  provider: string;
  kho: string; // nhap or xuat
  khu: string;
  shd: string;
  solo: string;
  imported_at: Date;
  exported_at: Date;
  tax: number;
  numThuocs: number;
  // listRecord: string; // nhap or xuat
  listRecordImportExportModel: RecordModel[]; // to insert into record table
  total: number;
  tien: string;
  type: number;
  user: string;
  constructor() {
    this.imported_at = DateService.newUTCDate(new Date());
    this.exported_at = DateService.newUTCDate(new Date());
    this.shd = '';
    this.tax = 0.1;
    this.numThuocs = 0;
    this.total = 0;
    this.type = -1; // xuat
    this.listRecordImportExportModel = [];
  }
}

export class PhieuxuatForm {
  id: number;
  provider: ProviderModel;
  exported_at: Date;
  shd: string;
  tax: number;
  numThuocs: number;
  listRecordImportExportModel: RecordImportExportForm[];
  total: number;
  tien: string;
  kho: NXOption;
  khu: NXOption;
  type: number;
  constructor() {
    this.provider = new ProviderModel();
    this.exported_at = DateService.newUTCDate(new Date());
    this.shd = '';
    this.tax = 0.1;
    this.numThuocs = 0;
    this.total = 0;
    this.type = -1;
    this.listRecordImportExportModel = [];
  }
}

export class RecordModel {
  id: number;
  phieu_id: number;
  pkb_id: number;
  shd: string;
  solo: string;
  thuoc: string;
  kho: string;
  khu: string;
  soluong: number;
  soluongton: number;
  dongia: number;
  taxplus: number;
  thanhtien: number;
  tiente: string;
  location: string;
  imported_at: Date;
  exported_at: Date;
  ngaysx: Date;
  ngayhh: Date;
  hansudung: number;
  type: number;
}

export class RecordImportExportForm {
  id: number;
  phieu_id: number;
  thuoc: ThuocModel; // json string
  kho: NXOption;
  khu: NXOption;
  dongia: number;
  taxplus: number;
  thanhtien: number;
  tiente: string;
  shd: string;
  solo: string;
  location: string;
  imported_at: Date;
  exported_at: Date;
  ngaysx: Date;
  ngayhh: Date;
  hansudung: number;
  description: string;
  soluong: number;
  soluongton: number;
  constructor() {
    this.ngayhh = DateService.newUTCDate(new Date());
    this.imported_at = DateService.newUTCDate(new Date());
    this.dongia = 0;
    this.thanhtien = 0;
    this.taxplus = 0;
    this.soluongton = 0;
    this.soluong = 0;
    // this.khonhap = NhiXuanOptions.khoNhaps[0];
  }
}

// unused
export class ImportModel {
  id: number;
  maphieu: string;
  type: number; // -1: xuat, 1: nhap
  thuoc_id: number;
  mathuoc: string;
  tenthuoc: string;
  donvi: string;
  dongia: number;
  tiente: string;
  kho_id: string; // nhap kho
  kho_name: string;
  khu_id: string; // xuat khu
  khu_name: string;
  // khu: NXOption;
  lonhap: string;
  maphieuxuat: string;
  loxuatId: number;
  location: string;
  ngaysx: Date;
  ngayhh: Date;
  hansudung: number;
  description: string;
  soluongnhap: number;
  soluongxuat: number;
  soluongton: number;
  imported_at: Date;
  exported_at: Date;
  user: string;
  image_path: string;
  constructor() {
    this.imported_at = new Date();
    this.exported_at = new Date();
    this.ngayhh = new Date();
    this.soluongton = 0;
    this.soluongnhap = 0;
    this.soluongxuat = 0;
  }
}
