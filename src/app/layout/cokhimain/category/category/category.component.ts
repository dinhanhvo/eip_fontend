import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { User } from '../../../../shared/model/user';
import { LoginService } from '../../../../shared';

export interface CategoryModel {
  id: number,
  name: '',
  description: '',
  imagepath: '',
  icon: ''
};

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  displayDialog: boolean;

  category: any = {
    id: 0,
    name: '',
    description: '',
    imagepath: '',
    icon: ''
  };

  user: User = {};
  users: User[] = [];
  //   id: null,
  //   name: '',
  //   email: '',
  //   username: '',
  //   serialWeigher: '',
  //   password: '',
  //   address: '',
  //   phone: ''
  // };
  selectedCate: CategoryModel;

  newCate: boolean;

  categories: CategoryModel[] = [];

  cols: any[];

  constructor(
    private categoryService: CategoryService,
    private loginService: LoginService
  ) { }

  ngOnInit() {

    this.loginService.getAllUser().subscribe(
      data => {
        this.user =  data;
      }, error => {

      }
    )

    // this.categoryService.getAllCategories().subscribe(
    //   data => {
    //     console.log('getAllCategories: ', data.data);
    //     this.categories = data.data;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );

    this.cols = [
      { field: 'name', header: 'Tên ' },
      { field: 'email', header: 'Email' },
      { field: 'username', header: 'Tên Đăng Nhập' },
      // { field: 'password', header: 'Mật khẩu' },
      { field: 'address', header: 'Địa chỉ' },
      { field: 'phone', header: 'Số điện thoại' },
      { field: 'serialWeigher', header: 'Mã Cân' }
    ];
  }

  showDialogToAdd() {
    console.log('showDialogToAdd =========');

    this.newCate = true;
    this.category = {};
    this.displayDialog = true;
  }

  saveUser() {
    this.loginService.addUser(this.user);
  }
  save() {
    console.log('-----add cate: ', this.category);

    // let cates = [...this.categories];
    if (this.newCate) {
      this.categoryService.addCategory(this.category).subscribe(
        data => {
          console.log('saved ', data);
          this.categories = data.data;
          this.displayDialog = false;
        },
        err => {

        }
      )
    }
    else {
      this.categoryService.editCategory(this.category).subscribe(
        res => {
          console.log('updated: ', res);
          this.categories = res.data;
          this.displayDialog = false;
        }
      )
    }
  }

  delete() {
    console.log('>>>>>>> selected: ', this.selectedCate);
    let index = this.categories.indexOf(this.selectedCate);
    this.categoryService.deleteCategory(this.selectedCate.id).subscribe(
      res => {
        console.log(res);
        this.displayDialog = false;
        this.categories = res.data;
      }
    )

    // this.category = this.category.filter((val, i) => i != index);
    // this.category = null;
  }

  onRowSelect(event) {
    this.newCate = false;
    this.category = this.cloneCar(event.data);
    this.selectedCate = event.data;
    console.log('>>>>>>> selected: ', this.selectedCate);

    this.displayDialog = true;
  }

  cloneCar(c: CategoryModel) {
    let cate = {};
    for (let prop in c) {
      cate[prop] = c[prop];
    }
    return cate;
  }
}
