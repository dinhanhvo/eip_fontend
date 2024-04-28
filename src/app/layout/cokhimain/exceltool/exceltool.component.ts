import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

import { ThuocService } from '../../../shared/services/thuoc.service';
import { DateService } from '../../../shared/services/date.util.service';
import { PatientService } from '../../../shared/services/patient.service';
import { PatientModel } from '../../../shared/model/patient.model ';

import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

type AOA = any[][];

@Component({
  selector: 'app-exceltool',
  templateUrl: './exceltool.component.html',
  styleUrls: ['./exceltool.component.scss']
})
export class ExceltoolComponent implements OnInit {

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
    // private thuocService: ThuocService,
    private patientSvc: PatientService,
    // private dateSvc: DateService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.colfts = [
      1,2, 3, 4, 5, 6, 7
    ];
    this.patientSvc.getAllPatients();
  }

  savePatients() {
    this.patientSvc.addPatients(this.dtFilter).subscribe(
      res => {
        console.log('inserted list patients: ', this.dtFilter);
        this.addSingle('success', 'Thành công: ', 'Đã thêm '+ this.dtFilter.length+ ' bệnh nhân, tổng: ' + res.data.length)
      },
      err => {
        console.log('Loi: ', this.dtFilter);
        this.addSingle('error', 'Lỗi: ', 'Không kết nối được CSDL')
      }
    );
  }

  SaveDemo() {
    this.dtFilter.forEach((t, i) => {
      // patient
      this.patientSvc.addPatient(t).subscribe(
        res => {
          console.log('inserted patient: ', t);
          
        },
        err => {
          console.log(i + 'loi: ', t);
          
        }
      )
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

  isDuplicate(listPatient: PatientModel[], patientId: string): boolean {
    if (!listPatient)
      return false;
    let rt = false;
    let pts = listPatient.filter(pt => {
      return pt.patientId === patientId;
    });
    rt = pts.length > 0;
    return rt;
  }

  getData() {
    let cs = this.data.splice(this.from, 1); // header
    let i = 0;
    cs[0].map((c, j) => {
      let col = {};
      // ["STT", "Danh soá", "Họ và tên", "ten_khong_dau", "Năm sinh", "Ngày nhập", "gioi_tinh", "Dia_chi", "SO_QD_SO_HD_1",
      // "NGAY_QD_HD_1", "CAP_KY_QD_1_XA", "CAP_KY_QD_QUAN", "TEN_DOI", "Ngày nhập"]
      switch (c.toString()) {
        case 'Danh soá':
          col = { field: 'patientId', header: 'Mã BN' };
          break;
        case 'Họ và tên':
          col = {
              field: 'patientName',
              header: 'Tên'
          };
        break;
        case 'ten_khong_dau':
          col = {
            field: 'fullname',
            header: 'Tên Tìm Kiếm'
          };
        break;
        case 'Năm sinh':
          col = {
            field: 'birthYear',
            header: 'Năm Sinh'
          };
        break;
        case 'Ngày nhập':
          col = {
            field: 'imported_at',
            header: 'Ngày Nhập'
          };
        break;
        case 'gioi_tinh':
          col = {
            field: 'gender',
            header: 'Giới tính'
          };
          break;
        case 'Dia_chi':
          col = {
            field: 'address',
            header: 'Địa Chỉ'
          };
          break;       
        case 'TEN_DOI':
          col = {
            field: 'khu',
            header: 'Khu'
          };
        break;
        // case 'gioi_tinh':
        //   col = {
        //     field: '',
        //     header: ''
        //   };
        // break;
        default:
          console.log('---dont use---column---', c);
          
          break;
      }
      // return col;
      if (col && col['field']) {
        this.cols[i++] = col;
      }
    });
    let listPatient:PatientModel[] = [];
    listPatient = this.patientSvc.getAllPatients();
    this.tbData = this.data;//.splice(1, this.data.length - 1);
    // 1, 2, 3, 4, 5, 6, 7, 12
    this.dtFilter = [];
    this.tbData.forEach((e, i) => {
      if (e && e.length > 0) {
        try {
          let pt = new PatientModel();
          let col = 0;
          pt.patientId = e[1];

          pt.patientName = e[2];
          let sdate = e[4].split('/');
          let dt = new Date();
          dt.setDate(sdate[0]);
          let m = Number.parseInt(sdate[1]) - 1;
          dt.setMonth(m);
          dt.setFullYear(sdate[2]);
    
          let date = new Date(Date.UTC(sdate[2], sdate[1], sdate[0]));
          pt.birthday = new Date(dt); // debug
          pt.birthYear = pt.birthday.getFullYear();
          pt.fullname = e[3] + pt.birthYear;
          sdate = e[5].split('/');
          dt = new Date();
          dt.setDate(sdate[0]);
           m = Number.parseInt(sdate[1]) - 1;
          dt.setMonth(m);
          dt.setFullYear(sdate[2]);
          pt.imported_at = new Date(dt); // debug
          pt.gender = e[6];
          pt.address = e[7];
          pt.khu = e[12];
          // return pt;
          let check = this.isDuplicate(listPatient, pt.patientId);
          console.log(check + '<------- Hoc vien: ', pt);

          if (check === false) {
            this.dtFilter.push(pt);
          }
        } catch (error) {
          console.log('cannot parse line '+i+' data:', e);
        }
      } else {
        console.log('From excel is null/undefined');
      }
    });

    console.log('-----cols: ', JSON.stringify(this.cols));
    console.log('-----dtFilter: ', JSON.stringify(this.dtFilter));
  };

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

  getDataPatient() {
    this.cols = this.data[this.from]; // header
    let c = this.col;
    this.tbData = this.data.slice(this.from + 1, this.to);
    this.dtFilter = this.tbData.map((e, i) => {

      // Bệnh nhân
      let bn = new PatientModel();
      bn.patientId = e[0];
      // bn.maThuoc = bn.tenThuoc.substr(0, 3);
      bn.patientName = e[1];
      bn.fullname = e[2];
      // bn.birthYear = e[4];
      bn.imported_at = e[9];
      bn.gender = e[5];
      bn.address = e[6];
      bn.khu = e[7];
      let ngay = e[8].substr(0, 2);
      let thang = e[8].substr(3, 5);
      let nam = e[8].substr(6, 10);

      let dt = new Date();
      dt.setDate(ngay);
      dt.setMonth(thang);
      dt.setFullYear(nam);

      bn.birthday = DateService.newUTCDate(dt);
      console.log('------dateUtc=', bn.birthday);
      
      bn.birthYear = bn.birthday.getFullYear();
      console.log('---birthday:', bn.birthday);
      console.log('---birthYear:', bn.birthYear);
      return bn;
    });
    // this.cols = colss.map((e, i) => {
    //   let header = { field: i, header: e };
    //   return header;
    // });
    console.log('=====================this.dtFilter===============');
    console.log(JSON.stringify(this.dtFilter));
  }

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
