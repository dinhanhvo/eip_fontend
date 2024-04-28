import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../../shared/model/patient.model ';
import { DateService } from '../../../shared/services/date.util.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import * as XLSX from 'xlsx';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { PatientService } from '../../../shared/services/patient.service';
import { MessageService } from 'primeng/api';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { PhieuModel, PhieunhapForm, RecordModel } from '../../../shared/model/import.model';
import { ProviderModel } from '../../../shared/model/provider.model';
import { ProviderService } from '../../../shared/services/provider.service';
import { PhieunhapService } from '../../../shared/services/phieunhap.service';
import { AppStoreService } from '../../../shared';
import { NhiXuanOptions } from '../../../shared/common/selectitem';


type AOA = any[][];

@Component({
  selector: 'app-parse-excel',
  templateUrl: './parse-excel.component.html',
  styleUrls: ['./parse-excel.component.scss']
})
export class ParseExcelComponent implements OnInit {

  phieuModel: PhieuModel;
  phieunhapForm: PhieunhapForm;
  provider: ProviderModel;
  listProvider: ProviderModel[] = [];
  khoNhaps = NhiXuanOptions.khoNhaps;

  msgs: Message[] = [];
  data: AOA = [[], []];
  listThuoc: ThuocModel[] = [];
  tbData: any[] = [];
  from: 0;
  to: 10;
  col: 0;
  dtFilter: any[] = [];
  insertedThuocs: ThuocModel[] = [];
  colfts: any[] = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: 'exportExcelFile.xlsx';
  cols: any[] = [];

  constructor(
    private thuocService: ThuocService,
    private messageService: MessageService,
    private providerService: ProviderService,
    private phieunhapService: PhieunhapService,
    private appStore: AppStoreService,
  ) { }

  ngOnInit() {

    this.colfts = [
      1,2, 3, 4, 5, 6, 7
    ];
    this.phieuModel = new PhieuModel();
    this.phieunhapForm = new PhieunhapForm();
    this.phieunhapForm.kho = this.khoNhaps[1];
    this.phieunhapForm.tax = 0;
    

    this.thuocService.getAllThuocs().subscribe(
      res => {
        this.listThuoc = res.data;
      }, err => {}
    );
    this.providerService.getAllProviders().subscribe(
      res => {
        this.listProvider = res.data;
        this.phieunhapForm.provider = this.listProvider[0];
      },
      err => {
        console.log(err);
      }
    );

    this.cols = [
      {
          field: 'stt',
          header: 'stt'
      },
      {
          field: 'type',
          header: 'Loại'
      },
      {
          field: 'maThuoc',
          header: 'mathuoc'
      },
      {
          field: 'tenThuoc',
          header: 'tenthuoc'
      }, {
          field: 'unit',
          header: 'ĐVT'
      }, {
          field: 'soluong',
          header: 'Số lượng'
      }, {
          field: 'dongia',
          header: 'giá'
      }, {
          field: 'thanhtien',
          header: 'thanhtien'
      }
    ]
  }

