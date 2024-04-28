import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../../shared/model/patient.model ';
import { PatientService } from '../../../shared/services/patient.service';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { PhieukhambenhService } from '../../../shared/services/phieukhambenh.service';
import { MessageService } from 'primeng/api';
import { DateService } from '../../../shared/services/date.util.service';
import { NhiXuanUtil } from '../../../shared/utils/nhixuan_utils';
import { ExportExcelOption, ISummaryModel, NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { ExcelUtil } from '../../../shared/utils/excel-util';
import { RecordeImportExportService } from '../../../shared/services/record-import-export.service';
import { BNDungThuocModel } from '../../../shared/model/BNDungThuocModel';

@Component({
  selector: 'app-patient-report',
  templateUrl: './patient-report.component.html',
  styleUrls: ['./patient-report.component.scss']
})
export class PatientReportComponent implements OnInit {

  msgs: any[] = [];
  searching = false;
  exporting = false;
  cols: any[];
  colsHV: any[] = [];
  listHV: any[] = [];

  colsHVTheongay: any[] = [];
  listHVTheongay: any[] = [];
  listHVTheongayExport: any[] = [];

  colsPkbs: any[] = [];
  listPkb: any[] = [];
  kho: NXOption;
  khoNhaps = NhiXuanOptions.khoNhaps;
  theodoiFrom: Date = new Date();
  theodoiTo: Date = new Date();

  rowGroupMetadata: any;
  tkTheoDoiTTCols: any[] = [];
  tkTheoDoiTTRows: BNDungThuocModel[] = [];
  sumamryData: ISummaryModel[] = [];
  TTT: number;

  patients: PatientModel[] = [];
  selectedPatient: PatientModel = null;
  rowSelected: any;
  pkbSelected: any;

  constructor(
    private patientService: PatientService,
    private thuocService: ThuocService,
    private phieukbService: PhieukhambenhService,
    private messageService: MessageService,
    private recordService: RecordeImportExportService
  ) { }

  ngOnInit() {
    this.selectedPatient = new PatientModel();
    this.searching = false;
    this.theodoiFrom = DateService.newUTCDate(new Date());
    this.theodoiTo = DateService.newUTCDate(new Date());
    this.kho = this.khoNhaps[this.khoNhaps.length - 1];
    // rie.thuoc, t.tenthuoc, t.unit, rie.dongia, sum(rie.soluong), (sum(rie.soluong) * rie.dongia) as thanhtien
    this.tkTheoDoiTTCols = [
      // { field: 'stt', header: 'STT' },
      { field: 'thuoc', header: 'Mã Thuốc' },
      { field: 'typename', header: 'Loại' },
      { field: 'tenThuoc', header: 'Tên Thuốc' },
      { field: 'unit', header: 'Đơn Vị' },
      { field: 'dongia', header: 'Đơn giá' },
      { field: 'soluong', header: 'Số lượng' },
      { field: 'thanhtien', header: 'Thành tiền' },
    ];

    // mabenhnhan, fullname, khu, 
    // tienthuoc, sa, xq, xn, dt,  tong
    this.colsHV = [
      { field: 'mabenhnhan', header: 'Mã HV' },
      { field: 'fullname', header: 'Tên' },
      { field: 'khu', header: 'Khu' },
      { field: 'ngaykham', header: 'Ngày khám' },
      { field: 'tienthuoc', header: 'Tiền thuốc' },
      { field: 'sa', header: 'sa' },
      { field: 'xq', header: 'xq' },
      { field: 'xn', header: 'xn' },
      { field: 'dt', header: 'dt' },
      // { field: 'tienth', header: 'tienth' },
      { field: 'tong', header: 'Tổng' }
    ];

    this.colsPkbs = [...this.colsHV];
    // this.colsPkbs.splice(3, 0, {field: 'ngaykham', header: 'Ngày khám'})

    this.tkTheoDoiTTRows = [];

    // tienthuoc, sa, xq, xn, dt,  tong
    this.colsHVTheongay = [
      { field: 'mabenhnhan', header: 'Mã HV' },
      { field: 'fullname', header: 'Tên' },
      { field: 'birth_year', header: 'Năm Sinh' },
      { field: 'ngaykham', header: 'Ngày khám' },
      { field: 'tienthuoc', header: 'Tiền thuốc' }
    ];

    this.patientService.getAllServerPatients().subscribe(
      res => {
          this.patients = res.data;
          return [...this.patients];
      },
      err => {
          console.log(err);
          return this.patients;
      }
    );
  }

  // xem tinh tien thuoc thuong 1 benh nhan
  xemBaoCao() {
    this.recordService.getTongHopDungThuoc(this.selectedPatient.patientId,
      this.theodoiFrom, this.theodoiTo).subscribe(
        res => {
          this.tkTheoDoiTTRows = NhiXuanUtil.mapDataTable(res.data, this.tkTheoDoiTTCols);
          this.updateRowGroupMetaData();
          this.sumamryData = res.dataExt.summary;
        }
    );

    // this.phieukbService.getPatientTTTT(this.selectedPatient.patientId,
    //   this.theodoiFrom, this.theodoiTo).subscribe(
    //     res => {
    //       this.tkTheoDoiTTRows = this.mapDataTable(res.data, this.tkTheoDoiTTCols);
    //     }
    // );
    
    this.phieukbService.getTinhTienBN(this.selectedPatient.patientId, this.theodoiFrom, this.theodoiTo).subscribe(
      res => {
        this.listPkb = NhiXuanUtil.mapDataTable(res.data, this.colsPkbs);
        this.TTT = 0;
        this.listPkb.forEach(pkb => {
          this.TTT += pkb.tong;
        })
      }
    );
  }

  // tinh tien kham benh cua 1 benh nhan 
  xemTT() {
    this.phieukbService.getPatientsReportTT(this.kho.id, this.theodoiFrom, this.theodoiTo).subscribe(
      res => {
        this.listHV = NhiXuanUtil.mapDataTable(res.data, this.colsHV);
        
      }
    );
  }  

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.tkTheoDoiTTRows) {
      let stt = 0;
        for (let i = 0; i < this.tkTheoDoiTTRows.length; i++) {
            let rowData = this.tkTheoDoiTTRows[i];
            let typename = rowData.typename;
            if (i == 0) {
                this.rowGroupMetadata[typename] = { index: 0, size: 1, stt: stt };
            }
            else {
                let previousRowData = this.tkTheoDoiTTRows[i - 1];
                let previousRowGroup = previousRowData.typename;
                if (typename === previousRowGroup)
                    this.rowGroupMetadata[typename].size++;
                else {
                  stt++;
                  this.rowGroupMetadata[typename] = { index: i, size: 1, stt: stt };
                }
            }
        }
    }
    console.log('-------------rowGroupMetadata----', this.rowGroupMetadata);
    
  }
  onRowSelect() {

  }

  onRowSelectPkb() {

  }
  exportDSTT() {
    // ExcelUtil.exportExcell(this.selectedPatient.fullname + ' - DS thuốc ', this.tkTheoDoiTTRows);
    this.recordService.exportBNDungThuocToExcel(this.selectedPatient.patientId,
      this.theodoiFrom, this.theodoiTo).subscribe(
        res => {
          // this.tkTheoDoiTTRows = NhiXuanUtil.mapDataTable(res.data, this.tkTheoDoiTTCols);
          // this.updateRowGroupMetaData();
          const urlDownload = 'http://smartevn.com:8083/download/' + this.selectedPatient.patientId + '.xlsx';
          console.log("========================" + urlDownload + "===================================" + urlDownload);
          window.location.href = urlDownload;
        }
    );
  }

  exportDSHV(title: string) {
    ExcelUtil.exportExcell('DS ' + title, this.listHV);
  }
  
  // tinh tien kham benh cua 1 benh nhan 
  xemTHTheongay() {
    this.searching = true;
    this.phieukbService.getTHTienThuocTheoNgay(this.kho.id, this.theodoiFrom, this.theodoiTo).subscribe(
      res => {
        this.listHVTheongayExport = [...res.data];
        this.listHVTheongay = NhiXuanUtil.mapDataTable(res.data, this.colsHVTheongay);
        this.searching = false;
      }, err => {
        this.searching = false;
      }
    );
  }
  exportTHTienthuocTheongay() {
    this.exporting = true;
    // ExcelUtil.exportExcell('TongHopTienThuocTheoNgay-' + this.kho.id, this.listHVTheongay);
    let opts: ExportExcelOption = new ExportExcelOption();
    opts.fileName = "TongHopTienThuocTungNgay.xlsx";
    opts.tkFrom = this.theodoiFrom;
    opts.tkTo = this.theodoiTo;
    opts.objId = this.kho.name.toUpperCase();
    opts.type = 5;
    opts.sheetHeader = 'TỔNG HỢP TIỀN THUỐC THEO TỪNG NGÀY ' ;
    opts.sheetName = 'THTTNgay'
    this.listHVTheongayExport.forEach((item) => {
      let dt = new Date(item[3]);
      item[3] = DateService.getDDMMYYY(dt);
    })
    this.recordService.exportTHTienthuocTungNgay(opts, this.listHVTheongayExport).subscribe(
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

  changeKho() {}
  onTabChange() { }
  changePatient() {
    this.theodoiFrom = DateService.parseImportted_At(this.selectedPatient.imported_at)
    this.xemBaoCao();
  }

}
