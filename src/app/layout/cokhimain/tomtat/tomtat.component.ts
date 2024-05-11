import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {Message} from 'primeng/components/common/api';
import {NhiXuanOptions, NXOption} from '../../../shared/common/selectitem';
import {PatientModel} from '../../../shared/model/patient.model ';
import {PhieuKhamBenh, PhieuKhamBenhModel} from '../../../shared/model/phieukhambenh';
import {SotheodoiModel} from '../../../shared/model/sotheodoi.model';
import {DateService} from '../../../shared/services/date.util.service';
import {PhieukhambenhService} from '../../../shared/services/phieukhambenh.service';
import {PdfUtil} from '../../../shared/utils/pdf-util';
import {SoTinhtienHocvien} from '../../../shared/utils/pdf-tinhtien-hocvien';
import {DonthuocService} from '../../../shared/services/donthuocs.service';
import {ThuocService} from '../../../shared/services/thuoc.service';
import {ThuocModel} from '../../../shared/model/thuoc.model';
import {User, Weigh} from '../../../shared/model/user';
import {LoginService} from '../../../shared';
import {WeighService} from '../../../shared/services/weigh.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tomtat',
  templateUrl: './tomtat.component.html',
  styleUrls: ['./tomtat.component.scss']
})
export class TomtatComponent implements OnInit {

  user: User = {};
  selectedUser: User;
  users: User[] = [];
  categories: SelectItem[] = [];
  weighs: Weigh[] = [];
  selectedWeigh: Weigh;

  headerCSS = {
    fontSize: 14,
    bold: true,
    margin: [0, 20, 0, 10],
    decoration: 'underline'
  };
  tableHeaderCSS = {
    bold: true,
  };
  tabIndex = 0;

  cols: any[];
  colPKBs: any[];
  formMode = false;
  isInvalid = false;
  // sotheodois: SotheodoiModel[];
  tomtat: any = {};
  tomtatBA: any = {};
  sotheodoisTable: SotheodoiModel[];
  patients: PatientModel[] = [];
  patientsTB: PatientModel[] = [];
  hoiChungOpts = NhiXuanOptions.hoiChungOpt;

  qtdtKhac: string = '';
  kqClsKhac: string = '';
  benhKhac: string = '';
  ppDieuTriKhac: string = '';
  kqDieuTriKhac: string = '';
  huongDieuTriKhac: string = '';

  // selectedSothedoi: SotheodoiModel;
  selectedSothedoiFromTb: SotheodoiModel;
  selectedPatient: PatientModel;
  selectedPatientTB: PatientModel;
  selectedHoiChung: NXOption;
  selectedKetquaCLS: NXOption;
  selectedPpDieuTri: NXOption;
  selectedBenhChinh: NXOption;
  selectedKqDieuTri: NXOption;
  selectedHuongDieuTri: NXOption;
  selectedBenhPhu: NXOption[];

  // TT Bệnh Án:
  buongBA: string;
  giuongBA: string;
  chandoanBA: string;
  fromBA: Date = new Date();
  toBA: Date = new Date();
  dienbienBA: string;
  qtdtBA: string;
  XNClsBA: string;
  danhgiaBA: string;
  huongdieutriBA: string;

  xemFrom: Date;
  xemTo: Date;
  pkbs: PhieuKhamBenh[] = [];
  pdfIndex = -1;
  invalidBTPdf = true;
  pkbModels: PhieuKhamBenhModel[] = [];
  phieuModelTB: PhieuKhamBenhModel;
  searching = false;

  msgs: Message[] = [];
  thuocs: ThuocModel[] = [];

  constructor(
    // private scriptService: ScriptService,
    // private patientService: PatientService,
    private phieukhambenhService: PhieukhambenhService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private donthuocService: DonthuocService,
    private thuocService: ThuocService,
    private loginService: LoginService,
    private weighService: WeighService

    // private dateService: DateService
    // private thuocService: ThuocService
  ) { }

