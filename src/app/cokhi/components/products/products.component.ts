import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categoryId: Number = 0;
  products: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodService: ProductsService
  ) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params['prId'];
    if (undefined == this.categoryId) {
      this.prodService.getAllproducts().subscribe(res => {
        this.products = res.data;
        console.log('Products Component-- products: ', this.products);
      });
    } else {
      this.prodService.getProductsByType(this.categoryId).subscribe(res => {
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