  saveData() {
    this.thuocService.addThuocs(this.insertedThuocs).subscribe(
      res => {
        console.log('---- inserted list thuoc: ', res.data);
        
        this.parsePhieunhapToModel();
        this.phieunhapService.addPhieunhap(this.phieuModel).subscribe(
          res => {
            console.log(res);
            this.addSingle('success', 'Thành công', 'Đã thêm phiếu');
          },
          err => {
            this.addSingle('error', 'Thất bại', 'Lỗi không kết nối tới server');
            console.log(err);
          }
        );
      },
      err => {

      }
    );
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellText:false, cellDates:true });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF:'dd/MM/yyyy' }));
      // console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  isDuplicateThuoc(listThuoc: ThuocModel[], thuoc: ThuocModel): boolean {
    let rt = false;
    let pts = listThuoc.filter(t => {
      return (t.maThuoc === thuoc.maThuoc);
    });
    rt = pts.length > 0;
    return rt;
  }

  getData() {
    // let cs = this.data.splice(this.from, 7); // header
    // stt	type	mathuoc	tenthuoc	unit	 soluong 	 dongia 	 thanhtien 
    this.dtFilter = [];
    this.insertedThuocs = [];
    let stt = 0;
    this.data.forEach((e, i) => {
      if (e && e.length > 3) {
        stt++;
        try {
          let thuoc = new ThuocModel();
          thuoc.type = this.mapTypeThuoc(e[1]);
          thuoc.maThuoc = e[2];
          thuoc.tenThuoc = e[3];
          thuoc.unit = e[4];
          thuoc.method = 'Uống';
          let row = {
            stt: stt,
            type: 1, // nhap
            maThuoc: e[2],
            tenThuoc: e[3],
            unit: e[4],
            soluong: e[5],
            dongia: e[6],
            thanhtien: e[7],
            kho: this.phieunhapForm.kho.id,
            shd: this.phieunhapForm.shd,
            solo: this.phieunhapForm.solo,
            tax: this.phieunhapForm.tax,
            provider: this.phieunhapForm.provider.name
          }

          if (row.maThuoc) {
            this.dtFilter.push(row);
            if (this.isDuplicateThuoc(this.listThuoc, thuoc) === false) {
              console.log(stt + '------push- THuoc: ', thuoc);
              this.insertedThuocs.push(thuoc);
            }
          }
          
        } catch (error) {
          console.log('cannot parse line '+i+' data:', e);
        }
      } else {
        console.log('From excel is null/undefined');
      }
    });

    console.log('-----dtFilter: ', JSON.stringify(this.dtFilter));
  };

  parsePhieunhapToModel() {
    const model: any = { ...this.phieunhapForm };
    model.provider = JSON.stringify(model.provider);
    
    model.soluongton = model.soluong;
    model.type = 1; // import
    // parse record list
    model.listRecordImportExportModel = this.dtFilter.map(rd => {
      const row: RecordModel = new RecordModel;
      row.thuoc = rd.maThuoc;
      row.taxplus = rd.taxplus;
      row.kho = rd.kho;
      row.shd = rd.shd;
      row.type = rd.type;
      row.soluong = rd.soluong;
      row.thanhtien = rd.thanhtien;
      row.solo = model.solo;
      row.imported_at = DateService.newUTCDate(new Date());
      row.soluongton = rd.soluong;
      row.dongia = rd.dongia;
      // row.ngayhh = new Date('2025-08-30 00:00:00');
      // row.ngaysx = new Date();
      return row;
    });
    model.listRecordImportExportModel.pop(); // remove last row 'tong'
    model.kho = JSON.stringify(model.kho);

    // model.listRecord = JSON.stringify(model.listRecordImportExportModel);
    model.user = this.appStore.getAuth()['username'];
    this.phieuModel = { ...model };
    // this.phieunhapModel.provider = JSON.stringify(this.provider);
    // this.phieunhapModel.kho = JSON.stringify(this.selectedKhoNhap);
    // this.phieunhapModel.listRecordImport = JSON.stringify(this.listRecordImport);
  }

  mapTypeThuoc(tt: String) {
    let type = -1;
    switch (tt) {
        case 'tt':
            type = 1;
            break;
        case 'th':
            type = 2;
            break;
        case 'xq':
            type = 3;
            break;
        case 'dt':
            type = 4;
            break;
        case 'xn':
            type = 5;
        case 'pd':
            type = 6;
            break;
        case 'ht':
            type = 7;
            break;
        case 'gn':
            type = 8;
            break;
        case 'dv':
            type = 9;
            break;
        case 'khac':
            type = 99;
            break;
        default:
            console.log('not support this type: ', tt);
            break;
    }

    return type;
  }
  // getICDData
  getICDData() {
    this.cols = this.data[this.from]; // header
    this.tbData = this.data.slice(this.from + 1, this.to);
    this.dtFilter = this.tbData.map((e, i) => {
      return {
        id: e[1],
        name: e[2]
      }
    });
    console.log('-----dtFilter: ', JSON.stringify(this.dtFilter));
  };

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
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
