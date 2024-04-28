import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '../../../shared/services/products.service';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductModel } from '../../../shared/model/product.model';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.scss']
})
export class InsertProductComponent implements OnInit {

  currencies: SelectItem[];
  types: SelectItem[];
  units: SelectItem[];
  productInsert: ProductModel;
  uploadedFiles: any[] = [];

  id: number;
  name: string = '';
  description: string = '';
  imagepath: String = '';
  imgs: String[] = [];
  price: number;
  note: string = '';
  from: string = '';
  status: string = '';
  unit: string = '';
  type: number = 1;
  currencyId: number = 1;
  categoryId: number = 1;
  categories: SelectItem[] = [];

  msgs: Message[] = [];

  // name: string = '';
  constructor(
    private router: Router,
    private messageService: MessageService,
    private productService: ProductsService,
    private categoryService: CategoryService
  ) {
    this.currencies = [
      { label: "VND", value: 0 },
      { label: "USD", value: 1 },
      { label: "EUR", value: 1}
    ]
    this.types = [
      { label: "Loai 1", value: 1 },
      { label: "Loai 2", value: 2 },
      { label: "Loai 3", value: 3 }
    ]
    this.units = [
      { label: "Chiếc", value: 1 },
      { label: "Cái", value: 2 },
      { label: "Hộp", value: 3 }
    ]
  }

  ngOnInit() {
    this.currencyId = 1;
    this.type = 1;
    this.unit = this.units[0].label;
    this.initCategories();
  }

  initCategories() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        console.log('getAllCategories: ', data);
        let cates = data.data;
        // this.categories = data.data;
        cates.forEach(element => {
          let e = { label: element.name, value: element.id };
          this.categories.push(e);
        });
        // console.log(this.categories);
      },
      err => {
        console.log(err);
      }
    )
  }

  onUpload(event) {
    console.log('onUpload', event);
    
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
  }
  
  onBasicUpload(e) {
    this.uploadedFiles = [...e.files];
    this.imgs = e.originalEvent.body.data;
    this.imagepath = JSON.stringify(this.imgs);
    console.log('File uploaded: ', this.imagepath);
  }

  addProduct(e) {
    let err = false;
    console.log('addd Product', this.name, this.description, this.price);
    if (undefined == this.imagepath || this.imagepath == '') {
      this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Chưa upload hình ảnh !!!' });
      err = true;
      return;
    }

    if (Number.isNaN(this.price)) {
      this.msgs.push({ severity: 'error', summary: 'Lỗi: ', detail: 'Đơn giá phải là số !!!' });
      err = true;
      return;
    }

    this.productInsert = {
      "id": this.id,
      "name": this.name,        
      "description": this.description, 
      "imagepath": this.imagepath,   
      "price": this.price,      
      "note": this.note,        
      "from": this.from,        
      "status": this.status,      
      "unit": this.unit,       
      "type": this.type, 
      "categoryId": this.categoryId,
      "currencyId": this.currencyId,
      "imported_at": new Date()
    }

    this.productService.addProduct(this.productInsert).subscribe( 
      data => {
        console.log(data);
        this.router.navigate(['/admin/main']);
      },
      err => {
        console.log(err);
      }
    );
  }

  handleRoute(e) {
      this.router.navigate(['/admin/main']);
      console.log('============= rout to main =======');
  }

  hideMessage() {
    this.msgs = [];
  }

 }
