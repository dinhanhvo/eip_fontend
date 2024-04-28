import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../../shared/services/script.service';
import { Resume, DonThuoc, Experience, Skill } from '../../../shared/model/resume';
// declare let pdfMake: any ;
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  resume = new Resume();
  // maThuocs = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];
  maThuocs = ['bixilin', 'nhỏ mắt', 'đau bụng'];
  // Education -> DonThuoc
  constructor(
    private scriptService: ScriptService
  ) { 
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.resume = null;
  }

}