  ngOnInit() {
    this.loginService.getMe().subscribe(
        data => {
          //console.log('got data', data);
          if (data.errors && data.errors.length > 0) {
            console.log('Current session invalid. Getting out...');
          } else {
            this.user = data;
          }
        },
        error => {
          console.log('Error while validating session', error);
        }
    );

    this.loginService.getAllUser().subscribe(
        data => {
          //console.log('got data', data);
          if (data.errors && data.errors.length > 0) {
            console.log('Current session invalid. Getting out...');
          } else {
            this.users = data;
            this.selectedUser = this.users[0]
          }
        },
        error => {
          console.log('Error while validating session', error);
        }
    );

    this.initCan();

  }

  initCan() {
    this.categories = [];
    this.weighService.getAllWeighs().subscribe(
        data => {
          console.log('getAllCan: ', data);
          this.weighs = data;
          // this.categories = data.data;
          this.weighs.forEach(element => {
            if (element.serialWeigher) {
              const e = {label: element.serialWeigher, value: element.id};
              this.categories.push(e);
            }
          });
          this.selectedWeigh = this.weighs[0];
          console.log(' nhom categories: ', this.categories);
        },
        err => {
          console.log(err);
        }
    );
  }

  changUser() {
    console.log('');
  }

  changWeigh() {
    // this.milkCollectService.getMilkCollectByCan(selectedWeigh, this.tkFrom, this.tkTo).subscribe(
    //     res => {
    //       this.messages = res.data;
    //     },
    //     err => {
    //       console.log(err);
    //     }
    // );
  }
  // initDanhSach() {
  //   this.patientsTB = [];
  //   this.patients = this.patientService.getAllPatients();
  //   this.patients.forEach((e) => {
  //     this.patientsTB.push({ ...e });
  //   });
  // }

  parPKBModelToForm(pmd: PhieuKhamBenhModel): PhieuKhamBenh {
    let phieukhambenh = new PhieuKhamBenh();
    phieukhambenh.id = pmd.id;
    // let date = pmd.ngaykham;
    phieukhambenh.ngaykham = DateService.newUTCDate(pmd.ngaykham);
    const obj = JSON.parse(pmd.others);
    phieukhambenh.CLSs = JSON.parse(pmd.clsjs);
    // phieukhambenh.ketquaCLSs = JSON.parse(pmd.ketquaCLSs);
    phieukhambenh.ketluan = pmd.ketluan;
    phieukhambenh.donThuocs = JSON.parse(pmd.donthuocjs);
    phieukhambenh.doctor = obj.doctor;
    phieukhambenh.selectedPatient = obj.patient;
    phieukhambenh.chandoan = obj.chandoan;
    phieukhambenh.chandoanKhac = obj.chandoankhac;
    // phieukhambenh.kqCLSKhac = obj.kqCLSKhac;
    phieukhambenh.phieukhu = obj.phieukhu;
    phieukhambenh.tienthuoc = pmd.tienthuoc;
    phieukhambenh.tien_sa = pmd.tien_sa;
    phieukhambenh.tien_dt = pmd.tien_dt;
    phieukhambenh.tien_xn = pmd.tien_xn;
    phieukhambenh.tien_xq = pmd.tien_xq;
    phieukhambenh.tienkhac = pmd.tienkhac;
    phieukhambenh.tongtien = pmd.tongtien;
    return phieukhambenh;
  }

  getNXOptionsNames(clss): string {
    let obj = JSON.parse(clss);
    // console.log('---obj:' , obj);
    let s = '';
    if (obj === null || obj === undefined || obj[0] === undefined || obj[0].name === undefined) {
      return s;
    }
    obj.forEach((e, i) => {
      s += ++i + '. ' + e.name + '   ';
    });
    return s;
  }

  // focusPatient() {
  //   console.log('--khambenh----focusPatient-------', this.patients);
  //   if (this.patients) {
  //     return;
  //   }
  //   this.patients = this.patientService.getAllPatients();
  // }

