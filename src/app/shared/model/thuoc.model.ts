import { CategoryModel } from './category.model';
export class ThuocModel {
    id: number;
    tenThuoc: string;
    maThuoc: string;
    tentm: string;
    xuatxu: string;
    description: string;
    hamluong: string;
    method: string;
    trinhbay: string;
    baoche: string;
    categories: CategoryModel[];
    imagepath: string;
    weight: number;
    note: string;
    unit: string;
    type: number;
    nston: number;
    dvton: number;
    tnton: number;
    nstonTmp: number;
    tntonTmp: number;
    dvtonTmp: number;
}

export class ThuocForm {
    id: number;
    tenThuoc: string;
    maThuoc: string;
    tentm: string;
    xuatxu: string;
    description: string;
    hamluong: string;
    method: any;
    trinhbay: any;
    baoche: any;
    categories: CategoryModel[];
    imagepath: string;
    weight: number;
    note: string;
    unit: any;
    type: any;
    nston: number;
    dvton: number;
    tnton: number;
    nstonTmp: number;
    tntonTmp: number;
    dvtonTmp: number;
}

// CREATE TABLE `thuoc` (
//     `id` bigint(20) NOT NULL AUTO_INCREMENT,
//     `tenThuoc` varchar(200),
//     `maThuoc` varchar(32),
//     `description` text(5000),
//     `imagepath` text(1000),
//     `note` varchar(100),
//     `unit` varchar(100),
//     `type` int,
//     `weight` int,
//     `hamluong` varchar(100),
//     `baoche` varchar(100),
//     `trinhbay` varchar(100),
//     `method` varchar(40),
//      PRIMARY KEY (`id`)
//   )
//   ENGINE=InnoDB DEFAULT CHARSET=utf8;
