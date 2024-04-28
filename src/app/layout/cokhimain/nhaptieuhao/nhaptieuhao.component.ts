import { Component, OnInit } from '@angular/core';
import { RecordImportExportForm, PhieuxuatForm } from '../../../shared/model/import.model';
import { DateService } from '../../../shared/services/date.util.service';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';
import { PhieuModel } from '../../../shared/model/import.model';
import { AppStoreService } from '../../../shared';
import { PhieuxuatService } from '../../../shared/services/phieuxuat.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nhaptieuhao',
  templateUrl: './nhaptieuhao.component.html',
  styleUrls: ['./nhaptieuhao.component.scss']
})
// Xuat tieu hao for a month  
export class NhaptieuhaoComponent implements OnInit {

  formData: any = {
    isTieuhao: true,
    title: 'Tiêu hao',
    type: 1
  }
  tkFrom: Date;
  tkTo: Date;
  newExport = false;
  displayDialog = false;
  phieuxuatForm: PhieuxuatForm;
  phieuxuat: PhieuModel;
  rowSelected: any;
  phieuxuatTable: PhieuModel[];
  listRecordImport: RecordImportExportForm[] = [];
  thuocs: ThuocModel[] = [];
  ngayxuat: Date;
  khoNhaps = NhiXuanOptions.khoNhaps;
  kho: NXOption;
  targetYCKBs: any[] = [];
  listphieuxuatModel: PhieuModel[];
  // listphieuxuatModel: PhieuModel[];
  listphieuxuatTable: any[];
  cols: any[] = [];
  colsHV: any[] = [];
  listHV: any[] = [];
  colsDetail: any[] = [];

  constructor(
    private thuocService: ThuocService,
    private appStore: AppStoreService,
    private phieuxuatService: PhieuxuatService,
    private messageService: MessageService,
  ) { 

  }

  ngOnInit() {
    this.newExport = true;
    this.phieuxuat = new PhieuModel();
    this.tkFrom = DateService.newUTCDate(new Date());
    this.tkTo = DateService.newUTCDate(new Date());
    this.cols = [
      { field: 'kho', header: 'Kho' },
      { field: 'exported_at', header: 'Ngày xuất' },
      { field: 'user', header: 'User' },
    ];
    this.colsDetail = [
      // { field: 'mathuoc', header: 'Mã thuốc' },
      { field: 'thuoc', header: 'Tên thuốc' },
      { field: 'unit', header: 'Đơn vị' },
      { field: 'dongia', header: 'Đơn giá' },
      // { field: 'taxplus', header: '+Tax' },
      // { field: 'ngayhh', header: 'Ngày hết hạn' },
      { field: 'soluong', header: 'Số lượng' },
      // { field: 'tax', header: 'Thuế' },
      { field: 'thanhtien', header: 'Thành tiền' },
    ];
    this.colsHV = [
      { field: 'mabenhnhan', header: 'Mã HV' },
      { field: 'fullname', header: 'Tên' },
      { field: 'khu', header: 'Khu' },
      { field: 'tienthuoc', header: 'tienthuoc' },
      { field: 'sa', header: 'sa' },
      { field: 'xq', header: 'xq' },
      { field: 'xn', header: 'xn' },
      { field: 'dt', header: 'dt' },
      { field: 'tienth', header: 'tienth' },
      { field: 'tong', header: 'tong' }
    ];
    // this.phieunhapForm = new PhieunhapForm();
    this.phieuxuatForm = new PhieuxuatForm();
    this.addRecord();
    this.phieuxuatForm.numThuocs = this.phieuxuatForm.listRecordImportExportModel.length;
    this.phieuxuatForm.kho = this.khoNhaps[3]; //default KNS
    this.initData();

  }

  initData() {
    this.ngayxuat = DateService.newUTCDate(new Date());
    this.updateList();
  }