  getPdfPKBsData() {
    this.searching = true;
    if (this.selectedPatient.id === undefined) {
      this.phieukhambenhService.getPhieukhambenhsByDates(this.xemFrom, this.xemTo).subscribe(
        res => {
          this.pkbModels = res.data;
          this.pkbs = this.pkbModels.map((pmd, i) => {
            return this.parPKBModelToForm(pmd);
          });
          if (this.pkbs.length > 0) {
            this.pdfIndex = 0;
            this.invalidBTPdf = false;
          }
          this.searching = false;
        },
        err => {
          this.searching = false;
          this.addSingle('error', 'Lỗi server', 'Không lấy được dữ liệu');
        }
      );
    } else {
      this.phieukhambenhService.getPhieukhambenhsByMabenhnhan(this.selectedPatient.patientId, this.xemFrom, this.xemTo).subscribe(
        res => {
          this.searching = false;
          this.pkbModels = res.data;
          this.pkbs = this.pkbModels.map((pmd, i) => {
            return this.parPKBModelToForm(pmd);
          });
          if (this.pkbs.length > 0) {
            this.pdfIndex = 0;
            this.invalidBTPdf = false;
          }
        },
        err => {
          this.searching = false;
          this.addSingle('error', 'Lỗi server', 'Không lấy được dữ liệu');
        }
      );
    }
  }

  checkInvalidPdfBtn() {
    if (this.pdfIndex >= this.pkbs.length - 1) {
      console.log('------- last i------', this.pdfIndex);
      // PdfUtil.gerneratePKBByDates(action, [this.pkbs[this.pkbs.length - 1]]);
      this.invalidBTPdf = true;
      this.addSingle('success', 'Hết: ', ' Đã xuất hết danh sách đơn thuốc')
    }
  }

  xemSotheodoiPdf(action = 'open') {
    if (this.pkbs.length > 0) {
      PdfUtil.generateSotheodoi(action, this.tomtat, this.pkbs, this.tomtatBA);
    } else {
      this.addSingle('warning', 'Không có Dữ liệu', 'Không tìm thấy phiếu khám bệnh')
    }
  }

  xemSoTinhTienPdf(action = 'open') {
    if (this.pkbs.length > 0) {
      this.donthuocService.getAllRecordsOfPatient(this.selectedPatient.patientId).subscribe(
        res => {
          let dts = res.data;
          SoTinhtienHocvien.generateSoTinhTien(action, this.pkbs, dts, this.thuocs);
        },
        err => {

        }
      );
    } else {
      this.addSingle('warning', 'Không có Dữ liệu', 'Không tìm thấy phiếu khám bệnh')
    }
  }

  xem1Pdf(action = 'open') {
    PdfUtil.generatePdf('open', this.parPKBModelToForm(this.phieuModelTB));
  }

  parseTomtat() {
    this.tomtat = {
      selectedPatient: this.selectedPatient,
      selectedHoiChung: this.selectedHoiChung,
      qtdtKhac: this.qtdtKhac,
      selectedKetquaCLS: this.selectedKetquaCLS,
      kqCLSKhac: this.kqClsKhac,
      selectedBenhChinh: this.selectedBenhChinh,
      selectedBenhPhu: this.selectedBenhPhu,
      benhKhac: this.benhKhac,
      selectedPpDieuTri: this.selectedPpDieuTri,
      ppDieuTriKhac: this.ppDieuTriKhac,
      selectedKqDieuTri: this.selectedKqDieuTri,
      kqDieuTriKhac: this.kqDieuTriKhac,
      selectedHuongDieuTri: this.selectedHuongDieuTri,
      huongDieuTriKhac: this.huongDieuTriKhac
    }
  }

