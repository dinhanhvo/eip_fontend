import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThuocService } from '../../../shared/services/thuoc.service';
import { ThuocModel } from '../../../shared/model/thuoc.model';
import { CategoryService } from '../../../shared/services/category.service';
import { ExcelUtil } from '../../../shared/utils/excel-util';

import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { CategoryModel } from '../../../shared/model/category.model';
import { NhiXuanOptions, NXOption } from '../../../shared/common/selectitem';

@Component({
  selector: 'app-thuoc',
  templateUrl: './thuoc.component.html',
  styleUrls: ['./thuoc.component.scss']
})
export class ThuocComponent implements OnInit, OnDestroy {
  searching = false;
  thuoc = new ThuocModel();
  displayDialog: boolean;
  selectedThuoc: {};
  selectedThuocModel: ThuocModel;
  newThuoc: boolean;
  thuocs: ThuocModel[] = [];
  thuocsTable: any[] = [];
  cols: any[];
  uploadedFiles: any[] = [];
  categories: SelectItem[] = [];
  categoriesSelected: any[] = [];
  categorys: CategoryModel[] = [];
  // selectedUnit: number;
  selectedMethod: any;
  selectedBaoche: number;
  // selectedType: number;
  types = NhiXuanOptions.thuocTypes;
  selectedType: {};//NXOption;// = { label: 'Loai 1', value: 1 };
  units = [
    { label: 'Viên', value: 0 },
    { label: 'Lọ', value: 1 },
    { label: 'Chai', value: 2 },
    { label: 'Hộp', value: 3 },
    { label: 'Bình', value: 4 },
    { label: 'Tuýp', value: 5 },
    { label: 'Vỉ', value: 6 },
    { label: 'Lốc', value: 7 },
    { label: 'Khác', value: 99 }
  ];

  // methods = [
  //   { label: 'Uống', value: 0 },
  //   { label: 'Tiêm', value: 1 },
  //   { label: 'Hô hấp', value: 2 },
  //   { label: 'Thụt trực tràng', value: 3 },
  //   { label: 'Tiêm TM', value: 4 },
  //   { label: 'Tiêm bắp', value: 5 },
  //   { label: 'Truyền TM', value: 6 },
  //   { label: 'Nhỏ mắt', value: 7 },
  //   { label: 'Nhỏ mũi', value: 8 },
  //   { label: 'Nhỏ tai', value: 9 },
  //   { label: 'Xịt mũi', value: 10 },
  //   { label: 'Đặt âm đạo', value: 11 },
  //   { label: 'Bôi', value: 12 },
  //   { label: '---', value: 13 },
  // ];

  methods = NhiXuanOptions.cachDungs;

  baoches = [
    { label: 'Hỗn dịch tiêm', value: 0 },
    { label: 'Viên nén', value: 1 },
    { label: 'Dung dịch tiêm', value: 2 },
    { label: 'Thuốc tiêm', value: 3 },
    { label: 'Viên  nang', value: 4 },
    { label: 'Hỗn dịch uống', value: 5 },
    { label: 'DD uống', value: 6 },
    { label: 'Thuốc bột pha tiêm', value: 7 },
    { label: 'Thuốc bột', value: 8 },
    { label: 'DD thụt trực tràng', value: 9 },
    { label: 'Viên nang cứng', value: 10 },
    { label: 'Viên nén bao phim', value: 11 },
    { label: 'Viên bao đường', value: 12 },
    { label: 'Viên nang mềm', value: 13 },
    { label: 'Dung dịch', value: 14 },
    { label: 'ThuốcXịt mũi', value: 15 },
    { label: 'Thuốc mỡ', value: 16 },
    { label: 'Kem bôi', value: 17 },
    { label: 'DD dùng ngoài', value: 18 },
    { label: 'Keo bọt phun xịt', value: 19 },
    { label: '---', value: 20 },
  ];

