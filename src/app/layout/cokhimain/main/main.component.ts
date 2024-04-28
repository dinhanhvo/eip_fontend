import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { FilterUtils } from '../../../shared/utils/filterutils';

import { ProductsService } from '../../../shared/services/products.service';
import { ProductModel } from '../../../shared/model/product.model';
import { trigger,state,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class MainComponent implements OnInit {

  cols: any[];
  brands: SelectItem[];
  colors: SelectItem[];

  uploadedFiles: any[] = [];
  products: ProductModel[] = [];
  // products2: any[] = [];
  clonedProducts: { [s: string]: ProductModel; } = {};

  imagepath: string = '';
  ims: any[][] = [
     [1, 2, 3],
    [4, 5, 6]
  ];

  constructor(
    private prodService: ProductsService,
    private messageService: MessageService,
    private router: Router
  ) { 
    
  }

  ngOnInit() {

    this.prodService.getAllproducts().subscribe(res => {
      console.log(res);
      
      this.products = res.data;
      // this.products2 = this.products;
      console.log('======main products: ', this.products);
    });

    this.cols = [
      { field: 'name', header: 'Serial_Weigher' },
      { field: 'description', header: 'Code_Seller' },
      { field: 'imagepath', header: 'Name_Seller' },
      // { field: 'imported_at', header: 'imported_at' },
      { field: 'price', header: 'Code_Tank_Seller' },
      { field: 'note', header: 'Tank_Tare_Weight' },
      { field: 'from', header: 'Tank_Gross_Weight' },
      { field: 'status', header: 'Tank_Net_Weight' },
      { field: 'unit', header: 'Mqtt_Status' },
      // { field: 'type', header: 'created' },
      { field: 'currencyId', header: 'created' }
    ];

    FilterUtils['custom'] = (value, filter): boolean => {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }
        
        return parseInt(filter) > value;
    }
  }

  onRowEditInit(pr: ProductModel) {
    this.clonedProducts[pr.id] = { ...pr };
  }

  onRowEditSave(pr: ProductModel, index: number) {
    console.log('pr  will be edit: ', index);
    pr.imagepath = this.imagepath;
    console.log('imgpath update: ', this.imagepath);
    
    console.log(pr);
    
    this.prodService.editProduct(pr).subscribe(res => {
      console.log(res);
      console.log('======main products: ', this.products);
    },
      err => {
        console.log(err);
        
      }
    );
  }

  onRowEditCancel(pr: ProductModel, index: number) {
      this.products[index] = this.clonedProducts[pr.id];
      delete this.clonedProducts[pr.id];
  }

  onBasicUpload(e) {
    this.uploadedFiles = [...e.files];
    this.imagepath = e.originalEvent.body.data;
    console.log('File uploaded: ', this.imagepath);

    // this.uploadedFiles = [...e.files];
    // let imgs = e.originalEvent.body.data;
    // this.imagepath = JSON.stringify(imgs);
    // console.log('File uploaded: ', this.imagepath);
  }

  handleRoute(e) {
      this.router.navigate(['/admin/insert']);
  }

}
