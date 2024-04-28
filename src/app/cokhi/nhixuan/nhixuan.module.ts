import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule} from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule, DropdownModule, InputTextModule,
    PanelModule, FileUploadModule
  ]
})
export class NhixuanModule { }
