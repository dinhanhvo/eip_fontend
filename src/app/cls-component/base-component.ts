import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
export class BaseComponent implements OnDestroy {
  subscriptions: Subscription[];
  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy() {
    console.log('BaseComponent destroy');
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    console.log('end destroy');
  }

  addSub(sub: any) {
    this.subscriptions.push(sub);
  }
}
