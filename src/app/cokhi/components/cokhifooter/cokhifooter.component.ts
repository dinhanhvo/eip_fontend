import { Component, OnInit } from '@angular/core';

import { CommonItemService } from '../../../shared/services/common-item.service';
import { CommonItemModel } from '../../../shared/model/commonItem.model';

@Component({
  selector: 'app-cokhifooter',
  templateUrl: './cokhifooter.component.html',
  styleUrls: ['./cokhifooter.component.scss']
})
export class CokhifooterComponent implements OnInit {

  commonItems: CommonItemModel[] = [];
  
  constructor(
    private commonItemService: CommonItemService,
  ) { }

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

  }

}
