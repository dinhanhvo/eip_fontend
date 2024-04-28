import { TreeNode } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  folders: TreeNode[];

  constructor() {
    this.folders = [{ label: 'No Folders' }];
  }
  setFolders(folders: TreeNode[]) {
    if (folders) {
      this.folders = [];
      this.folders = folders;
    }
  }
  getFolders() {
    return this.folders.slice();
  }
}