  msgs: Message[] = [];
  constructor(
    private thuocService: ThuocService,
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit() {
    this.initCategories();
    this.searching = true;
    this.thuocService.getThuocsByType(1).subscribe(
      data => {
        // console.log('getAllThuocs: ', data.data);
        // this.thuocs = data.data;
        this.thuocs = data.data;
        this.thuocsTable = this.convertThuocs(this.thuocs);
        this.searching = false;
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );

    this.selectedType = this.types[0];
    this.cols = [
      { field: 'tenThuoc', header: 'Tên' },
      { field: 'maThuoc', header: 'Mã thuốc' },
      { field: 'hamluong', header: 'Hàm lượng' },
      { field: 'method', header: 'Đường dùng' },
      { field: 'unit', header: 'Đơn vị tính' },
      { field: 'type', header: 'Loại' },
      { field: 'cateString', header: 'Nhóm' },
      // { field: 'trinhbay', header: 'Dạng trình bày' },
      { field: 'weight', header: 'Trọng lượng' },
      { field: 'tnton', header: 'TN Tồn' },
      { field: 'nston', header: 'NS Tồn' },
      { field: 'dvton', header: 'DV Tồn' },
      { field: 'baoche', header: 'Dạng bào chế' },
      { field: 'description', header: 'Tên thương mại' },
      // { field: 'imagepath', header: 'Hình ảnh' },
      // { field: 'dongiaXuat', header: 'Giá Xuất' },
    ];

    // this.thuoc.type = 0;
    // this.selectedUnit = this.units[0].value;
    this.selectedMethod = this.methods[0];
    this.selectedBaoche = this.baoches[0].value;
    this.selectedType = this.types[0].value;
    this.thuoc.categories = [];
  }


  initCategories() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        console.log('getAllCategories: ', data);
        this.categorys = data.data;
        // this.categories = data.data;
        this.categorys.forEach(element => {
          const e = { label: element.name, value: element.id };
          this.categories.push(e);
        });
        // console.log(this.categories);
      },
      err => {
        console.log(err);
      }
    );
  }

  showDialogToAdd() {
    console.log('showDialogToAdd =========', this.thuoc);
    this.newThuoc = true;
    this.thuoc = new ThuocModel();
    this.displayDialog = true;
  }

  changeType() {
    console.log('----change type:', this.selectedType);
    this.thuocService.getThuocsByType(this.selectedType['value']).subscribe(
      data => {
        // console.log('getThuocsByType: ', data.data);
        // this.thuocs = data.data;
        this.thuocs = data.data;
        this.thuocsTable = this.convertThuocs(this.thuocs);
        this.searching = false;
      },
      err => {
        console.log(err);
        this.searching = false;
      }
    );
  }
  
  mapModel() {
    if (this.thuoc.tenThuoc === undefined || this.thuoc.tenThuoc == '') {
      this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa nhập tên thuốc !!!' });
      return;
    }

    this.methods.forEach(e => {
      if (e.name == this.selectedMethod.name) {
        this.thuoc.method = e.name;
      }
    });

    this.baoches.forEach(e => {
      if (e.value == this.selectedBaoche) {
        this.thuoc.baoche = e.label;
      }
    });

    this.types.forEach(e => {
      if (e.value == this.selectedType) {
        this.thuoc.type = e.value;
      }
    });

    this.thuoc.categories = [];
    this.categoriesSelected.forEach(e => {
      console.log('selected cates: ', e);
      this.categorys.forEach(ct => {
        if (Number.parseInt(e) === ct.id) {
          this.thuoc.categories.push(ct);
        }
      })
    });
  }

  save() {
    this.mapModel();
    console.log('-----add thuoc: ', this.thuoc);
    // let cates = [...this.categories];
    console.log('---isNew: ', this.newThuoc);
    // this.thuoc.type = this.selectedType.value;
    this.searching = true;
    if (this.newThuoc) {
      this.thuocService.addThuoc(this.thuoc).subscribe(
        data => {
          if ("This thuoc existed" === data.data) {
            this.searching = false;
            this.addSingle('error', 'Lỗi server', 'Trùng mã thuốc ' + this.thuoc.maThuoc);
  
          }
          // console.log('saved ', data);
          this.thuocs = data.data;
          // just get name of categories
          this.thuocsTable = this.convertThuocs(this.thuocs);
          this.displayDialog = false;
          this.searching = false;
          this.addSingle('success', 'Thành công', 'Đã thêm thuốc ' + this.thuoc.tenThuoc);
        },
        err => {
          this.searching = false;
          this.addSingle('error', 'Lỗi server', 'Chưa thêm được thuốc ' + this.thuoc.tenThuoc);
        }
      );
    } else {
      this.thuocService.editThuoc(this.thuoc).subscribe(
        res => {
          console.log('updated: ', res);
          this.thuocs = res.data;
          // just get name of categories 
          this.thuocsTable = this.convertThuocs(this.thuocs);
          this.searching = false;
          this.displayDialog = false;
          this.addSingle('success', 'Thành công', 'Đã cập nhật thuốc ' + this.thuoc.tenThuoc);
        },
        err => {
          this.searching = false;
          this.addSingle('error', 'Lỗi server', 'Không thể cập nhật được thuốc ' + this.thuoc.tenThuoc);
        }
      );
    }

  }

  convertThuocs(ts: ThuocModel[]): any {
    let list = ts.map(e => {
      const e1: any = { ...e };
      e1.cateString = '';
      if (e === undefined || e.categories.length === 0) {
      } else {
        e1.cateString = '|';
        e.categories.forEach(ct => {
          e1.cateString += ct.name + '|';
        });
      }
      e1.type = this.mapType(e);
      return e1;
    })
    console.log('converted: ', list);
    return list;

  }

  mapType(e): string {
    let loai = this.types.filter(t => {
      return t.value === e.type;
    });
    if (loai.length > 0) {
      
    } else {
      console.log('######## failed: ', e);
      
      return '---';
    }
    return loai[0].label;
  }

  delete() {
    console.log('>>delete>>>>> selected: ', this.selectedThuoc);
    this.thuocService.deleteThuoc(this.selectedThuocModel.id).subscribe(
      res => {
        console.log(res);
        this.displayDialog = false;
        // this.thuocs = res.data;
        const ts: ThuocModel[] = res.data;
        // just get name of categories
        this.convertThuocs(ts);
        this.addSingle('success', 'Thành công', 'Đã xóa thuốc ' + this.selectedThuocModel.tenThuoc);

      },
      err => {
        this.addSingle('error', 'Lỗi server', 'Không thể xóa được thuốc ' + this.thuoc.tenThuoc);
      }
    );
  }

  onRowSelect(event) {
    this.newThuoc = false;
    this.thuoc = this.cloneThuoc(event.data);
    this.selectedThuoc = event.data;
    this.selectedThuocModel = this.thuocs.filter(t => {
      return t.id === this.selectedThuoc['id'];
    })[0];
    console.log(' onRowSelect >>>>>>> selected: ', this.selectedThuoc);

    this.methods.forEach(e => {
      if (e.name == this.selectedThuocModel.method) {
        this.selectedMethod = e;
      }
    });

    this.baoches.forEach(e => {
      if (e.label == this.selectedThuocModel.baoche) {
        this.selectedBaoche = e.value;
      }
    });

    this.types.forEach(e => {
      if (e.value == this.selectedThuocModel.type) {
        this.selectedType = e.value;
      }
    });
    this.displayDialog = true;
  }

  exportThuocExcel() {
    ExcelUtil.exportExcell('DS thuốc', this.thuocs);
  }

  cloneThuoc(c: ThuocModel) {
    let cate = {};
    for (let prop in c) {
      cate[prop] = c[prop];
    }
    return { ...c };
  }

  hideMessage() {
    this.msgs = [];
  }

  ngOnDestroy(): void {
    this.thuoc = null;
    this.thuocs = null;
  }

  
  addSingle(type, summary, detail) {
    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.messageService.add({ severity: type, summary: summary, detail: detail });
  }

  clearMsg() {
    this.messageService.clear();
  }
}