  updateList() {
    // let khoId = this.phieuxuatForm.kho? this.phieuxuatForm.kho.id: this.khoNhaps[3].id;
    this.updateThuocs();
    this.phieuxuatService.getPhieuxuatsTieuhao().subscribe(
      res => {
        this.listphieuxuatModel = res.data;
        this.mapTableData();
      },
      err => {
        console.log(err);
      }
    );
  }
  updateThuocs() {
    this.thuocService.getThuocsByTypeAndKho(2, this.phieuxuatForm.kho.id).subscribe(
      res => {
        this.thuocs = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  changKho() {
    this.updateThuocs();
  }
  changeTH() {
    if (this.formData.isTieuhao) {
      this.formData.title = 'Tiêu hao';
      this.formData.type = 1;
    } else {
      this.formData.title = 'Dịch vụ';
      this.formData.type = 2;
    }
  }
  onTabChange() { }
  changeKho() {}
  xuat() {
    // if (this.validateForm()) {
    //   return;
    // }
    this.parsePhieuxuatToModel();
    if (this.newExport) {
      // this.phieuxuat.id = null;
      this.phieuxuatService.addPhieuxuat(this.phieuxuat).subscribe(
        res => {
          console.log(res);
          this.listphieuxuatModel = res.data;
          this.updateList();
          this.mapTableData();
          this.resetForm();
          this.addSingle('success', 'Thành công', 'Đã thêm phiếu');
        },
        err => {
          this.addSingle('error', 'Lỗi server', 'Thất bại');
          console.log(err);
        }
      );
    } else {
      this.phieuxuatService.editPhieuxuat(this.phieuxuat).subscribe(
        res => {
          console.log(res);
          this.listphieuxuatModel = res.data;
          this.updateList();
          this.mapTableData();
          this.resetForm();
          this.addSingle('success', 'Thành công', 'Đã thêm phiếu');
        },
        err => {
          this.addSingle('error', 'Lỗi server', 'Thất bại');
          console.log(err);
        }
      );
    }
    
  }

  xemDS() {

  }

  mapTableData() {
    // this.
    this.phieuxuatTable = this.listphieuxuatModel.map(r => {
      let row: any = { ...r };
      // let kho = JSON.parse(r.kho);
      // row.kho = kho.name;
      row['exported_at'] = DateService.getDDMMYYY(r.exported_at);

      return row;
    })
  }

  resetForm() {
    this.newExport = true;
    this.phieuxuat = new PhieuModel();
    this.phieuxuatForm = new PhieuxuatForm();
    this.addRecord();
  }

  parsePhieuxuatToModel() {
    // this.phieuxuat.listRecord = JSON.stringify(this.targetYCKBs);
    this.phieuxuat.type = -2;
    this.phieuxuat.user = this.appStore.getAuth()['username'];
    this.phieuxuat.exported_at = this.phieuxuatForm.exported_at;
    this.phieuxuat.kho = this.phieuxuatForm.kho.id;
    // this.phieuxuat.listRecordImportExportModel = this.phieuxuatForm.listRecordImportExportModel;
    this.phieuxuat.listRecordImportExportModel = this.phieuxuatForm.listRecordImportExportModel.map(rd => {
      const row: any = { ...rd };
      row.thuoc = rd.thuoc.maThuoc;//JSON.stringify(rd.thuoc.tenThuoc);
      row.exported_at = this.phieuxuat.exported_at;
      row.type = this.phieuxuat.type;
      row.kho = this.phieuxuat.kho;
      console.log('row to xuat: ', row);
      return row;
    });    
  }

  parsePhieuxuatToForm() {
    const phieu: any = { ...this.phieuxuat };
    this.phieuxuatForm.kho = this.khoNhaps.find(k => k.id === phieu.kho);
    // this.changKho();
    this.thuocService.getThuocsByTypeAndKho(2, this.phieuxuatForm.kho.id).subscribe(
      res => {
        this.thuocs = res.data;
        console.log('----- refresh thuocs: ', this.thuocs);
        
        const list = this.phieuxuat.listRecordImportExportModel;
        if (list) {
          this.phieuxuatForm.listRecordImportExportModel = list.map(rd => {
            const row: any = { ...rd };
            row.thuoc = this.thuocs.find(t => {
              console.log(t.maThuoc.toUpperCase() + '------- seaching thuoc: ' +  rd.thuoc.toUpperCase());
              return t.maThuoc.toUpperCase() === rd.thuoc.toUpperCase();
            });
            console.log('------row Tieu hao: ', row);
            return row;
          });
        }
      },
      err => {
        console.log(err);
      }
    );
    
  }

  changeThuoc(t: ThuocModel) {
    t.note = this.phieuxuatForm.kho.id + ' tồn: ' + this.getTonByKho(t, this.phieuxuatForm.kho).toString();
    console.log('------ tồn th: ', t.note);
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
  changeNumThuoc() {
    this.listRecordImport = [];
    const num: number = Number.parseInt(this.phieuxuatForm.numThuocs.toString());
    for (let i = 0; i < num; i++) {
      this.addRecord();
    }
  }

  addRecord() {
    const rd = new RecordImportExportForm();
    this.phieuxuatForm.listRecordImportExportModel.push(rd);
    this.phieuxuatForm.numThuocs = this.phieuxuatForm.listRecordImportExportModel.length;
  }

  removeRecord() {
    this.phieuxuatForm.listRecordImportExportModel.pop();
    this.phieuxuatForm.numThuocs = this.phieuxuatForm.listRecordImportExportModel.length;
  }

  spliceRecord(i) {
    this.phieuxuatForm.listRecordImportExportModel.splice(i, 1);
  }

  onRowSelect(e) {
    console.log(this.rowSelected);
    // this.phieuxuat = { ...this.rowSelected };
    this.displayDialog = true;
  }

  editPhieu() {
    this.newExport = false;
    this.phieuxuat = this.listphieuxuatModel.filter(p => {
      return p.id === this.rowSelected.id;
    })[0];
    this.parsePhieuxuatToForm();
    this.displayDialog = false;
  }

  delete() {
    this.clearMsg();
    this.displayDialog = false;
    this.phieuxuatService.deletePhieuxuat(this.rowSelected.id).subscribe(
      res => {
        this.listphieuxuatModel = res.data;
        this.mapTableData();
        this.addSingle('success', 'Thành công', 'Đã xóa');
      },
      err => {
        this.addSingle('error', 'Lỗi Server', 'Không xóa được');
      }
    );
    this.resetForm();
  }

  xemChiTietPhieu() {
    this.newExport = true;
    this.displayDialog = false;
    // this.listRecordImport = JSON.parse(this.phieunhapTable.listRecordImportExportModel);
    this.parsePhieuxuatToForm();
    // this.mapTableDetail();
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
