import { Component, OnInit } from '@angular/core';

import { PatientService } from '../../../shared/services/patient.service';
import { PatientModel } from '../../../shared/model/patient.model ';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

import { DateService} from '../../../shared/services/date.util.service';
import { ExcelUtil } from '../../../shared/utils/excel-util';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patient: PatientModel;
  displayDialog: boolean;
  selectedPatient: PatientModel;
  newPatient: boolean;
  patients: PatientModel[] = [];
  cols: any[];
  uploadedFiles: any[] = [];
  selectedGender: number;
  selectedYear: number;
  selectedBlood: number;

  searching = false;
  genders = [
    { label: 'Nam', value: 1 },
    { label: 'Nữ', value: 2 },
    { label: 'Khác', value: 3 }
  ];

  bloods = [
    { label: 'Khác', value: 0 },
    { label: 'A', value: 1 },
    { label: 'B', value: 2 },
    { label: 'AB', value: 3 },
    { label: 'O', value: 4 },
  ];

  birthYears = [
    // { label: '1982', value: 0 },
    // { label: '1982', value: 1 },
    // { label: '1982', value: 2 },
    // { label: '1982', value: 3 },
    // { label: '1982', value: 4 },
  ];

  msgs: Message[] = [];
  constructor(
    private patientService: PatientService,
    private router: Router,
    private messageService: MessageService,
    private dateService: DateService
  ) { }


  ngOnInit() {
    this.searching = true;
    // this.patientService.getAllPatients().subscribe(
    //   data => {
    //     console.log('getAllPatients: ', data.data);
    //     this.patients = data.data;
    //     this.searching = false;
    //   },
    //   err => {
    //     console.log(err);
    //     this.searching = false;
    //   }
    // );
    // get from client
    this.patients = this.patientService.getAllPatients();

    this.patient = new PatientModel();
    this.patient.imported_at = DateService.newUTCDate(new Date());
    // this.patient.imported_at = new Date();

    this.cols = [
      { field: 'patientName', header: 'Tên' },
      // { field: 'fullname', header: 'Tên tìm kiếm' },
      { field: 'patientId', header: 'Mã Cân' },
      { field: 'birthYear', header: 'Hãng sản xuất' },
      // { field: 'address', header: 'Địa chỉ' },
      // { field: 'khu', header: 'Khu' },
      // { field: 'sohoso', header: 'Số hồ sơ' },
      // { field: 'mobile', header: 'Di động' },
      // { field: 'gender', header: 'Giới tính' },
      // { field: 'weight', header: 'Cân nặng' },
      // { field: 'huyetap', header: 'Huyết áp' },
      // { field: 'imported_at', header: 'Ngày nhập' },
    ];

    let i = 1, begin = 1900, end = 2022;
    for (i = begin; i < end; i++) {
      let e = { label: i.toString(), value: i }
      this.birthYears.push(e);
    }

    this.selectedBlood = this.bloods[0].value;
    this.selectedGender = this.genders[0].value;
    this.selectedYear = this.birthYears[this.birthYears.length - 1].value;
    // this.patient.categories = [];
    this.searching = false;
  }

  onSelectType(e) {
    // console.log('onSelectType', this.patient.type);
    console.log('onSelectType---', e.value);
  }

  addFromFile() {
    this.router.navigate(['/admin/excelltool']);
  }

  layDulieu() {
    this.searching = true;
    this.patients = this.patientService.getAllPatients();
    setTimeout(() => {
      this.searching = false;
    }, 1000);
  }

  exportBNExcel() {
      ExcelUtil.exportExcell('DS Cân', this.patients);
  }

  showDialogToAdd() {
    this.selectedPatient = null;
    // this.patient = null;
    this.resetForm();
    console.log('showDialogToAdd =========', this.patient);
    this.newPatient = true;
    this.displayDialog = true;
  }

  resetForm() {
    this.patient = null;
    this.patient = new PatientModel();
    this.patient.imported_at = DateService.newUTCDate(new Date());
  }

  save() {
    console.log('-----save patient: ', this.patient);
    if (this.patient.patientName === undefined || this.patient.patientName === '') {
      this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa nhập tên Cân !!!' });
      return;
    }

    this.bloods.forEach(e => {
      if (e.value == this.selectedBlood) {
        this.patient.blood = e.label;
      }
    });

    this.genders.forEach(e => {
      if (e.value == this.selectedGender) {
        this.patient.gender = e.label;
      }
    });

    if (this.newPatient) {
      this.patientService.addPatient(this.patient).subscribe(
        data => {
          console.log('saved ', data);
          // let ts: PatientModel[] = data.data;
          this.patients = data.data;
          this.patientService.setClientPatiens(this.patients);
          // this.displayDialog = false;
          this.patient = new PatientModel();
          this.patient.imported_at = DateService.newUTCDate(new Date());
          this.addSingle('success', 'Thành công', 'Đã thêm Cân ' + this.patient.patientName);
        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Không kết nối được CSDL ' + this.patient.patientName);
        }
      )
    }
    else {
      this.bloods.forEach(e => {
        if (e.value == this.selectedBlood) {
          this.patient.blood = e.label;
        }
      });

      this.genders.forEach(e => {
        if (e.value == this.selectedGender) {
          this.patient.gender = e.label;
        }
      });
      
      this.patientService.editPatient(this.patient).subscribe(
        res => {
          console.log('updated: ', res);
          this.patients = res.data;
          this.patientService.setClientPatiens(this.patients);
          // let ts: PatientModel[] = res.data;
          this.displayDialog = false;
          this.addSingle('success', 'Thành công', 'Đã cập nhật Cân ' + this.patient.patientName);

        },
        err => {
          this.addSingle('error', 'Lỗi Server', 'Không kết nối được CSDL ' + this.patient.patientName);
        }
      )
    }

  }

  delete() {
    console.log('>>delete>>>>> selected: ', this.selectedPatient);
    let index = this.patients.indexOf(this.selectedPatient);
    this.patientService.deletePatient(this.selectedPatient.id).subscribe(
      res => {
        console.log(res);
        this.displayDialog = false;
        this.patients = res.data;
        this.patientService.setClientPatiens(this.patients);
        this.addSingle('success', 'Thành công', 'Đã Xóa Cân ' + this.patient.patientName);

      },
      err => {
        this.addSingle('error', 'Lỗi Server', 'Không kết nối được CSDL ' + this.patient.patientName);
      }
    )
  }

  onRowSelect(event) {
    this.newPatient = false;
    this.patient = this.cloneCar(event.data);
    this.selectedPatient = event.data;
    console.log(' onRowSelect >>>>>>> selected: ', this.selectedPatient);
    // map to patient to show correct info
    this.genders.forEach(e => {
      // console.log(e.label);
      // console.log(this.selectedPatient.unit);

      if (e.label == this.selectedPatient.gender) {
        this.selectedGender = e.value;
      }
    });
    this.bloods.forEach(e => {
      if (e.label == this.selectedPatient.blood) {
        this.selectedBlood = e.value;
      }
    });
    this.birthYears.forEach(e => {
      if (e.label == this.selectedPatient.birthday) {
        this.selectedYear = e.value;
      }
    });

    this.displayDialog = true;
  }

  cloneCar(c: PatientModel) {
    let cate = {};
    for (let prop in c) {
      cate[prop] = c[prop];
    }
    return { ...c };
  }

  onUpload(event) {
    console.log('onUpload', event);

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  hideMessage() {
    this.msgs = [];
  }

  ngOnDestroy(): void {
    this.patient = null;
    this.patients = null;
  }

  onBasicUpload(e) {
    // this.uploadedFiles = [...e.files];
    // this.imgs = e.originalEvent.body.data;
    // this.imagepath = JSON.stringify(this.imgs);
    // console.log('File uploaded: ', this.imagepath);
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
