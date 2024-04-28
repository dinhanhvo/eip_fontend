import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductModel } from '../../../shared/model/product.model';

@Component({
  selector: 'app-productsdetail',
  templateUrl: './productsdetail.component.html',
  styleUrls: ['./productsdetail.component.scss']
})
export class ProductsdetailComponent implements OnInit {

  prId: Number = 0;
  prod: ProductModel;
  imgs: String[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.prId = this.route.snapshot.params['prId'];
    console.log('====================================');
    console.log(this.prId);
    console.log('====================================');
    this.productService.getProduct(this.prId).subscribe(
      res => {
        console.log('======getProduct==============================');
        console.log(res.data);
        console.log('====================================');
        this.prod = res.data;
      }
    );
    
    this.productService.getImgsProduct(this.prId).subscribe(
      res => {
        console.log('======getImgsProduct==============================');
        console.log(res);
        console.log('====================================');
        this.imgs = res.data;
      }
    );

  }

  hinh(img) {
    console.log('choose hinh: ', img);
    
  }
}
