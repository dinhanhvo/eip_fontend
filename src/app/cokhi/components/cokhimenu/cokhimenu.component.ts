import { Component, OnInit, HostListener  } from '@angular/core';

// translate
import { TranslateService } from '@ngx-translate/core';

import { CategoryService} from '../../../shared/services/category.service';
// import { HttpClient } from '@angular/common/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-cokhimenu',
  templateUrl: './cokhimenu.component.html',
  styleUrls: ['./cokhimenu.component.scss']
})
export class CokhimenuComponent implements OnInit {

  showNav = true;

  menuProduct: any[] = [];
  //   { name: 'Finger', value: 1 },
  //   { name: 'Blades', value: 2 },
  //   { name: 'Grain Lifters', value: 3 },
  //   { name: 'Raspbar bbbb', value: 4 },
  //   { name: 'Combine Parts', value: 5 }
  // ]
  
  constructor(
    public trans: TranslateService,
    private categoryService: CategoryService
  ) { 

  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(
      res => {
        res.data.forEach(element => {
          let e = { ...element };
          e["link"] = 'products/' + e.id;
          this.menuProduct.push(e);
        });
        console.log('menu: ', this.menuProduct);
      }
    )
  }

  toggleNav() {
    // console.log('===1=======showNav: ', this.showNav);
    this.showNav = !this.showNav;
    // console.log('====2======showNav: ', this.showNav);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.screen.width <= 800) {
      this.showNav = false;
    } else {
      this.showNav = true;
    }
  }
}
