import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import * as XLSX from 'xlsx';

import { ProviderModel } from '../../../shared/model/provider.model';
import { ProviderService } from '../../../shared/services/provider.service';
@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
  
export class ProviderComponent implements OnInit {

  provider: ProviderModel;
  providers: ProviderModel[];
  cols: any[];
  displayDialog: boolean = false;
  newCate: boolean;
  selectedProvider: ProviderModel;
  data: any[];
  fileName = 'Danh sach nha cung cap';

  msgs: Message[] = [];

  constructor(
    // private dateSvc: DateService,
    private messageService: MessageService,
    private providerService: ProviderService
  ) { }

  ngOnInit() {
    this.initProperties();
    this.initData();
  }

  initData() {
    this.providerService.getAllProviders().subscribe(
      res => {
        this.providers = res.data;
      },
      err => {
        console.log('get providers: ', err);
        
      }
    );
  }

  initProperties() {
    this.provider = new ProviderModel();
    this.providers = [];
    this.cols = [
      { field: 'name', header: 'Tên Công Ty' },
      { field: 'mact', header: 'Mã Công Ty' },
      { field: 'mst', header: 'Mã Số Thuế' },
      { field: 'sdt', header: 'Điện Thoại' },
      { field: 'address', header: 'Địa chỉ' },
      { field: 'note', header: 'Ghi Chú' },
      // { field: 'fax', header: 'Fax' },
    ];
  }

  resetForm() {

  }

  showDialogToAdd() {
    console.log('showDialogToAdd =========');

    this.newCate = true;
    // this.provider = {};
    this.displayDialog = true;
  }

  save() {
    console.log('-----add provider: ', this.provider);

    // let cates = [...this.providers];
    if (this.newCate) {
      this.providerService.addProvider(this.provider).subscribe(
        data => {
          console.log('saved ', data);
          this.providers = data.data;
          this.displayDialog = false;
        },
        err => {

        }
      )
    }
    else {
      this.providerService.editProvider(this.provider).subscribe(
        res => {
          console.log('updated: ', res);
          this.providers = res.data;
          this.displayDialog = false;
        }
      )
    }
    this.displayDialog = false;
  }

  delete() {
    console.log('>>>>>>> selected: ', this.selectedProvider);
    let index = this.providers.indexOf(this.selectedProvider);
    this.providerService.deleteProvider(this.selectedProvider.id).subscribe(
      res => {
        console.log(res);
        this.displayDialog = false;
        this.providers = res.data;
      }
    )

    this.providers = this.providers.filter((val, i) => i != index);
    this.provider = null;
  }

  onRowSelect(event) {
    this.newCate = false;
    // this.provider = this.cloneCar(event.data);
    this.selectedProvider = event.data;
    this.provider = event.data;
    console.log('>>>>>>> selected: ', this.selectedProvider);

    this.displayDialog = true;
  }

  cloneCar(c: ProviderModel) {
    let cate = {};
    for (let prop in c) {
      cate[prop] = c[prop];
    }
    return cate;
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
