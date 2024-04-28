export class PhieuxuatModel {
  id: number;
  khoxuat: string;
  khuxuat: string;
  exported_at: Date;
  numThuocs: number;
  listRecordExport: string;
  total: number;
  tien: string;
  constructor() {
    this.exported_at = new Date();
    this.numThuocs = 0;
    this.total = 0;
    this.listRecordExport = '';
  }
}

// create table `phieuxuat`(
//   `id` bigint(20) not null auto_increment,
//   `khoxuat` varchar(200),
//   `khuxuat` varchar(200),
//   `exported_at` varchar(32),
//   `num_thuocs` int,
//   `list_record_ẽport` text(10000),
//   `total` bigint(20),
//   `tien`  varchar(32),
//   PRIMARY KEY (`id`)
// ) engine=InnoDB default charset=utf8;    