import { Component, OnInit } from '@angular/core';
import { CommonItemService } from '../../../shared/services/common-item.service';
import { CommonItemModel } from '../../../shared/model/commonItem.model';
import { ProductModel } from '../../../shared/model/product.model';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-cokhimain',
  templateUrl: './cokhimain.component.html',
  styleUrls: ['./cokhimain.component.scss']
})
export class CokhimainComponent implements OnInit {

  products: ProductModel[];
  responsiveOptions: any[];

  commonItems: CommonItemModel[] = [];

  constructor(
    private commonItemService: CommonItemService,
    private productsService: ProductsService
  ) { 
    
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit() {
    this.commonItemService.getAllCommonItem().subscribe(
      res => {
        console.log(' get common items: ', res);
        this.commonItems = res.data;
      },
      err => {
        console.log(err);
      }
    ); 

    // get data for carousel, product type = 1
    this.productsService.getProductsByType(1).subscribe(
      res => {
        console.log(res);
        this.products = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
