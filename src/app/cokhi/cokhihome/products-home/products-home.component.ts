import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';

import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
  animations: [routerTransition()]
})
export class ProductsHomeComponent implements OnInit {

  products: any[] = [];
  categoryId: Number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodService: ProductsService
  ) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params['categoryId'];
    console.log('cateID: ', this.categoryId);
    
    if (undefined == this.categoryId) {
      this.prodService.getAllproducts().subscribe(res => {
        this.products = res.data;
        console.log('Products Component-- products: ', this.products);
      });
    } else {
      this.prodService.getProductsByCate(this.categoryId).subscribe(res => {
        this.products = res.data;
        console.log('Products Component by type-- products: ', this.products);
      });
    }
  }

  gotoChiTiet(pr) {
    console.log('chi tiet san pham');
    console.log(pr.id);
    this.router.navigate(['/productsdetail', pr.id]);
  }

}
