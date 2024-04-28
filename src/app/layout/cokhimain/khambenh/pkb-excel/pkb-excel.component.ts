import { Component, OnInit } from '@angular/core';
import { PhieuKhamBenhModel } from '../../../../shared/model/phieukhambenh';
import * as XLSX from 'xlsx';


import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { PhieukhambenhService } from '../../../../shared/services/phieukhambenh.service';
import { DateService } from '../../../../shared/services/date.util.service';

type AOA = any[][];

@Component({
  selector: 'app-pkb-excel',
  templateUrl: './pkb-excel.component.html',
  styleUrls: ['./pkb-excel.component.scss']
})
export class PkbExcelComponent implements OnInit {

  pkbModel: PhieuKhamBenhModel;
  listPkbModel: PhieuKhamBenhModel[] = [];
  msgs: Message[] = [];
  data: AOA = [[], []];
  tbData: any[] = [];
  from: 0;
  to: 10;
  col: 0;
  dtFilter: any[] = [];
  colfts: any[] = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: 'exportExcelFile.xlsx';
  cols: any[] = [];

  constructor(
    private phieukbService: PhieukhambenhService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.colfts = [
      1,2, 3, 4, 5, 6, 7
    ];
    this.cols = [
      // { field: 'mabenhnhan', header: 'Mã bệnh nhân' },
      // { field: 'fullname', header: 'Tên bệnh nhân' },
      // { field: 'khu_name', header: 'Khu' },
      // { field: 'clsjs', header: 'CLS' },
      // { field: 'ketluan', header: 'Kết quả' },
      // { field: 'ngaykham', header: 'Ngày khám' },
      // { field: 'tienthuoc', header: 'Tiền thuốc' },
      // { field: 'tien_sa', header: 'Tiền Siêu âm' },
      // { field: 'tien_xq', header: 'Tiền Xquang' },
      // { field: 'tien_xn', header: 'Tiền Xét nghiệm' },
      // { field: 'tien_dt', header: 'Tiền Điện tim' },
      // { field: 'tongtien', header: 'Tổng:' },
    ]
  }

  savePhieus() {
    // this.patientSvc.addPatients(this.dtFilter).subscribe(
    //   res => {
    //     console.log('inserted list patients: ', this.dtFilter);
    //     this.addSingle('success', 'Thành công: ', 'Đã thêm '+ this.dtFilter.length+ ' bệnh nhân, tổng: ' + res.data.length)
    //   },
    //   err => {
    //     console.log('Loi: ', this.dtFilter);
    //     this.addSingle('error', 'Lỗi: ', 'Không kết nối được CSDL')
    //   }
    // );
    this.dtFilter.forEach(pkb => {
      this.phieukbService.addPhieukhambenh(pkb).subscribe(
        res => {
          // this.pkbModels = res.data;
        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Có lỗi xảy ra');
        }
      );
    })
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

  getData() {
    let cs = this.data.splice(this.from, 1); // header
    let i = 0;

    let colsModel = cs[0];
    this.cols = cs[0].map(header => {
      let col = {
        header: header,
        field: header
      }
      return col;
    });
    console.log('---------col pkbs: ', this.cols);
    console.log('--------- data: ', this.data);
    
    this.listPkbModel = this.data.map(row => {
      let pkb: PhieuKhamBenhModel = new PhieuKhamBenhModel();
      colsModel.forEach((col, i) => {
        if (i > 0) {
          pkb[col] = row[i]
          // console.log(col + '===' + row[i]);
          
        }
      });
      
      return pkb;
    });
    // console.log('--------- listPkbModel: ', this.listPkbModel);
    // let listPatient:PatientModel[] = [];
    // listPatient = this.patientSvc.getAllPatients();
    // this.tbData = this.data;//.splice(1, this.data.length - 1);
    // // 1, 2, 3, 4, 5, 6, 7, 12
    this.dtFilter = [];
    this.listPkbModel.forEach(pkb => {
      if (pkb.ngaykham !== undefined) {
        let pkbM = { ...pkb };
        pkbM.ngaykham = DateService.newUTCDate(pkb.ngaykham);
        console.log('------pkbM: ', pkbM);
        this.dtFilter.push(pkbM);
      }
    });

    // console.log('-----cols: ', JSON.stringify(this.cols));
    // console.log('-----dtFilter: ', JSON.stringify(this.dtFilter));
  };

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
