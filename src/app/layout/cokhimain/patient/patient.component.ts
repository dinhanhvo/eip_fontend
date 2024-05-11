import { Component, OnInit } from '@angular/core';

import { PatientService } from '../../../shared/services/patient.service';
import { PatientModel } from '../../../shared/model/patient.model ';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

import { DateService} from '../../../shared/services/date.util.service';
import { ExcelUtil } from '../../../shared/utils/excel-util';
import { Weigh } from '../../../shared/model/user';
import { WeighService } from '../../../shared/services/weigh.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  weigh: Weigh;
  weighs: Weigh[] = [];
  selectedWeigh: Weigh;

  displayDialog: boolean;

  // patient: PatientModel;
  // selectedPatient: PatientModel;
  // patients: PatientModel[] = [];
  cols: any[];

  searching = false;

  msgs: Message[] = [];
  constructor(
    private patientService: PatientService,
    private router: Router,
    private messageService: MessageService,
    private dateService: DateService,
    private weighService: WeighService
  ) { }


  ngOnInit() {
    this.searching = true;
    this.weighService.getAllWeighs().subscribe(
      data => {
        // console.log('getAllPatients: ', data.data);
        this.weighs = data;
        this.searching = false;
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );

    this.weigh = new Weigh();
    this.weigh.dateProduce = new Date();

    // @ts-ignore
    this.cols = [
      { field: 'serialWeigher', header: 'Mã Cân' },
      { field: 'model', header: 'Hãng sản xuất' },
      { field: 'power', header: 'Nguồn' },
      { field: 'dateProduce', header: 'Ngày sản xuất' },
    ];

  }

  addFromFile() {
    this.router.navigate(['/admin/excelltool']);
  }

  exportBNExcel() {
      ExcelUtil.exportExcell('DS Cân', this.weighs);
  }

  showDialogToAdd() {
    // this.selectedPatient = null;
    // this.patient = null;
    // this.resetForm();
    console.log('showDialogToAdd =========', this.weigh);
    // this.newPatient = true;
    this.displayDialog = true;
  }

  // resetForm() {
  //   this.patient = null;
  //   this.patient = new PatientModel();
  //   this.patient.imported_at = DateService.newUTCDate(new Date());
  // }

  save() {
    if (this.weigh.id) {
      this.weighService.updateWeigh(this.weigh).subscribe(
          data => {
            console.log('saved weigh: ', data);
            // let ts: PatientModel[] = data.data;
              // tslint:disable-next-line:triple-equals
              this.weighs = this.weighs.map(w => w.id == data.id ? data : w);
            this.displayDialog = false;
            this.addSingle('success', 'Thành công', 'Đã  cập nhật  Cân ' + this.weigh.serialWeigher);
          },
          err => {
            this.addSingle('error', 'Lỗi Server', 'Không cập nhật được Cân ');
          }
      );
    } else {
      this.weighService.addWeigh(this.weigh).subscribe(
          data => {
            console.log('updated weigh: ', data);
            // this.weighs.splice(0, 0, data);
            // tslint:disable-next-line:triple-equals
            this.weighs.splice(0, 0, data);
            this.displayDialog = false;
            this.addSingle('success', 'Thành công', 'Đã thêm Cân ' + this.weigh.serialWeigher);
          },
          err => {
            this.addSingle('error', 'Lỗi Server', 'Không thêm được cân ');
          }
      );

    }
  }

  delete() {
    const index = this.weighs.indexOf(
        this.selectedWeigh, 0
    );

    console.log('>>delete>>>>> selected: ', this.selectedWeigh);
    this.weighService.deleteWeigh(this.selectedWeigh.id).subscribe(
        res => {
          this.weighs.splice(index, 1);
          this.displayDialog = false;
          this.addSingle('success', 'Thành công', 'Đã xóa Cân ' + this.weigh.serialWeigher);
        }, error => {
          this.addSingle('error', 'Lỗi', 'Không xóa được Cân ');
        }
    );
  }

  onRowSelect(event) {
    console.log(' onRowSelect >>>>>>> selected: ', this.selectedWeigh);
    this.weigh = {...this.selectedWeigh};

    this.displayDialog = true;
  }

  hideMessage() {
    this.msgs = [];
  }

  ngOnDestroy(): void {
    this.weighs = null;
    this.weigh = null;
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
