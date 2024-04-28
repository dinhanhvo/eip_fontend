import * as _ from 'lodash';

import { PhieuKhamBenh, CLS, DonThuoc, KqCLS, PhieuKhamBenhModel } from '../model/phieukhambenh';
import { PatientModel } from '../../shared/model/patient.model ';
import { DateService } from '../services/date.util.service';

import { ScriptService } from '../services/script.service';

import { NhiXuanOptions, NXOption } from '../../shared/common/selectitem';

// declare let pdfMake: any ;
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CLSModel } from '../model/cls.model';
import { NhiXuanUtil } from './nhixuan_utils';
// import { DonthuocService } from '../services/donthuocs.service';
import { RecordModel } from '../model/import.model';
import { ThuocService } from '../services/thuoc.service';
import { ThuocModel } from '../model/thuoc.model';
import { NumberFormat } from './number-format';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class SoTinhtienHocvien {

  thuocs: ThuocModel[] = [];
  constructor(
    private scriptService: ScriptService,
  ) {
    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }
  ngOnInit() {
    // this.thuocService.getAllThuocs().subscribe((data) => {
    //   this.thuocs = data.data;
    // }, err => {})
  }

  public static gerneratePKBByDates(action = 'open', phieukhambenhs: PhieuKhamBenh[], dts: RecordModel[], thuocs: ThuocModel[]) {
    // console.log(pdfMake);
    const documentDefinition = this.getDothuocDefinition(phieukhambenhs, dts, thuocs);
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  public static gernerateDonthuocByDates(action = 'open', phieukhambenhs: PhieuKhamBenh[], dts: RecordModel[], thuocs: ThuocModel[]) {
    // console.log(pdfMake);
    const documentDefinition = this.getDothuocPDF(phieukhambenhs, dts, thuocs);
    
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  public static generateSoTinhTien(action = 'open',
    pkbs: PhieuKhamBenh[],
    dts: RecordModel[],
    thuocs: ThuocModel[]
  ) { 
    let soTinhtien: any[] = [];
    soTinhtien.push(this.getDothuocDefinition(pkbs, dts, thuocs));

    let docs =  {
      content: soTinhtien,
      info: this.getPkbInfo(pkbs[0]),
      styles: this.getPkbStyles()
    }
    // sotheodoi['info'] = this.getPkbInfo(pkbs[0]);
    // sotheodoi['styles'] = this.getPkbStyles();

    switch (action) {
      case 'open': pdfMake.createPdf(docs).open(); break;
      case 'print': pdfMake.createPdf(docs).print(); break;
      case 'download': pdfMake.createPdf(docs).download(); break;

      default: pdfMake.createPdf(docs).open(); break;
    }
  }

  // 1 phieu
  public static getContentPhieuKB(pkb: PhieuKhamBenh, dts1: RecordModel[], thuocs: ThuocModel[]): any[] {
    console.log('getContentPhieuKB ------: ', pkb);
    const dateXN = pkb.ngaykham? new Date(pkb.ngaykham).toLocaleDateString(): new Date().toLocaleDateString();
    const title = 'HÓA ĐƠN KHÁM BỆNH';
    sessionStorage.setItem('phieukhambenh', JSON.stringify(pkb));
    // sessionStorage.setItem('bacsy', JSON.stringify())
    let doctor = '';
    if (pkb.doctor && pkb.doctor['name']) {
      doctor = pkb.doctor ? pkb.doctor['name'] : '';
    } else {
      doctor = pkb.doctor ? pkb.doctor : '';
    }
    let ngayKham = DateService.getDDMMYYY(pkb.ngaykham);
    let content = [
      {
        columns: [
          {
            text: title,
            bold: true,
            fontSize: 16,
            alignment: 'right',
            margin: [0, 30, 0, 10]
          },
          {
            text: 'Ngày: ' + ngayKham,
            bold: true,
            // fontSize: 20,
            alignment: 'right',
            margin: [0, 30, 0, 10]
          }
        ]
      },
      // row 2
      { // 2 collumns: 1: tt chung, 2: pic CV
        columns: [
          [
            { // 4 rows
              text: 'Tên bệnh nhân: ' + pkb.selectedPatient.patientName,
            },
            {
              text: 'Bác sỹ: ' + doctor,
            },
          ]
        ]
      },
      // row 3: CLS
      // Experience -> CLSs
      {
        text: 'CLS: ',
        style: 'header'
      },
      this.getCLSTable(pkb.CLSs),
      // Education -> DonThuoc
      {
        text: 'Đơn Thuốc',
        style: 'header'
      },
      this.getDonThuocObject(dts1, thuocs),
      {
        text: '   '
      },
      // {
      //   text: ' Tiêu hao  ' + this.getTieuhao(pkb.selectedPatient) 
      // },
      {
        text: ' Tiền CLS: ' + NhiXuanUtil.formatStyles(this.getTienCLSs(pkb.CLSs)) + 'đ',
        style: {
          alignment: 'right',
          margin: [0, 50, 0, 50]
        }
      },
      {
        text: ' Tiền thuốc: ' + NhiXuanUtil.formatStyles(this.getTienthuoc(dts1)) + 'đ',
        style: {
          alignment: 'right',
          margin: [0, 50, 0, 50]
        }
      },
      {
        text: ' Tổng: ' + NhiXuanUtil.formatStyles(this.getTienthuoc(dts1) + this.getTienCLSs(pkb.CLSs)) + 'đ',
        style: {
          alignment: 'right',
          margin: [0, 50, 0, 50]
        }
      },
      {
        text: '---------------------&&&---------------------',
        style: {
          alignment: 'center',
          // margin: [0, 50, 0, 20]
        }
      }
    ];
    return content;
  }

  public static generatePdf(action = 'open', phieukhambenh: PhieuKhamBenh, dts: RecordModel[], thuocs: ThuocModel[]) {
    // console.log(pdfMake); 
    const documentDefinition = this.getDocumentDefinition(action, phieukhambenh, dts, thuocs);
    
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  public static getDothuocDefinition(pkbs: PhieuKhamBenh[], dts: RecordModel[], thuocs: ThuocModel[]) {
    if (pkbs.length < 1) {
      return;
    }
    let arrContent = [];
    let dts1: RecordModel[] = [];
    let j = 0;
    arrContent = this.getBiaContent(pkbs[0].selectedPatient);
    pkbs.forEach((pkb, i) => {
      dts1 = dts.filter(dt => {
        return dt.pkb_id === pkb.id;
      });
      let content = this.getContentPhieuKB(pkb, dts1, thuocs);
      // arrContent[j++] = content;
      arrContent = arrContent.concat(content);
      
    });
    arrContent = arrContent.concat(this.tinhtienFooter(pkbs, dts1));
    return arrContent;
  }

  public static tinhtienFooter(pkbs: PhieuKhamBenh[], dts: RecordModel[]) {
    let tongtien = 0;
    pkbs.forEach(element => {
      tongtien += element.tongtien;
    });
    return [
      // {
      //   text: ' Tiêu hao  ' + NhiXuanUtil.formatStyles(this.getTieuhao(pkbs[0].selectedPatient)),
      //   style: {
      //     alignment: 'right',
      //     margin: [0, 50, 0, 50]
      //   }
      // },
      {
        text: ' TỔNG TIỀN: ' + NhiXuanUtil.formatStyles(tongtien) + 'đ',
        style: {
          alignment: 'right',
          margin: [0, 50, 0, 50]
        }
      },
    ]
  }

  public static getDothuocPDF(pkbs: PhieuKhamBenh[], dts: RecordModel[], thuocs: ThuocModel[]) {
    let arrContent = [];
    let j = 0;
    
    pkbs.forEach((e, i) => {
      // generatePdf(action, this.phieukhambenh);
      let content = this.getContentPhieuKB(e, dts, thuocs);
      // arrContent[j++] = content;
      arrContent = arrContent.concat(content);
      
    });
    // return arrContent;
    return {
      content: arrContent,
      info: this.getPkbInfo(pkbs[0]),
      styles: this.getPkbStyles()
    };
  }

  public static getDocumentDefinition(action = 'open', phieukhambenh: PhieuKhamBenh,
    dts: RecordModel[], thuocs: ThuocModel[]) {
    return {
      content: this.getContentPhieuKB(phieukhambenh, dts, thuocs),
      info: this.getPkbInfo(phieukhambenh),
      styles: this.getPkbStyles()
    };
  }

  public static getPkbInfo(pkb: PhieuKhamBenh): any {
    if (pkb) {
    } else {
      return;
    }
    // let doctor = pkb.doctor ? pkb.doctor : '';
    let doctor = '';
    if (pkb.doctor && pkb.doctor['name']) {
      doctor = pkb.doctor ? pkb.doctor['name'] : '';
    } else {
      doctor = pkb.doctor ? pkb.doctor : '';
    }
    let ptName = pkb.selectedPatient && pkb.selectedPatient.patientName ? pkb.selectedPatient.patientName: ''
    return {
        title: 'Phieu Kham Benh-' + ptName
            + '-' + DateService.getDDMMYYY(pkb.ngaykham),
        author: doctor,
        subject: 'Phieu Kham Benh',
        keywords: 'Phieu Kham Benh, Phieu Kham Benh ONLINE',
    }
  }

  public static getPkbStyles(): any {
    return {
      header: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 0],
        decoration: 'underline'
      },
      smallCol: {
        width: '20px',
        color: 'red'
      },
      name: {
        // fontSize: 16,
        bold: false,
        margin: [20, 5, 0, 0],
      },
      jobTitle: {
        fontSize: 14,
        bold: true,
        italics: true
      },
      sign: {
        margin: [0, 50, 0, 10],
        alignment: 'right',
        italics: true
      },
      tableHeader: {
        bold: true,
      },
      newRow: {
        margin: [0, 10, 0, 0],
      },
      headerCC: {
        fontSize: 14,
        bold: true,
        margin: [0, 20, 0, 10],
        decoration: 'underline'
      },
      bsdt: {
        margin: [20, 20, 100, 0],
        alignment: 'right',
        bold: true,
        // italics: true
      },
      hoten: {
        margin: [0, 50, 50, 10],
        alignment: 'right',
        italics: true
      }
    }
  }

  // public static tongTienThuoc(pkb: PhieuKhamBenh): number {
  //   let tong = 0;
  //   let dts = pkb.donThuocs;
  //   dts.forEach(dt => {
  //     let sl = dt.ton;
  //     if (dt.cachdung.type === 1) {
  //       sl = (dt.sang + dt.chieu + dt.toi) * dt.songay;
  //     }
  //     const dongia = dt.selectedThuoc.dongiaXuat ? dt.selectedThuoc.dongiaXuat : 0;
  //     tong += dongia * sl;
  //   });
  //   return tong;
  // }

  // public static tongTienCLS(pkb: PhieuKhamBenh): number {
  //   let tong = 0;
  //   let clss = pkb.CLSs;
  //   clss.forEach(cls => {
  //     tong += cls.dongia;
  //   });
  //   return tong;
  // }

  // public static tongTienPhieu(pkb: PhieuKhamBenh): number {
  //   return this.tongTienCLS(pkb) + this.tongTienThuoc(pkb);
  // }

  public static getDonThuocObject(dts1: RecordModel[], thuocs: ThuocModel[]) {
    // if (dts1 === undefined || dts1[0].cachdung === undefined) {
    //     return;//['-', '-', '-', '-'];
    // };
    return {
      table: {
      // widths: ['*', '*', '*', '*', '*'],
      widths: [30, '*', 50, 50, 100, '*'],
      body: [
          [
            {
                text: 'STT',
                style: 'tableHeader',
            },
            {
                text: 'Tên thuốc',
                style: 'tableHeader'
            },
            {
              text: 'ĐV',
              style: 'tableHeader',
            },
            {
                text: 'Số lượng',
                style: 'tableHeader'
            },
            {
                text: 'Đơn giá',
                style: 'tableHeader'
            },
            {
              text: 'Thành tiền',
              style: 'tableHeader'
            },
          ],
          ...dts1.map((dt, i) => {

            console.log('pdf thuoc: ', dt);
            let sl = dt.soluong;
            let thuoc: ThuocModel = thuocs.find(t => t.maThuoc === dt.thuoc);
            let dongia = NhiXuanUtil.formatStyles(dt.taxplus);
            let tt = NhiXuanUtil.formatStyles(dt.taxplus * sl);
            let sll = NhiXuanUtil.formatStyles(sl);

            return [i + 1, thuoc.tenThuoc, thuoc.unit,
                    sll, dongia, tt];
          })
      ]
      }
    };
  }

  public static getTienthuoc(dts: RecordModel[]): number {
    let tt = 0;
    dts.forEach((dt, i) => {
      console.log('pdf thuoc: ', dt);
      // let sl = dt.soluong;
      // tt += dt.taxplus * sl;
      tt += dt.thanhtien
    });
    return tt;
  }

  public static getTienCLSs(CLSs: CLSModel[]): number {
    let tt = 0;
    CLSs.forEach((cls, i) => {
      tt += cls.dongia;
    })
    return tt;
  }
  public static getTieuhao(patient: PatientModel): number {
    let th = 0;
    let khukbs = NhiXuanOptions.khukbs;
    let khu = khukbs.find(k => {
      k.name === patient.khu;
    });
    if (khu) {
      let kho = NhiXuanUtil.timKho(khu);
      switch (kho.id) {
        case 'KTN':
        case 'DVY':
          // #1 get Total tien tieu hao
          // #2 get total benhnhan kham benh
          break;
        case 'KNS':
          th = 20000;
          break;
            
        default:
          break;
      }
    }
    return th;
  }

  public static getCLSTable(clss: CLSModel[]) {
    if (clss === undefined || clss === null) {
      return '';
    }
    // let obj = JSON.parse(clss);
    let obj = clss;
    // console.log('---obj:' , obj);
    let s = '';
    if (obj === null || obj === undefined || obj[0] === undefined || obj[0].name === undefined) {
      return s;
    }

    return {
      table: {
      // widths: ['*', '*', '*', '*', '*'],
      widths: [30, '*', 50, 50, 100, '*'],
      body: [
          [
            {
                text: 'STT',
                style: 'tableHeader',
            },
            {
                text: 'Tên ',
                style: 'tableHeader'
            },
            {
              text: 'ĐV',
              style: 'tableHeader',
            },
            {
                text: 'Số lượng',
                style: 'tableHeader'
            },
            {
                text: 'Loại',
                style: 'tableHeader'
            },
            {
              text: 'Giá',
              style: 'tableHeader'
            },
          ],
        ...clss.map((cls, i) => {
          console.log('can lam sang: ', cls);
          let type = cls.type ? cls.type : '-';
            let dg = cls.dongia ? cls.dongia : 0;     
            let rd  = [i + 1, cls.name, 'Lần', 1, type, dg]
            return rd;
        })
      ]
      }
    };
  }

  public static getBiaContent(pt: PatientModel) : any[] {
    return [
      {
        text: 'CƠ SỞ XÃ HỘI NHỊ XUÂN',
        fontSize: 24,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 200]
      },
      {
        text: 'SỔ THANH TOÁN',
        fontSize: 48,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 50]
      },
      {
        text: 'Họ và tên: ' + pt.patientName,
        alignment: 'center',
        margin: [0, 0, 0, 15],
        color: 'blue'
      },
      {
        text: 'Mã: ' + pt.patientId,
        alignment: 'center',
        margin: [0, 0, 0, 15],
        color: 'blue'
      },
      {
        text: 'Số hồ sơ: ' + pt.sohoso,
        alignment: 'center',
        margin: [0, 0, 0, 320],
        color: 'blue'
      },
      {
        text: 'Địa chỉ: 189E Đặng Công Bỉnh, Xuân Thới Sơn, Hóc Môn, TP. HCM',
        alignment: 'center'
      },
      {
        text: 'SĐT: 02822450577',
        alignment: 'center'
      },
      {
        text: ' ',
        pageBreak: 'before'
      }
    ]
  }

  // TTCCon pdflayout
  // deleted
    
  // TTCCon pdflayout
  // deleted
}
