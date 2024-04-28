import * as _ from 'lodash';

import { PhieuKhamBenh, CLS, DonThuoc, KqCLS } from '../model/phieukhambenh';
import { PatientModel } from '../../shared/model/patient.model ';
import { DateService } from '../services/date.util.service';
import { ScriptService } from '../services/script.service';
import { NXOption } from '../../shared/common/selectitem';

// declare let pdfMake: any ;
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PdfUtil {

  constructor(
    private scriptService: ScriptService,
  ) {
    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  public static gerneratePKBByDates(action = 'open', phieukhambenhs: PhieuKhamBenh[]) {
    // console.log(pdfMake);
    const documentDefinition = this.getDothuocDefinition(phieukhambenhs);
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  public static gernerateDonthuocByDates(action = 'open', phieukhambenhs: PhieuKhamBenh[]) {
    // console.log(pdfMake);
    const documentDefinition = this.getDothuocPDF(phieukhambenhs);
    
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  public static generateSotheodoi(action = 'open',
    tomtat: any,
    pkbs: PhieuKhamBenh[],
    tomtatBA: any
  ) { 
    let sotheodoi: any[] = [];
    sotheodoi.push(this.getBiaContent(tomtat.selectedPatient))
    sotheodoi.push(this.getTTCCContent(tomtat));
    if (tomtatBA && tomtatBA.qtdtBA) {
      sotheodoi.push(this.getTTBAContent(tomtatBA, tomtat.selectedPatient));
    }
    sotheodoi.push(this.getDothuocDefinition(pkbs));

    let docs =  {
      content: sotheodoi,
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
  public static getContentPhieuKB(pkb : PhieuKhamBenh) : any[]{const dateXN = pkb.ngaykham ? new Date(pkb.ngaykham).toLocaleDateString() : new Date().toLocaleDateString();
      const title = 'PHIẾU KHÁM BỆNH';
      sessionStorage.setItem('phieukhambenh', JSON.stringify(pkb));
      // sessionStorage.setItem('bacsy', JSON.stringify())
      let chandoanstr = '  ';
      if (pkb.chandoan) {
          pkb.chandoan.forEach((cd, i) => {
              chandoanstr = chandoanstr + (i + 1).toString() + '.' + cd.name + '   '
          });
      }
      if (pkb.chandoanKhac) {
          chandoanstr += pkb.chandoanKhac;
      }
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
                  }, {
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
                          text: 'Tên bệnh nhân: ' + pkb.selectedPatient.patientName
                      },
                      // {
                      // text: 'Ngày: ' + ngayKham
                      // },
                      {
                          text: 'Bác sỹ: ' + doctor
                      }, {
                          text: 'Chẩn đoán: ' + chandoanstr
                      },
                  ]
              ]
          },
          // row 3: CLS
          // Experience -> CLSs
          {
              text: 'Chỉ định CLS: ',
              style: 'header'
          },
          {
              text: this.getNXOptionsNames(pkb.CLSs)
          },
          // this.getCLSObject(pkb, pkb.CLSs, pkb.ketquaCLSs),
          // {
          // text: this.getKhacText('Khác: ', pkb.kqCLSKhac),
          // },
          {
              text: this.getKhacText('Kết quả: ', pkb.ketluan),
              style: 'newRow'
          },
          // Education -> DonThuoc
          {
              text: 'Đơn Thuốc',
              style: 'header'
          },
          this.getDonThuocObject(pkb.donThuocs), {
              text: '   '
          },
          // Ghi chu
          {
              text: 'Ghi Chú:',
              style: 'header'
          }, {
              text: pkb.note,
              // style: 'header'
          }, {
              text: '---------------------&&&---------------------',
              style: {
                  alignment: 'center',
                  // margin: [0, 50, 0, 20]
              }
          }
      ];
      return content;
  }


  public static generatePdf(action = 'open', phieukhambenh: PhieuKhamBenh) {
    // console.log(pdfMake); 
    const documentDefinition = this.getDocumentDefinition(action, phieukhambenh);
    
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  public static getDothuocDefinition(pkbs: PhieuKhamBenh[]) {
    let arrContent = [];
    let j = 0;
    
    pkbs.forEach((e, i) => {
      let content = this.getContentPhieuKB(e);
      // arrContent[j++] = content;
      arrContent = arrContent.concat(content);
      
    });
    return arrContent;
    // return {
    //   content: sothdodoi,
      // info: this.getPkbInfo(pkbs[0]),
      // styles: this.getPkbStyles()
    // };

  }

  public static getDothuocPDF(pkbs: PhieuKhamBenh[]) {
    let arrContent = [];
    let j = 0;
    
    pkbs.forEach((e, i) => {
      // generatePdf(action, this.phieukhambenh);
      let content = this.getContentPhieuKB(e);
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

  public static getDocumentDefinition(action = 'open', phieukhambenh: PhieuKhamBenh) {
    return {
      content: this.getContentPhieuKB(phieukhambenh),
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

  public static  getCLSObject(phieukhambenh: PhieuKhamBenh, clss: CLS[], kqs: KqCLS[]) {
    const exs = [];
    let clsKhac = '';

    if (clss === undefined || clss[0] === undefined || clss[0].name === undefined ) {
      return;//['-', '-'];
    } 

    // if (phieukhambenh.kqCLSKhac) {
    //   clsKhac = ' Khác: ' + phieukhambenh.kqCLSKhac;
    //   return clsKhac;
    // }

    return {
      table: {
        widths: ['*', '*'], // 2 columns
        body: [
          [
            {
              text: 'CLS',
              style: 'tableHeader'
            }, //column 1: name CLS
            {
              text: 'Kết quả',
              style: 'tableHeader'
            } //column 2: result CLS
          ],
          ...clss.map((cls, i) => {
            console.log('export pdf cls: ', cls);
            console.log('export pdf kq: ', kqs[i]);
            return [cls.name, kqs[i].name? kqs[i].name: '' ];
          },
          // [
          //   'Khác: ', phieukhambenh.kqCLSKhac
          // ]
          )
        ]
      }
    };
  }

  public static getDonThuocObject(donThuocs: DonThuoc[]) {
    if (donThuocs === undefined || donThuocs[0].cachdung === undefined) {
        return;//['-', '-', '-', '-'];
    };
    return {
      table: {
      // widths: ['*', '*', '*', '*', '*'],
      widths: [30, '*', 60, '*', 50, 30, 30],
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
                text: 'Cách dùng',
                style: 'tableHeader'
            },
            {
                text: 'Liều dùng',
                style: 'tableHeader'
            },
            {
              text: 'Số Ngày',
              style: 'tableHeader'
            },
            {
              text: 'SL',
              style: 'tableHeader',
            },
            {
              text: 'ĐV',
              style: 'tableHeader',
            }
          ],
          ...donThuocs.map((dt, i) => {
            if (dt.cachdung === undefined) {
                return ['-', '-', '-', '-', '-', '-', '-'];
            };

            console.log('pdf thuoc: ', dt);
            let lieudung = '';
            let sl = dt.ton;
            if (dt.cachdung.type === 1) {
              lieudung = 'Sáng: ' + dt.sang + ', Chiều: ' + dt.chieu + ', Tối: ' + dt.toi;
              sl = (dt.sang + dt.chieu + dt.toi) * dt.songay;
            } else if (dt.cachdung.type === 2) {
                lieudung = 'Số giọt ' + dt.numb + '/phút';
            } else if (dt.cachdung.type === 3) {
                lieudung = dt.lieudungKhac?dt.lieudungKhac:'-';
            } else if (dt.cachdung.type === 4) {
              lieudung = 'Sáng: ' + dt.sang + ', Chiều: ' + dt.chieu + ', Tối: ' + dt.toi;
            }
            return [i + 1, dt.selectedThuoc.tenThuoc,
              dt.cachdung.name, lieudung, dt.songay, sl, dt.selectedThuoc.unit];
          })
      ]
      }
    };
  }

  public static  getTextNXOptions(nxOs: NXOption[]): string {
    let s = '';
    if (nxOs) {
      nxOs.forEach((e, i) => {
        s = s + '   ' + (i+1) + '. ' + e.name;
      });
    }
    return s;
  }

  public static getNXOptionsNames(clss): string {
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
    obj.forEach((e, i) => {
      s += ++i + '. ' + e.name + '   | ';
    });
    return s;
  }

  public static getTextObj(obj): string {
    return obj ? obj + '' : '';
  }

  public static getTextNXOption(obj: NXOption): string {
    return obj ? obj.name : '';
  }
  
  public static getKhacText(s1, s): string {
    let sr = '';
    if (s) {
      sr = s1 + s;
    }
    return sr;
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
        text: 'SỔ THEO DÕI',
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
  public static getTTCCContent(tt: any) {
    const title = 'TÓM TẮT QUÁ TRÌNH ĐIỀU TRỊ CẮT CƠN';
    let pt = tt.selectedPatient;
    let hoiChung = tt.selectedHoiChung ? tt.selectedHoiChung.name : '';
    let importDate = DateService.parseImportted_At(tt.selectedPatient.imported_at);
    if (importDate === undefined || importDate.toString() == 'Invalid Date') {
      importDate = DateService.parseDDMMYYYYtoDate(tt.selectedPatient.imported_at);
    }
    if (importDate === undefined || importDate.toString() == 'Invalid Date') {
      importDate = DateService.newUTCDate( new Date())
    }
    return [
      // row1: title
      {
        text: title,
        bold: true,
        fontSize: 18,
        alignment: 'center',
        margin: [0, 0, 0, 0]
      },
      {
        text: '1. Bệnh Nhân:',
        style: 'header'
      },
      // row 2
      {
        // 2 collumns: 1: tt chung, 2: pic CV
        columns: [
          [ // 1 rows
            {
              text: 'Họ và tên: ' + pt.patientName,
              style: 'name'
            },
          ],
          [
            {
              text: 'Năm sinh: ' + pt.birthYear,
              style: 'name'
            }
          ]
        ]
      },
      {
        text: 'Giới tính: ' + pt.gender,
        style: 'name'
      },
      {
        text: 'Địa chỉ: ' + pt.address,
        style: 'name'
      },
      {
        text: 'Ngày nhập viện: ' + DateService.getDDMMYYY(importDate),
        style: 'name'
      },
      // row 3: CLS
      // Experience -> CLSs
      {
        text: '2. Quá trình bệnh lý và diễn biến lâm sàng:',
        style: 'header'
      },
      // this.getQTĐTObject(),
      {
        columns: [
          [ // 1 rows
            {
              text: hoiChung,
              style: 'name'
            },
          ],
          [
            {
              text: tt.qtdtKhac,
              style: 'name'
            }
          ]
        ]
      },
      {
        columns: [
          [ // 1 rows
            {
              text: 'Cân nặng: ' + this.getTextObj(pt.weight),
              style: 'name'
            },
          ],
          [
            {
              text: 'Huyết áp: ' + this.getTextObj(pt.huyetap),
              style: 'name'
            }
          ]
        ]
      },
      {
        text: '3. Kết quả cận lâm sàng:',
        style: 'header'
      },
      {
        text: this.getTextNXOption(tt.selectedKetquaCLS),
        style: 'name'
      },
      {
        text: this.getKhacText('Khác: ', this.getTextObj(tt.kqCLSKhac)),
        style: 'name'
      },
      {
        text: '4. Chẩn đoán ra viện:',
        style: 'header'
      },
      
      {
        text: 'Bệnh chính: ' + this.getTextNXOption(tt.selectedBenhChinh),
        style: 'name'
      },
      {
        text: 'Bệnh kèm theo: ' + this.getTextNXOptions(tt.selectedBenhPhu),
        style: 'name'
      },
      {
        text: this.getKhacText('Bệnh khác: ', this.getTextObj(tt.benhKhac)),
        style: 'name'
      },
      {
        text: '5. Phương pháp điều trị:',
        style: 'header'
      },
      {
        text: this.getTextNXOption(tt.selectedPpDieuTri),
        style: 'name'
      },
      {
        text: this.getKhacText('Khác: ', this.getTextObj(tt.ppDieuTriKhac)),
        style: 'name'
      },
      {
        text: '6. Kết quả điều trị:',
        style: 'header'
      },
      {
        text: this.getTextNXOption(tt.selectedKqDieuTri),
        style: 'name'
      },
      {
        text: this.getKhacText('Khác: ', this.getTextObj(tt.kqDieuTriKhac)),
        style: 'name'
      },
      {
        text: '7. Hướng điều trị kế tiếp:',
        style: 'header'
      },
      {
        text: this.getTextNXOption(tt.selectedHuongDieuTri),
        style: 'name'
      },
      {
        text: this.getKhacText('Khác: ', this.getTextObj(tt.huongDieuTriKhac)),
        style: 'name'
      },
      {
        text: 'Ngày....... tháng.... năm........',
        style: 'sign'
      },
      {
        text: 'Bác sĩ điều trị',
        style: 'bsdt'
      },
      {
        text: 'Họ tên: ..........................................',
        style: 'hoten'
      },
      {
        text: ' ',
        pageBreak: 'before'
      }
    ]
  }

  public static getTTBAContent(tt: any, pt: PatientModel) {
    const title = 'PHIẾU TÓM TẮT BỆNH ÁN ĐIỀU TRỊ';
    // let pt = tt.selectedPatient;
    let bn = new PatientModel();
    return [
      // row1: title
      {
        text: title,
        bold: true,
        fontSize: 18,
        alignment: 'center',
        margin: [0, 0, 0, 0]
      },
      {
        text: 'Từ ngày: ' + DateService.getDDMMYYY(tt.fromBA) + ' đến ngày: ' + DateService.getDDMMYYY(tt.toBA),
        alignment: 'center',
      },
      {
        text: '1. Bệnh Nhân:',
        style: 'header'
      },
      // row 2
      {
        // 2 collumns: 1: tt chung, 2: pic CV
        columns: [
          [ // 1 rows
            {
              text: 'Họ và tên: ' + pt.patientName,
              style: 'name'
            },
          ],
          [
            {
              text: 'Năm sinh: ' + pt.birthYear,
              style: 'name'
            }
          ]
        ]
      },
      {
        // 2 collumns: 1: tt chung, 2: pic CV
        columns: [
          [ // 1 rows
            {
              text: 'Giới tính: ' + pt.gender,
              style: 'name'
            },
          ],
          [
            {
              text: 'Ngày nhập: ' + pt.imported_at,
              style: 'name'
            },
          ]
        ]
      },
      {
        // 2 collumns: 1: tt chung, 2: pic CV
        columns: [
          [
            {
              text: 'Khu: ' + pt.khu,
              style: 'name'
            }
          ],
          [ 
            {
              text: 'Buồng: ' + tt.buongBA,
              style: 'name'
            },
          ],
          [
            {
              text: 'Giường: ' + tt.giuongBA,
              style: 'name'
            }
          ]
        ]
      },
      {
        text: 'Chẩn đoán: ' + tt.chandoanBA,
        style: 'name'
      },
      {
        text: '1. Diễn biến lâm sàng trong quá trình điều trị:',
        style: 'header'
      },
      {
        text: tt.dienbienBA,
        style: 'name'
      },
      {
        text: '2. Xét nghiệm cận lâm sàng:',
        style: 'header'
      },
      {
        text: tt.XNClsBA,
        style: 'name'
      },
      {
        text: '3. Quá trình điều trị:',
        style: 'header'
      },
      {
        text: tt.qtdtBA,
        style: 'name'
      },
      {
        text: '4. Đánh giá kết quả:',
        style: 'header'
      },
      {
        text: tt.danhgiaBA,
        style: 'name'
      },
      {
        text: '5. Hướng điều trị tiếp và tiên lượng:',
        style: 'header'
      },
      {
        text: tt.huongdieutriBA,
        style: 'name'
      },
      {
        text: 'Ngày....... tháng.... năm........',
        style: 'sign'
      },
      {
        text: 'Bác sĩ điều trị',
        style: 'bsdt'
      },
      {
        text: 'Họ tên: ..........................................',
        style: 'hoten'
      },
      {
        text: ' ',
        pageBreak: 'before'
      }
    ]
  }
  // TTCCon pdflayout
  public static getTTCCDocumentDefinition(tt: any
  ) {
    // const dateXN = this.selectedPatient.i? new Date(this.phieukhambenh.ngaykham).toLocaleDateString(): new Date().toLocaleDateString();
    const title = 'TÓM TẮT QUÁ TRÌNH ĐIỀU TRỊ CẮT CƠN';
    let pt = tt.selectedPatient;
    let hoiChung = tt.selectedHoiChung ? tt.selectedHoiChung.name : '';
    let importDate = DateService.parseImportted_At(tt.selectedPatient.imported_at);
    if (importDate === undefined || importDate.toString() == 'Invalid Date') {
      importDate = DateService.parseDDMMYYYYtoDate(tt.selectedPatient.imported_at);
    }
    if (importDate === undefined || importDate.toString() == 'Invalid Date') {
      importDate = DateService.newUTCDate( new Date())
    }

    return {
      content: this.getTTCCContent(tt),
      info: {
        title: 'Tóm tắt QTĐT CC -' + tt.selectedPatient.patientName
            + '-' + pt.imported_at,
        author: 'YTE',
        subject: 'TT QTĐT CC',
        keywords: 'QTĐT',
      },
      styles: this.getPkbStyles()
    };
  }
    
  // TTCCon pdflayout
  public static getTTBADocumentDefinition(tt: any, pt: PatientModel) {
      // const dateXN = this.selectedPatient.i? new Date(this.phieukhambenh.ngaykham).toLocaleDateString(): new Date().toLocaleDateString();
      const title = 'PHIẾU TÓM TẮT BỆNH ÁN ĐIỀU TRỊ';
      // let pt = tt.selectedPatient;
  
      return {
        content: this.getTTBAContent(tt, pt),
        info: {
          title: 'Tóm tắt BA -' + pt.patientName
              + '-' + pt.imported_at,
          author: 'YTE',
          subject: 'TT QTĐT BA',
          keywords: 'QTĐT',
        },
        styles: this.getPkbStyles()
      };
    }
}
