import { ThuocModel } from './thuoc.model';
import { PatientModel } from './patient.model ';
import { NXOption, NhiXuanOptions } from '../common/selectitem';
import { DateService } from '../services/date.util.service';
import { CLSModel } from './cls.model';
export class PhieuKhamBenh {
    id: number;
    // phieuId: string;
    phieukhu: NXOption; // khám ở khu
    // phieukho: NXOption; // khám ở khu
    // patientId: number;
    patientName: string;
    sohoso: string;
    selectedPatient: PatientModel;
    profilePic: string;
    chandoan: NXOption[];
    chandoanKhac: string;
    contactNo: number;
    // doctor: NXOption;
    doctor: string;
    CLSs: CLSModel[] = [];
    // clsjs: string;
    ketquaCLSs: KqCLS[] = [];
    kqCLSKhac: string;
    ketluan: string;
    donThuocs: DonThuoc[] = [];
    tienthuoc: number = 0;
    tien_sa: number = 0;
    tien_xn: number = 0;
    tien_dt: number = 0;
    tien_xq: number = 0;
    tienkhac: number = 0;
    tongtien: number = 0;
    otherDetails: string;
    note: string;
    ngaykham: Date;
    constructor(
    ) {
        // this.CLSs.push(new CLS());
        this.donThuocs.push(new DonThuoc());
        this.ketquaCLSs.push(new KqCLS());
        this.selectedPatient = new PatientModel();
        this.ngaykham = DateService.newUTCDate(new Date());
        // console.log('----------new Date:', this.ngaykham);
        
    }
}

export class PhieuKhamBenhModel {
    id: number;
    patient_id: number;
    mabenhnhan: string;
    fullname: string;
    namsinh: number;
    idcard: string;
    kho: string;
    khu_id: string;
    khu_name: string;
    sohoso: string;
    donthuocjs: string;
    // donThuocs: DonThuoc[];
    clsjs: string;
    ketquaCLSs: string;
    ketluan: string;
    ngaykham: Date;
    tienthuoc: number = 0;
    tien_sa: number = 0;
    tien_xn: number = 0;
    tien_dt: number = 0;
    tien_xq: number = 0;;
    tienkhac: number = 0;
    tongtien: number = 0;
    note: string;
    others: string;
    constructor() {
        this.ngaykham = new Date();
        // this.donThuocs = [];
    }
}

// CREATE TABLE `phieu_kham_benh` (
//     `id` bigint(20) NOT NULL AUTO_INCREMENT,
//     `patient_id` bigint(20),
//     `mabenhnhan` varchar(15),
//     `fullname` varchar(95),
//     `idcard` varchar(15),
//     `khu_id` int,
//     `khu_name` varchar(100),
//     `sohoso` varchar(15),
//     `donthuocjs` text(5000),
//     `clsjs` text(5000),
//     `others` text(5000),
//     PRIMARY KEY (`id`),
//     CONSTRAINT `phieukbs-patient`    FOREIGN KEY (`patient_id`)     REFERENCES patient (`id`)
//   ) 
//   ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
export class DonThuoc {
    maThuoc: string;
    tenThuoc: string;
    selectedThuoc: ThuocModel;
    cachdung: any;
    donvidung: string;
    lieudungKhac: string;
    songay = 1;
    numb = 0; // number viên or số giọt/phút
    ton = 0;
    time: string;
    sang = 0;
    trua = 0;
    chieu = 0;
    toi = 0;
}

// export class DonThuocModel {
//     maThuoc: string;
//     tenThuoc: string;
//     mabenhnhan: string;
//     tenbenhnhan: string;
//     khu: string;
//     // selectedThuoc: ThuocModel;
//     donvi: string;
//     numb: string;
// }

export class CLS {
    id: string;
    name: string;
}

export class KqCLS {
    id: string;
    name: string;
}

export class Experience {
    employer: string;
    jobTitle: string;
    jobDescription: string;
    startDate: string;
    experience: number;
}

// export class PhieuKhamBenhModel {
//     phieuXetNghiem: string;// a pic
//     reffPic: string;// a pic
//     patient: PatientModel; // ten benh nhan
//     patientId: string;
//     // contactNo: number;
//     maPhieu: string;
//     date: string;
//     doctor: string;
//     CLSs: CLS[] = []; // ds cls
//     donthuocs: DonThuoc[] = [];
//     otherDetails: string;
//     // skills: Skill[] = [];

//     constructor() {
//         this.CLSs.push(new CLS());
//         // this.donthuocs.push(new DonThuoc());
//         // this.skills.push(new Skill());
//         this.patient = new PatientModel();
//     }
// }

export class CachDung {
    method: number; // 0: uống, 1: bôi, 2: nhỏ
    sang: string;
    trua: string;
    chieu: string;
}

export class Skill {
    value: string;
}