  parseTomtatBA() {
    this.tomtatBA = JSON.parse(this.selectedPatient.tomtatba);
    if (this.tomtatBA) {
      this.fromBA = new Date(this.tomtatBA.fromBA);//DateService.parseDDMMYYYYtoDate(ba.fromBA);
      this.toBA = new Date(this.tomtatBA.toBA);//DateService.parseDDMMYYYYtoDate(ba.toBA);
      this.buongBA = this.tomtatBA.buongBA;
      this.giuongBA = this.tomtatBA.giuongBA;
      this.chandoanBA = this.tomtatBA.chandoanBA;
      this.qtdtBA = this.tomtatBA.qtdtBA;
      this.dienbienBA = this.tomtatBA.dienbienBA;
      this.XNClsBA = this.tomtatBA.XNClsBA;
      this.danhgiaBA = this.tomtatBA.danhgiaBA;
      this.huongdieutriBA = this.tomtatBA.huongdieutriBA;

    } else {
      this.initTTBA();
    }
  }

  xemTTCC(action = 'open') {
    console.log(pdfMake);
    if (this.selectedPatient === undefined || this.selectedPatient.sohoso === undefined
      ) {
      this.addSingle('error', 'Lỗi', 'Không có phiếu khám!');
      return;
    }
    this.parseTomtat();
    const documentDefinition = PdfUtil.getTTCCDocumentDefinition(this.tomtat);
    
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  xemTTBA(action = 'open') {
    console.log(pdfMake);
    if (this.selectedPatient === undefined || this.selectedPatient.sohoso === undefined
      ) {
      this.addSingle('error', 'Lỗi', 'Không có phiếu khám!');
      return;
    }
    this.parseTomtatBA();
    const documentDefinition = PdfUtil.getTTBADocumentDefinition(this.tomtatBA, this.selectedPatient);
    
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  getKhacText(s1, s): string {
    let sr = '';
    if (s) {
      sr = s1 + s;
    }
    return sr;
  }

  getTextObj(obj): string {
    return obj ? obj + '' : '';
  }
  getTextNXOption(obj: NXOption): string {
    return obj ? obj.name : '';
  }

  getTextNXOptions(nxOs: NXOption[]): string {
    let s = '';
    if (nxOs) {
      nxOs.forEach((e, i) => {
        s = s + '   ' + (i+1) + '. ' + e.name;
      });
    }
    return s;
  }
  
  
  changeMode(e) {
    console.log('====================================');
    console.log(this.formMode);
    console.log('====================================');
  }

  changePatient() {
    console.log('===========selectedPatient=========================');
    console.log(this.selectedPatient);
    // console.log(this.selectedPatientTB);
    // if (this.selectedPatient.sohoso) {
    // } else {
    //   this.addSingle('error', 'Lỗi ', 'Không thấy hồ sơ !!!');
    //   return;
    // }
    this.updateForm();
    this.checkValidBT();
    this.xemFrom = DateService.parseImportted_At(this.selectedPatient.imported_at);

    if (this.xemFrom === undefined || this.xemFrom.toString() == 'Invalid Date') {
      this.xemFrom = DateService.newUTCDate(this.selectedPatient.imported_at);
    }
    if (this.xemFrom === undefined || this.xemFrom.toString() == 'Invalid Date') {
      this.xemFrom = DateService.newUTCDate( new Date())
    }
    console.log('===============================xemFrom=====', this.xemFrom);
    this.parseTomtat();
    this.parseTomtatBA();
    this.pkbModels = [];
    this.getPdfPKBsData();
  }

  updateForm() {
    this.formMode = (this.selectedPatient.sohoso === null) ||
      (this.selectedPatient.sohoso === undefined) || (this.selectedPatient.sohoso === '');
    console.log(this.formMode);

    if (this.formMode) {
      const pt = this.selectedPatient;
      this.resetForm();
      this.selectedPatient = pt;
    } else {
      const obj = JSON.parse(this.selectedPatient.sotheodoi);
      this.changeCommon(obj);
    }
  }

  changeCommon(obj) {
    this.selectedHoiChung = obj.hoiChung;
    this.selectedKetquaCLS = obj.ketquaCLS;
    this.selectedBenhChinh = obj.benhChinh;
    this.selectedBenhPhu = obj.benhPhu;
    this.selectedPpDieuTri = obj.ppDieuTri;
    this.selectedKqDieuTri = obj.kqDieuTri;
    this.selectedHuongDieuTri = obj.huongDieuTri;

    this.qtdtKhac = obj.qtdtKhac;
    this.kqClsKhac = obj.kqClsKhac;
    this.benhKhac = obj.benhKhac;
    this.ppDieuTriKhac = obj.ppDieuTriKhac;
    this.kqDieuTriKhac = obj.kkDieuTriKhac;
    this.huongDieuTriKhac = obj.huongDieuTriKhac;
  }

  validateForm(): boolean {
    this.msgs = [];
    let rt = true;
    if (this.selectedPatient === undefined) {
      this.addSingle('error', 'Lỗi nhập', 'Không thấy hồ sơ !!!');
      return;
    }
    const ft = this.patientsTB.filter((so) => {
      if (so.sohoso === this.selectedPatient.sohoso) {
        console.log('found---------');
      }
      return so.sohoso === this.selectedPatient.sohoso;
    });
    if (ft !== undefined && ft.length > 0 && this.formMode) {
      // this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Hồ sơ đã tồn tại !!!' });
      this.addSingle('error', 'Lỗi nhập', 'Hồ sơ đã tồn tại !!!');
      rt = false;
    }
    return rt;
  }

  initTTBA() {
    this.tomtatBA = {};
    this.buongBA = '';
    this.giuongBA = '';
    this.chandoanBA = '';
    this.fromBA = DateService.newUTCDate(new Date());
    this.toBA = DateService.newUTCDate(new Date());
    this.dienbienBA = '';
    this.XNClsBA = '';
    this.danhgiaBA = '';
    this.qtdtBA = '';
    this.huongdieutriBA = '';
  }

  saveUser() {
    this.selectedUser.serialWeigher = this.selectedWeigh.serialWeigher;
    this.loginService.updateUser(this.selectedUser).subscribe(
        res => {
          this.user = res.data;
          this.addSingle('success', 'Thành công', 'Đã lưu thông tin người dùng');
        },
        err => {
          this.addSingle('error', 'Lỗi', 'Có lỗi xảy ra');
        }
    );
  }
  onTabOpen(event) {
    // this.messageService.add({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
    // this.addSingle('info', 'abc', 'Index: ' + event.index);
    // if (this.patientsTB.length === 0) {
    //   this.initDanhSach();
    // }
    // this.tabIndex = event.tabIndex;
  }
  
  onRowSelect(event) {
    this.selectedPatientTB = event.data;
    console.log('>>>>>>> selectedPatientTB: ', this.selectedPatientTB.patientId);
    this.selectedPatient = { ...this.selectedPatientTB };
    console.log('>>>>>>> selectedPatient: ', this.selectedPatient);
    this.updateForm();
    this.checkValidBT();
    // this.displayDialog = true;
    this.tabIndex = 0;
  }

  resetForm() {
    this.selectedPatient = undefined;
    this.selectedHoiChung = undefined;
    this.selectedKetquaCLS = undefined;
    this.selectedBenhChinh = undefined;
    this.selectedBenhPhu = undefined;
    this.selectedPpDieuTri = undefined;
    this.selectedKqDieuTri = undefined;
    this.selectedHuongDieuTri = undefined;

    this.qtdtKhac = undefined;
    this.kqClsKhac = undefined;
    this.benhKhac = undefined;
    this.ppDieuTriKhac = undefined;
    this.kqDieuTriKhac = undefined;
    this.huongDieuTriKhac = undefined;

    this.selectedPatient = new PatientModel();
    this.checkValidBT();
    // this.selectedSothedoi = new SotheodoiModel();
  }

  hideMessage() {
    this.msgs = [];
  }

  checkValidBT() {
    this.isInvalid = this.selectedPatient.patientName === undefined;
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
