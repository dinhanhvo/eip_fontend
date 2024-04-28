import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppStoreService, AppStore } from '../../../shared'
import { NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { PatientService } from '../../../shared/services/patient.service';
import { PatientModel } from '../../../shared/model/patient.model ';
import { PhieuKhamBenh, PhieuKhamBenhModel, DonThuoc, CLS, KqCLS } from '../../../shared/model/phieukhambenh';
import { PhieukhambenhService } from '../../../shared/services/phieukhambenh.service';
import { DateService } from '../../../shared/services/date.util.service';
// import { ImportService } from '../../../shared/services/import.service';
// import { PhieunhapService } from '../../../shared/services/phieunhap.service';
import { UserService } from '../../../shared/services/user.service';
import { PdfUtil } from '../../../shared/utils/pdf-util';

import * as _ from 'lodash';
import { NhiXuanUtil } from '../../../shared/utils/nhixuan_utils';
import { ClsService } from '../../../shared/services/cls.service';
import { CLSModel } from '../../../shared/model/cls.model';
import { SoTinhtienHocvien } from '../../../shared/utils/pdf-tinhtien-hocvien';
import { RecordModel } from '../../../shared/model/import.model';
import { DonthuocService } from '../../../shared/services/donthuocs.service';
import { ExcelUtil } from '../../../shared/utils/excel-util';

@Component({
  selector: 'app-khambenh',
  templateUrl: './khambenh.component.html',
  styleUrls: ['./khambenh.component.scss']
})
export class KhambenhComponent implements OnInit, OnDestroy {

  allPkbs: boolean = false;
  username: string = '';
  msgs: any[] = [];
  tons: any[] = [];
  cols: any[];
  displayDialog = false;
  displayKhu = false;
  formMode = false;
  isNewSotheodoi = false;
  searching = false;

  acctionAdd = true;
  isEditPhieu = false;
  invalidBTAdd = true;
  invalidBTEdit = true;
  invalidBTPdf = true;
  modeText = 'Thêm phiếu khám bệnh';
  patients: PatientModel[] = [];
  patientsTB: PatientModel[] = [];

  phieukhambenh: PhieuKhamBenh;
  pkbs: PhieuKhamBenh[] = [];
  pkbModels: PhieuKhamBenhModel[] = [];
  phieuModel: PhieuKhamBenhModel;
  phieuModelTB: PhieuKhamBenhModel;
  // phieuKBs: PhieuKhamBenhModel[];
  phieuKBsphieuKBsTB: PhieuKhamBenhModel[];
  ngayKham = new Date();
  khukbs: NXOption[] = [];// = NhiXuanOptions.khukbs;
  doctors = NhiXuanOptions.doctors;
  chandoans = NhiXuanOptions.chandoans;
  cachDungs = NhiXuanOptions.cachDungs;
  donviDungs = NhiXuanOptions.donviDungs;
  clss: CLSModel[] = []; //NhiXuanOptions.clss;
  sieuams: CLSModel[] = [];
  XQs: CLSModel[] = [];
  XNs: CLSModel[] = [];
  ketquaCLSs = NhiXuanOptions.ketquaCLSs;

  thuocs: ThuocModel[] = []; // store data from database
  allThuocs: ThuocModel[] = []; // store data from database
  thuodIDs: any[] = []; // to load into options list
  selectedThuocs: ThuocModel[];
  patientIDs: any[] = [];
  selectedPatient: PatientModel = null;
  sotheodoi: any;
  selectedPatientTB: PatientModel;
  selectedHoiChung: string;
  selectedKetquaCLS: string;
  selectedPpDieuTri: string;
  selectedBenhChinh: string;
  selectedKqDieuTri: string;
  selectedHuongDieuTri: string;
  selectedBenhPhu: string;
  benhKhac: string;
  kqClsKhac: string;
  ptWeight: string;
  ptHuyetap: string;
  patientNames: any[] = [];
  selectedCLS: string;

  selectedPhieu: PhieuKhamBenhModel;

  khoNhaps = NhiXuanOptions.khoNhaps;
  khuXuats: NXOption[] = [];//NhiXuanOptions.khukbs;
  khuXuatTN = NhiXuanOptions.khuXuatTN;
  khuXuatDVYT = NhiXuanOptions.khuXuatDVYT;
  khuXuatNS = NhiXuanOptions.khuXuatNS;
  tontmps: number[] = [];
  kho: string = '';
  private userProfile: Object = {
    id: 0,
    username: '',
    name: ''
  }

  constructor(
    // private scriptService: ScriptService,
    private patientService: PatientService,
    private thuocService: ThuocService,
    private phieukbService: PhieukhambenhService,
    private messageService: MessageService,
    // private nhapxuatService: PhieunhapService,
    private appStore: AppStoreService,
    private userService: UserService,
    private clsService: ClsService,
    private donthuocService: DonthuocService
  ) {
    this.initFormData();
  }

  ngOnInit() {
    this.khukbs = [...NhiXuanOptions.khukbs];
    this.khukbs.splice(0, 1);
    this.khuXuats = this.khukbs;
    this.displayKhu = true;
    this.searching = true;
    this.username = this.appStore.getAuth()['username'];
    if (this.username === 'voda') {

    }
    this.patients = [];
    this.patientsTB = [];
    this.thuocs = [];
    // this.phieukbService.getAllPhieukhambenhs().subscribe(
    //   res => {
    //     this.pkbModels = res.data;
    //     this.cloneDataTable();
    //     this.searching = false;
    //   },
    //   err => {
    //     console.log(err);
    //     this.searching = false;
    //   }
    // );
    this.patients = this.patientService.getAllPatients();

    this.userService.getUserProfile(this.appStore.getAuth()['username']).subscribe(
      res => {
        this.userProfile = res;
      }, err => {

      }
    );
  }

  initFormData() {
    this.cols = [
      // { field: 'id', header: 'ID' },
      { field: 'mabenhnhan', header: 'Mã bệnh nhân' },
      { field: 'fullname', header: 'Tên bệnh nhân' },
      { field: 'khu_name', header: 'Khu' },
      { field: 'clsjs', header: 'CLS' },
      { field: 'ketluan', header: 'Kết quả' },
      { field: 'ngaykham', header: 'Ngày khám' },
      { field: 'tienthuoc', header: 'Tiền thuốc' },
      { field: 'tien_sa', header: 'Tiền Siêu âm' },
      { field: 'tien_xq', header: 'Tiền Xquang' },
      { field: 'tien_xn', header: 'Tiền Xét nghiệm' },
      { field: 'tien_dt', header: 'Tiền Điện tim' },
      { field: 'tongtien', header: 'Tổng:' },
      // { field: 'donthuocjs', header: 'Đơn thuốc' },
      // { field: 'others', header: 'KHác' }
    ];
    this.formMode = false;
    this.isNewSotheodoi = false;
    this.acctionAdd = true;
    this.invalidBTAdd = false;
    this.invalidBTEdit = false;
    this.invalidBTPdf = false;
    this.modeText = 'Thêm phiếu khám bệnh';
    this.phieukhambenh = new PhieuKhamBenh();
    console.log('---ngaykham:', this.phieukhambenh.ngaykham);

    // this.phieukhambenh.ngaykham = new Date();
    // if (!this.phieukhambenh.CLSs || this.phieukhambenh.CLSs.length === 0) {
    this.phieukhambenh.CLSs = [];
    this.phieukhambenh.ketquaCLSs = [];

    // this.phieukhambenh.CLSs.push(new CLS());
    // this.phieukhambenh.ketquaCLSs.push(new KqCLS());
    // this.addCLS();
    // }
    console.log('---init clss: ', this.phieukhambenh.CLSs);

    if (!this.phieukhambenh.donThuocs || this.phieukhambenh.donThuocs.length === 0) {
      this.phieukhambenh.donThuocs = [];
      this.selectedThuocs = [];
      this.addDonThuoc();
      // this.phieukhambenh.donThuocs.push(new DonThuoc());
    }

    this.selectedPhieu = new PhieuKhamBenhModel();
    this.selectedPatient = new PatientModel();
    this.selectedCLS = '';

    this.checkValidButtons();
    // this.phieukhambenh = new PhieuKhamBenh(); // use on Form
    const phieu = JSON.parse(sessionStorage.getItem('phieuSS'));
    if (phieu !== undefined && phieu !== null) {
      this.phieukhambenh.doctor = phieu.doctor;
      this.phieukhambenh.phieukhu = phieu.phieukhu;
    }

    this.clsService.getAllCLSs().subscribe(
      res => {
        this.clss = res.data;
      },
      err => {
        console.log(err);
      }
    );
    this.clsService.getCLSByType('SA').subscribe(
      res => {
        this.sieuams = res.data;
      },
      err => {
        console.log(err);
      }
    );
    this.clsService.getCLSByType('XQ').subscribe(
      res => {
        this.XQs = res.data;
      },
      err => {
        console.log(err);
      }
    );
    this.clsService.getCLSByType('XN').subscribe(
      res => {
        this.XNs = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  focusPatient() {
    console.log('--khambenh----focusPatient-------', this.patients);
    if (this.patients) {
      return;
    }
    this.patients = this.patientService.getAllPatients();
  }

  cloneDataTable() {
    this.phieuKBsphieuKBsTB = [];
    this.pkbModels.forEach((e) => {
      const e1: any = { ...e };
      e1.ngaykham = DateService.getDDMMYYY(e.ngaykham);
      e1.clsjs = this.getNXOptionsNames(e.clsjs);
      this.phieuKBsphieuKBsTB.push(e1);
    });

    this.pkbs = this.pkbModels.map((pmd, i) => {
      return this.parPKBModelToForm(pmd);
    });
  }

  ngOnDestroy() {
    this.phieukhambenh = null;
    this.selectedPhieu = null;
  }

  changeCachdung(dt) {
    console.log('--changeCachdung-', dt);
  }


  changeCLS() {
    console.log('changeCLS-----');
    this.selectedCLS = PdfUtil.getNXOptionsNames(this.phieukhambenh.CLSs);
  }
  formatDate(dt) {
    const d = new Date(dt);
    return DateService.getDDMMYYY(d);
  }

  getNXOptionsNames(clss): string {
    if (clss === undefined || clss === null || clss === '') {
      return '';
    }
    const obj = JSON.parse(clss);
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

  getCachDungType(donthuoc: DonThuoc): number {
    let type = 1;
    this.cachDungs.forEach(cd => {
      if (cd.name.toUpperCase() === donthuoc.selectedThuoc.method.toUpperCase()) {
        donthuoc.cachdung = cd;
        type = cd.type;
      }
    });

    return type;
  }

  // timKho(khu): NXOption {
  //   if (khu) {

  //   } else {
  //     this.addSingle('warn', 'Nhắc :', 'Chưa chọn khu');
  //     return;
  //   }
  //   // const kho = '',
  //   let  index = 0;
  //   console.log('TN', this.khuXuatTN);
  //   console.log('NS', this.khuXuatNS);
  //   console.log('DVYT', this.khuXuatDVYT);

  //   const khuTNs = this.khuXuatTN.filter(k =>
  //     k.id === khu.id
  //   );

  //   if (khuTNs.length > 0) {
  //     this.kho = this.khoNhaps[1].id;
  //     return this.khoNhaps[1];
  //     // return 'KTN';
  //   }
  //   const khuNSs = this.khuXuatNS.filter(k =>
  //     k.id === khu.id
  //   );
  //   if (khuNSs.length > 0) {
  //     this.kho = this.khoNhaps[3].id;
  //     return this.khoNhaps[3];
  //   }

  //   const khuDVYTs = this.khuXuatDVYT.filter(k =>
  //     k.id === khu.id
  //   );
  //   if (khuDVYTs.length > 0) {
  //     this.kho = this.khoNhaps[2].id;
  //     return this.khoNhaps[2];
  //   }
  //   this.kho = this.khoNhaps[index].id;
  //   return this.khoNhaps[index];
  // }

  getThuocTon(thuoc: ThuocModel, kho: NXOption): number {
    let tontmp = 0;
    switch (kho.id) {
      case 'KTN':
        tontmp = thuoc.tnton;
        break;
      case 'DVY':
        tontmp = thuoc.dvton;
        break;
      case 'KNS':
        tontmp = thuoc.nston;
        break;

      default:
        // this.addSingle('warn', 'Nhắc :', 'Chưa chọn khu');
        // donthuoc.selectedThuoc = undefined;
        return;
      // break;
    }
    return tontmp;
  }
  // chọn thuốc cho đơn thuốc thứ i
  changeThuoc(donthuoc: DonThuoc, i) {
    // this.phieukhambenh.phieukho = this.timKho(this.phieukhambenh.phieukhu);


    console.log('-------phieukhu---', this.phieukhambenh.phieukhu);

    if (this.phieukhambenh.phieukhu) {
    } else {
      this.addSingle('warn', 'Nhắc :', 'Chưa chọn khu');
      donthuoc.selectedThuoc = undefined;
      return;
    }

    const khoobj: NXOption = NhiXuanUtil.timKho(this.phieukhambenh.phieukhu);
    this.kho = khoobj.id;
    console.log('-------kho---', khoobj);
    const thuoc: ThuocModel = this.thuocs.find(t => {
      return t.tenThuoc.toUpperCase() === donthuoc.selectedThuoc.tenThuoc.toUpperCase();
    });
    // check ton` by kho
    const tontmp = this.getTonByKho(thuoc, khoobj);

    if (tontmp < 1) {
      this.addSingle('warn', 'Nhắc :', 'Thuốc này đã hết');
      donthuoc.selectedThuoc = undefined;
      return;
    } else {
      this.addSingle('warn', donthuoc.selectedThuoc.tenThuoc + ' kho ' + khoobj.name + ' còn :', tontmp);
    }
    donthuoc.selectedThuoc.note = tontmp.toString();
    // this.tontmps.push(tontmp);
    // get thuoc from the db list and assign to donthuoc
    console.log('--changeThuoc----', donthuoc.selectedThuoc);
    const list = this.thuocs.filter((thuoc) => {
      return donthuoc.selectedThuoc.tenThuoc.toUpperCase() === thuoc.tenThuoc.toUpperCase();
    });

    if (list.length > 1) {
      this.addSingle('warn', 'Nhắc :', 'Thuốc này đã có trong đơn');
    }

    this.getCachDungType(donthuoc);

  }

  getTonByKho(thuoc, kho) {
    let tontmp = 0;
    switch (kho.id) {
      case 'KTN':
        tontmp = thuoc.tnton;
        break;
      case 'DVY':
        tontmp = thuoc.dvton;
        break;
      case 'KNS':
        tontmp = thuoc.nston;
        break;

      default:
        this.addSingle('warn', 'Nhắc :', 'Chưa chọn khu');
        // donthuoc.selectedThuoc = undefined;
        return;
      // break;
    }
    return tontmp;
  }
  addCLS() {
    // this.phieukhambenh.CLSs.push(new CLS());
    // this.phieukhambenh.ketquaCLSs.push(new KqCLS());
    // console.log('----num of ketquaCLSs: ', this.phieukhambenh.ketquaCLSs);

  }

  removeDonThuoc() {
    let dt = this.phieukhambenh.donThuocs.pop();
    dt = null;
  }

  removeCLS() {
    let cl = this.phieukhambenh.CLSs.pop();
    cl = null;
    this.phieukhambenh.ketquaCLSs.pop();
  }

  addDonThuoc() {
    // let tm = new ThuocModel();
    // this.selectedThuocs.push(tm);
    const dt = new DonThuoc();
    let sn = 0;
    if (this.phieukhambenh.donThuocs !== undefined && this.phieukhambenh.donThuocs.length > 0) {
      sn = this.phieukhambenh.donThuocs[this.phieukhambenh.donThuocs.length - 1].songay;
    }
    if (sn > 0) {
      dt.songay = sn;
    }
    // dt.selectedThuoc = tm;
    this.phieukhambenh.donThuocs.push(dt);
    // console.log('initial donthuoc: ', this.selectedThuocs.length);
  }

  saveSessionData() {
    const doctor = this.phieukhambenh.doctor;
    const phieukhu = this.phieukhambenh.phieukhu;
    const data = {
      'doctor': doctor,
      'phieukhu': phieukhu
    };

    sessionStorage.setItem('phieuSS', JSON.stringify(data))
  }

  verifyDonthuoc(dt: DonThuoc, kho: NXOption): boolean {
    let fail = false;
    const dts = this.phieukhambenh.donThuocs;
    dts.forEach(dt => {
      let sl = dt.ton;
      if (dt.cachdung.type === 1) {
        sl = (dt.sang + dt.chieu + dt.toi) * dt.songay;
      }
      fail = sl > this.getThuocTon(dt.selectedThuoc, kho);
      if (fail) {
        return fail;
      }
    });
    return fail;
  }

  savePhieukhambenh(isCopy: boolean) {
    if (this.validateForm()) {
      console.log('----------missing nhap --------');
      
      return; // open to validate
    }

    sessionStorage.setItem('phieukhambenh', JSON.stringify(
      { 'doctor': this.phieukhambenh.doctor, }
    ));

    // sessionStorage.setItem('tons', JSON.stringify(
    //   { 'doctor': this.phieukhambenh.doctor,}
    // ));

    console.log('---', this.selectedPatient);
    // this.phieukhambenh.selectedPatient = { ...this.selectedPatient };
    this.saveSessionData();
    console.log('---PhieuKB: ', JSON.stringify(this.phieukhambenh));
    this.phieuModel = this.parsePKBtoModel(this.phieukhambenh);

    console.log('---PhieuKB model to database: ', JSON.stringify(this.phieuModel));
    if (this.acctionAdd) {
      this.phieukbService.addPhieukhambenh(this.phieuModel).subscribe(
        res => {
          this.pkbModels = res.data;
          this.cloneDataTable();
          this.addSingle('success', 'Đã Lưu', 'Đã thêm phiếu khám bệnh');
          this.resetForm();
          this.updateThuocs();
        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Có lỗi xảy ra');
        }
      );
    } else {// onRowselect check if user wanto copy by old phieu
      if (isCopy) {
        this.phieuModel.id = undefined;
        this.phieukbService.addPhieukhambenh(this.phieuModel).subscribe(
          res => {
            this.pkbModels = res.data;
            this.cloneDataTable();
            this.addSingle('success', 'Đã Lưu', 'Đã thêm phiếu khám bệnh');
            this.resetForm();
            this.updateThuocs();
          },
          err => {
            this.addSingle('error', 'Lỗi Server', 'Có lỗi xảy ra');
          }
        );
      } else {
        this.phieukbService.editPhieukhambenh(this.phieuModel).subscribe(
          res => {
            this.pkbModels = res.data;
            this.cloneDataTable();
            this.addSingle('success', 'Đã Lưu', 'Đã cập nhật phiếu khám bệnh');
            this.resetForm();
            this.updateThuocs();
          },
          err => {
            this.addSingle('error', 'Lỗi Server', 'Có lỗi xảy ra');
          }
        );
      }

    }

  }

  updateThuocs() {
    const khu = this.phieukhambenh.phieukhu;
    const kho = NhiXuanUtil.timKho(khu);
    this.thuocService.getThuocsByKBAndKho(kho.id).subscribe(
      res => {
        this.thuocs = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  generatePdf(action = 'open') {
    if (this.phieukhambenh === undefined || this.phieukhambenh.sohoso === undefined
      || this.phieukhambenh.selectedPatient === undefined
      || this.phieukhambenh.selectedPatient === null || this.phieukhambenh.selectedPatient.patientName === undefined
    ) {
      this.addSingle('error', 'Lỗi', 'Không có phiếu khám!');
      return;
    }
    const documentDefinition = PdfUtil.generatePdf(action, this.phieukhambenh);
  }

  generateSotheodoi(action = 'open') {
    if (this.phieukhambenh === undefined || this.phieukhambenh.sohoso === undefined
      || this.phieukhambenh.selectedPatient === undefined
      || this.phieukhambenh.selectedPatient === null
      || this.phieukhambenh.selectedPatient.patientName === undefined
    ) {
      this.addSingle('error', 'Lỗi', 'Không có phiếu khám!');
      return;
    }
    const documentDefinition = PdfUtil.gerneratePKBByDates(action, [this.phieukhambenh, this.phieukhambenh]);
  }

  resetForm() {
    this.selectedHoiChung = '';
    this.selectedKetquaCLS = '';
    this.kqClsKhac = '';
    this.selectedBenhChinh = '';
    this.selectedBenhPhu = '';
    this.benhKhac = '';
    this.initFormData();
  }

  tinhSoluong(dt: DonThuoc) {
    if (dt.cachdung) {
      if (dt.cachdung.type == 1) {
        dt.numb = dt.songay * (dt.sang + dt.chieu + dt.toi);
      } else {

      }
    }
  }

  parsePKBtoModel(pkb: PhieuKhamBenh): PhieuKhamBenhModel {
    const model = new PhieuKhamBenhModel();
    model.id = pkb.id;
    model.patient_id = pkb.selectedPatient.id; // bigint
    model.mabenhnhan = pkb.selectedPatient.patientId;
    model.namsinh = pkb.selectedPatient.birthYear;
    model.sohoso = pkb.selectedPatient.sohoso;
    model.fullname = pkb.selectedPatient.patientName;
    model.note = pkb.note;
    model.khu_id = pkb.phieukhu.id;
    model.khu_name = pkb.phieukhu.name;
    model.clsjs = JSON.stringify(pkb.CLSs);
    model.ketluan = pkb.ketluan;
    model.kho = JSON.stringify(NhiXuanUtil.timKho(pkb.phieukhu));
    const tiencls = NhiXuanUtil.tongTienCLS(pkb, model);
    model.tienthuoc = 0; // calculate at Backend NhiXuanUtil.tongTienThuoc(pkb);
    model.tongtien = 0; // model.tienthuoc + model.tienkhac + tiencls;
    // model.ngaykham = pkb.ngaykham;
    // convert time to show same in Database
    if (pkb.ngaykham === undefined) {
      pkb.ngaykham = new Date();
    }
    // let dtUTC = DateService.convertToDBTimeMMDDYYYY(pkb.ngaykham);
    // model.ngaykham = new Date(DateService.getDDMMYYY(pkb.ngaykham));
    model.ngaykham = DateService.newUTCDate(pkb.ngaykham);
    // model.khu_id = pkb.phieukhu.id;
    console.log('-----update ngaykham: ', model.ngaykham);

    // model.ketquaCLSs = JSON.stringify(pkb.ketquaCLSs);
    // model.donThuocs = pkb.donThuocs;
    pkb.donThuocs.forEach(dt => {
      if (dt.cachdung && dt.cachdung.type == 1) {
        this.tinhSoluong(dt);
      }
    })
    model.donthuocjs = JSON.stringify(pkb.donThuocs);
    const other = {
      'patient': pkb.selectedPatient,
      'doctor': pkb.doctor,
      'chandoan': pkb.chandoan,
      'chandoankhac': pkb.chandoanKhac,
      'kqCLSKhac': pkb.kqCLSKhac,
      'contact': pkb.contactNo,
      'others': pkb.otherDetails,
      'phieukhu': pkb.phieukhu,
    };
    model.others = JSON.stringify(other);
    return model;
  }

  changeKqClS(e) {
    console.log('changeKqClS----CLSs--', this.phieukhambenh.CLSs);
    console.log('changeKqClS----ketquaCLSs--', this.phieukhambenh.ketquaCLSs);
  }

  changePatient() {
    console.log('===========selectedPatient=========================');
    console.log(this.phieukhambenh.selectedPatient);
    console.log('====================================');
    this.phieukhambenh.sohoso = this.phieukhambenh.selectedPatient.sohoso;
    this.phieukhambenh.doctor = this.userProfile['name'];

    this.checkValidButtons();
    if (this.phieukhambenh.sohoso) {
      this.sotheodoi = JSON.parse(this.phieukhambenh.selectedPatient.sotheodoi);
      // this.changeCommon(obj);
      this.parseSotheodoi(this.sotheodoi);
      this.pkbModels = [];
      this.pkbs = [];
      // let dt = _.get(this.phieukhambenh, 'selectedPatient.imported_at');
      let xemFrom = DateService.parseImportted_At(this.phieukhambenh.selectedPatient.imported_at);
      if (xemFrom === undefined || xemFrom.toString() === 'Invalid Date') {
        xemFrom = DateService.newUTCDate(this.selectedPatient.imported_at);
      }

      const xemTo = DateService.newUTCDate(new Date());
      this.phieukbService.getPhieukhambenhsByMabenhnhan(this.phieukhambenh.selectedPatient.patientId, xemFrom, xemTo).subscribe(
        res => {
          this.pkbModels = res.data;
          this.pkbModels = [...this.pkbModels];
          this.pkbs = this.pkbModels.map((pmd, i) => {
            return this.parPKBModelToForm(pmd);
          });
        },
        err => {
          this.addSingle('error', 'Lỗi server', 'Không lấy được dữ liệu');
        }
      );
    }
  }

  xemLichSu() {
    PdfUtil.gernerateDonthuocByDates('open', this.pkbs);
  }

  parseSotheodoi(obj) {
    this.selectedHoiChung = PdfUtil.getTextNXOption(obj.hoiChung);
    this.selectedKetquaCLS = PdfUtil.getTextNXOption(obj.ketquaCLS);
    this.kqClsKhac = PdfUtil.getTextObj(obj.kqClsKhac);
    this.selectedBenhChinh = PdfUtil.getTextNXOption(obj.benhChinh);
    this.selectedBenhPhu = PdfUtil.getTextNXOptions(obj.benhPhu);
    this.benhKhac = PdfUtil.getTextObj(obj.benhKhac);
  }

  changeShowAll() {
    if (this.allPkbs) {
      this.phieukbService.getAllPhieukhambenhs().subscribe(
        res => {
          this.pkbModels = res.data;
          this.cloneDataTable();
          this.searching = false;
        },
        err => {
          console.log(err);
          this.searching = false;
        }
      );
    } else {
      this.changeKhu();
    }
  }

  changeKhu() {
    this.checkValidButtons();
    const khu = this.phieukhambenh.phieukhu;
    const kho = NhiXuanUtil.timKho(khu);
    this.kho = kho.name;
    const khoId = kho ? kho.id : 0;
    this.thuocService.getThuocsByKBAndKho(khoId).subscribe(
      res => {
        this.thuocs = res.data;
      },
      err => {
        console.log(err);
      }
    );
    this.displayKhu = false;

    let to: Date = DateService.newUTCDate(new Date());
    let from = new Date(to.getFullYear(), to.getMonth(), to.getDate() - 8)
    this.phieukbService.getPhieukhambenhsByKhu(khu.id, from, to).subscribe(
    // this.phieukbService.getAllPhieukhambenhs().subscribe(
      res => {
        this.pkbModels = res.data;
        this.cloneDataTable();
        this.searching = false;
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );
  }

  checkValidButtons() {
    const isFormValid = (this.phieukhambenh.selectedPatient !== undefined &&
      this.phieukhambenh.selectedPatient.sohoso !== null &&
      this.phieukhambenh.selectedPatient.sohoso !== undefined &&
      this.phieukhambenh.selectedPatient.patientName !== undefined
      && this.phieukhambenh.phieukhu !== undefined);
    const hoso = this.phieukhambenh.selectedPatient.sohoso;
    this.isNewSotheodoi = (this.phieukhambenh.selectedPatient.patientId !== undefined) &&
      (hoso === null) || (hoso === undefined) || (hoso === '');
    this.invalidBTAdd = (!this.acctionAdd) || (!isFormValid);
    // this.invalidBTAdd = this.acctionAdd;
    // console.log('------checkButtonThem invalidBTAdd:', this.invalidBTAdd);
    // isCopyPhieu=false it mean we are new
    this.invalidBTEdit = (!isFormValid) || (this.acctionAdd);

    // console.log('------checkButtonThem invalidBTEdit:', this.invalidBTEdit);
    this.invalidBTPdf = this.invalidBTAdd && this.invalidBTEdit;
    // console.log('------checkButtonThem invalidBTPdf:', this.invalidBTPdf);
  }

  changeNgaykham() {
    console.log('---changeNgay to: ', this.phieukhambenh.ngaykham);

  }

  updateForm(mode) {// new or edit phieu
    const hoso = this.phieukhambenh.sohoso;
    this.isNewSotheodoi = (hoso === null) || (hoso === undefined) || (hoso === '');

    if (this.acctionAdd) { // is create sotheodoi or not
      this.modeText = 'Thêm phiếu khám bệnh';
      const pt = { ...this.phieukhambenh.selectedPatient };
      // this.resetForm();
      this.phieukhambenh.selectedPatient = pt;
    } else {
      this.modeText = 'Thay đổi thông tin phiếu khám bệnh';
      this.phieukhambenh.id = this.selectedPhieu.id; // keep id if update
    }
    // this.phieukhambenh.ngaykham = new Date(this.selectedPhieu.ngaykham);
    if (this.selectedPhieu.ngaykham === undefined) {
      this.selectedPhieu.ngaykham = new Date();
    }
    this.phieukhambenh.ngaykham = DateService.newUTCDate(this.selectedPhieu.ngaykham);
    const obj = JSON.parse(this.selectedPhieu.others);
    // this.phieukhambenh.CLSs = JSON.parse(this.selectedPhieu.clsjs);
    this.phieukhambenh.CLSs = JSON.parse(this.selectedPhieu.clsjs);
    this.selectedCLS = PdfUtil.getNXOptionsNames(this.phieukhambenh.CLSs);
    // this.phieukhambenh.ketquaCLSs = JSON.parse(this.selectedPhieu.ketquaCLSs);
    // this.changeKhu();
    this.phieukhambenh.donThuocs = JSON.parse(this.selectedPhieu.donthuocjs);
    this.phieukhambenh.ketluan = this.selectedPhieu.ketluan;
    this.phieukhambenh.note = this.selectedPhieu.note;
    this.changeCommon(obj);
  }

  changeCommon(obj) {
    this.phieukhambenh.doctor = obj.doctor;
    this.phieukhambenh.selectedPatient = obj.patient;
    this.phieukhambenh.chandoan = obj.chandoan;
    this.phieukhambenh.chandoanKhac = obj.chandoankhac;
    // this.phieukhambenh.kqCLSKhac = obj.kqCLSKhac;
    this.phieukhambenh.phieukhu = obj.phieukhu;
    console.log('----------pkb: ', this.phieukhambenh);
  }

  parPKBModelToForm(pmd: PhieuKhamBenhModel): PhieuKhamBenh {
    const phieukhambenh = new PhieuKhamBenh();
    phieukhambenh.id = pmd.id;
    // let date = pmd.ngaykham;
    phieukhambenh.ngaykham = DateService.newUTCDate(pmd.ngaykham);
    const obj = JSON.parse(pmd.others);
    phieukhambenh.CLSs = JSON.parse(pmd.clsjs);
    phieukhambenh.ketquaCLSs = JSON.parse(pmd.ketquaCLSs);
    phieukhambenh.ketluan = pmd.ketluan;
    phieukhambenh.doctor = obj.doctor;
    phieukhambenh.selectedPatient = obj.patient;
    phieukhambenh.chandoan = obj.chandoan;
    phieukhambenh.chandoanKhac = obj.chandoankhac;
    phieukhambenh.kqCLSKhac = obj.kqCLSKhac;
    phieukhambenh.phieukhu = obj.phieukhu;
    // let kho = NhiXuanUtil.timKho(obj.phieukhu);
    phieukhambenh.note = pmd.note;
    // this.changeKhu();
    phieukhambenh.donThuocs = JSON.parse(pmd.donthuocjs);

    return phieukhambenh;
  }

  validateForm(): boolean {
    this.msgs = [];
    let rt = false; // no error

    const pt = this.phieukhambenh.selectedPatient.patientId;
    if (pt === undefined || pt === null) {
      // this.msgs.push({ severity: 'error', summary: 'Lỗi nhập: ', detail: 'Chưa chọn bệnh nhân !!!' });
      this.addSingle('error', 'Lỗi nhập:', 'Chưa chọn bệnh nhân !!!');
      rt = true;
      return;
    }

    if (this.phieukhambenh.doctor === undefined || this.phieukhambenh.doctor === null) {
      // this.msgs.push({ severity: 'error', summary: 'Lỗi nhập: ', detail: 'Chưa chọn bệnh nhân !!!' });
      this.addSingle('error', 'Lỗi nhập:', 'Chưa chọn bác sĩ !!!');
      rt = true;
      return;
    }

    const khu = this.phieukhambenh.phieukhu;
    if (khu === undefined || khu === null ) {
      this.addSingle('error', 'Lỗi:', 'Chưa chọn khu !!!');
      rt = true;
      return;
    }
    const kho = NhiXuanUtil.timKho(khu);
    rt = false;
    this.phieukhambenh.donThuocs.forEach((dt) => {
      if (dt.cachdung) {
        if (dt.cachdung.type === 1) {
          if (dt.sang < 0 || dt.chieu < 0 || dt.toi < 0 || dt.songay < 0) {
            rt = true;
          }
          if ((dt.sang + dt.chieu + dt.toi) * dt.songay > Number.parseFloat(dt.selectedThuoc.note)) {
            rt = true;
            this.addSingle('error', 'Lỗi', 'Xuất quá số lượng');
          }

        } else if (dt.cachdung.type === 2 && (dt.numb < 0)) {
          rt = true;
        } else if (dt.cachdung.type === 4) {
          if (dt.ton < 0) {
            rt = true;
          }
          if (dt.ton > Number.parseFloat(dt.selectedThuoc.note)) {
            rt = true;
            this.addSingle('error', 'Lỗi', 'Xuất quá số lượng');
          }
        }
      }
      if (rt) {
        if (rt) {
          this.addSingle('error', 'Lỗi', 'Số lượng phải lớn hơn 0');
        }
        return rt;
      }
      rt = this.verifyDonthuoc(dt, kho);
      if (rt) {
        this.addSingle('error', 'Lỗi nhập', 'Không đủ thuốc');
        return rt;
      }
    });
    return rt;
  }

  onRowSelect(event) {
    this.phieuModelTB = event.data;
    console.log('>>>>>>> phieuModelTB: ', JSON.stringify(this.phieuModelTB));
    this.selectedPhieu = this.pkbModels.find(pkb => {
      return pkb.id === this.phieuModelTB.id;
    });
    // this.updatePhieu();
    // this.updateForm(this.acctionAdd);
    this.displayDialog = true; // for delete
    this.thuocService.getAllThuocs().subscribe(
      res => {
        this.thuocs = res.data;
        this.allThuocs = [...res.data];
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );
  }

  cancelDel() {
    this.displayDialog = false;
  }

  updatePhieu() {
    this.acctionAdd = false;
    this.phieukhambenh.sohoso = this.selectedPhieu.sohoso;
    // this.parPKBModelToForm(this.selectedPhieu)
    
    const khu = this.selectedPhieu.khu_id;
    // edit mode
    this.updateForm(this.acctionAdd); // edit mode
    this.displayDialog = false;
    this.checkValidButtons();
    this.phieukhambenh.donThuocs = JSON.parse(this.selectedPhieu.donthuocjs);
    this.displayDialog = false;
  }

  copyPhieu() {
    this.phieukhambenh.sohoso = this.selectedPhieu.sohoso;
    this.updateForm(this.acctionAdd);
    this.acctionAdd = true;
    this.checkValidButtons();
  }

  xemPdf() {
    this.copyPhieu();
    this.invalidBTPdf = false; // enable to print, download
    this.generatePdf('open');
    this.displayDialog = false;
    // setTimeout(function(this){ this.resetForm(); }, 1000);
  }

  xemHoadon() {
    this.displayDialog = false;
    // let pkbs: PhieuKhamBenh[] = [{...pkb}]
    const pkb = this.pkbs.find(p => {
      return p.id === this.selectedPhieu.id;
    });
    const pt = this.selectedPhieu.patient_id;

    this.donthuocService.getListDonthuocByPkbIdOfMabn(this.selectedPhieu.mabenhnhan, this.selectedPhieu.id).subscribe(
      res => {
        const dts: RecordModel[] = res.data;
        SoTinhtienHocvien.generateSoTinhTien('open', [pkb], dts, this.allThuocs);
      },
      err => {
      }
    );
  }

  delete() {
    this.clearMsg();
    this.displayDialog = false;
    this.phieukbService.deletePhieukhambenh(this.phieuModelTB.id).subscribe(
      res => {
        this.pkbModels = res.data;
        this.cloneDataTable();
        this.addSingle('success', 'Thành công', 'Đã xóa');
        this.updateThuocs();
      },
      err => {
        this.addSingle('error', 'Lỗi Server', 'Không xóa được');
      }
    );
    this.resetForm();
  }

  exportBNExcel() {
    ExcelUtil.exportExcell('DS Phiếu Khám Bệnh', this.phieuKBsphieuKBsTB);
  }
  addSingle(type, summary, detail) {
    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.messageService.add({ severity: type, summary: summary, detail: detail });
  }

  clearMsg() {
    this.messageService.clear();
  }

}
