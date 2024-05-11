import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import {User, Weigh} from '../../../../shared/model/user';
import { LoginService } from '../../../../shared';
import {ConfirmationService, MessageService} from 'primeng/api';
import {WeighService} from '../../../../shared/services/weigh.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  displayDialog: boolean;
  titleDialog: string = "Thêm người dùng";

  user: User = {};
  users: User[] = [];
  selectedUser: User = {};

  weighs: Weigh[] = [];
  selectedWeigh: Weigh;

  cols: any[];

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private weighService: WeighService
  ) { }

  ngOnInit() {

    this.loginService.getAllUser().subscribe(
      data => {
        this.users =  data;
      }, error => {

      }
    );

    this.initCan();

    this.cols = [
      { field: 'name', header: 'Tên ' },
      { field: 'email', header: 'Email' },
      { field: 'username', header: 'Tên Đăng Nhập' },
      { field: 'address', header: 'Địa chỉ' },
      { field: 'phone', header: 'Số điện thoại' },
      { field: 'serialWeigher', header: 'Mã Cân' },
    ];
  }

  initCan() {
    this.weighService.getAllWeighs().subscribe(
        data => {
          console.log('getAllCan: ', data);
          this.weighs = data;
          // this.categories = data.data;
          // this.weighs.forEach(element => {
          //   if (element.serialWeigher) {
          //     const e = {label: element.serialWeigher, value: element.id};
          //     this.categories.push(e);
          //   }
          // });
          // console.log(' nhom categories: ', this.categories);
          this.selectedWeigh = this.weighs[0];
        },
        err => {
          console.log(err);
        }
    );
  }

  showDialogToAdd() {
    console.log('showDialogToAdd =========');
    this.displayDialog = true;
  }

  saveUser() {
    if (this.user.id) {
       this.updateUser(this.user);
    } else {
      this.addUser();
    }
  }

  addUser() {
    this.loginService.addUser(this.user)
        .subscribe(
            data => {
              this.users.splice(0, 0, data);
              this.displayDialog = false;
              this.addSingle('success', 'Thành công', 'Đã thêm người dùng ' + this.user.username);
            }, error => {

              if (error.error.message) {
                this.addSingle('error', 'Lỗi', error.error.message);
                // tslint:disable-next-line:triple-equals
              } else if (error.status == 400) {
                this.addSingle('error', 'Lỗi', 'Dữ liệu đầu vào không đúng');
              }
            }
        );
  }

  updateUser(user: User) {
    this.loginService.updateUser(user)
        .subscribe(
            data => {
              this.users = this.users.map(u => u.id !== data.id ? u : data);
              this.displayDialog = false;
              this.addSingle('success', 'Thành công', 'Đã cập nhật người dùng ' + this.user.username);
            }, error => {

              if (error.error.message) {
                this.addSingle('error', 'Lỗi', error.error.message);
                // tslint:disable-next-line:triple-equals
              } else if (error.status == 400) {
                this.addSingle('error', 'Lỗi', 'Dữ liệu đầu vào không đúng');
              }
            }
        );
  }

  delete(rowData) {
    console.log('>>>>>>> selected rowData: ', rowData);

    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa người dùng: ' + rowData.username + '?',
      accept: () => {
        // Actual logic to perform a confirmation
        const index = this.users.indexOf(rowData);
        this.loginService.deleteUser(rowData.id).subscribe(
            res => {
              this.users.splice(index, 1);
              this.displayDialog = false;
              this.addSingle('success', 'Thành công', 'Đã xóa người dùng ' + this.user.username);
            }
        );
      }
    });
  }

  changWeigh() {
    console.log('>>>>>>> selectedWeigh: ', this.selectedWeigh);
  }

  onHideEdit(event) {
    console.log('>>>>>>> selectedUser: ', this.selectedUser);
    this.selectedUser = {};
  }

  onRowSelect(event) {
    console.log('>>>>>>> selected: ', this.selectedUser);
    this.user = {...this.selectedUser};
    this.displayDialog = true;
  }

  addSingle(type, summary, detail) {
    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    this.messageService.add({ severity: type, summary: summary, detail: detail });
  }

}
