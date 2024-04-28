import { NXOption, NhiXuanOptions } from "../common/selectitem";
import { PhieuKhamBenh, PhieuKhamBenhModel } from "../model/phieukhambenh";

export class NhiXuanUtil {
  static khuXuats: NXOption[] = NhiXuanOptions.khukbs;
  static khuXuatTN = NhiXuanOptions.khuXuatTN;
  static khuXuatDVYT = NhiXuanOptions.khuXuatDVYT;
  static khuXuatNS = NhiXuanOptions.khuXuatNS;
  static khoNhaps = NhiXuanOptions.khoNhaps;

  public static timKho(khu): NXOption {
      let index = 0;
      let khuTN = this.khuXuatTN.find(k => 
        k.id == khu.id
      );
      if (khuTN) {
        return this.khoNhaps[1];
      }
      let khuNS = this.khuXuatNS.find(k => 
        k.id == khu.id
      );
      if (khuNS) {
        return this.khoNhaps[3];
      };
  
      let khuDVYT = this.khuXuatDVYT.find(k => 
        k.id == khu.id
      );
      if (khuDVYT) {
        return this.khoNhaps[2];
      };
      
      return this.khoNhaps[index];
  }
  
  public static formatStyles(num: number) {
    return Intl.NumberFormat('aaa', {
      style: 'decimal',
      useGrouping: true
    }).format(num);
  }

  public static mapDataTable(resData: any[], cols: any[]): any[] {
    return resData.map((row, i) => {
      let r = new Object();
      cols.forEach((col, j) => {
        r[col.field] = row[j];
      });
      // console.log('------report row: ', r);
      return r;
    });
  }

  public static tongTienCLS(pkb: PhieuKhamBenh, model: PhieuKhamBenhModel): number {
    let tong = 0;
    let clss = pkb.CLSs;
    clss.forEach(cls => {
      switch (cls.type) {
        case 'SA':
          model.tien_sa += cls.dongia;
          break;
        case 'XN':
          model.tien_xn += cls.dongia;
          break;
        case 'DT':
          model.tien_dt += cls.dongia;
          break;
        case 'XQ':
          model.tien_xq += cls.dongia;
          break;
            
        default:
          console.log('incorrect cls type');
          
          break;
      }
    });
    pkb.tien_xq = model.tien_xq; 
    pkb.tien_sa = model.tien_sa;
    pkb.tien_xn = model.tien_xn;
    pkb.tien_dt = model.tien_dt;
    tong += pkb.tien_xq + pkb.tien_dt + pkb.tien_sa + pkb.tien_xn;
    return tong;
  }

  public static tongTienPhieu(pkb: PhieuKhamBenh): number {
    return 0;
    // return pkb.tien_sa + pkb.tien_dt + pkb.tien_xn + pkb.tien_xq + this.tongTienThuoc(pkb);
  }

}