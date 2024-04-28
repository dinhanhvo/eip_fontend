import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cokhimain',
  templateUrl: './cokhimain.component.html',
  styleUrls: ['./cokhimain.component.scss']
})
export class CokhimainComponent implements OnInit {

  isMain: boolean = true;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // this.handleRoute(null);
  }

  // handleRoute(e) {
  //   if (this.isMain) {
  //     console.log('============= rout to insert =======');
  //     this.isMain = false;
  //     this.router.navigate(['/admin/insert']);
  //   } else {
  //     this.isMain = true;
  //     this.router.navigate(['/admin/main']);
  //     console.log('============= rout to insert =======');
  //   }
  // }
}
