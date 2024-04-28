import { Directive, EventEmitter, Output, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appDomChange]'
})
export class DomChangeDirective implements OnInit, OnDestroy {
  private changesObserver: MutationObserver;

  @Output()
  domChange: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    const el = this.elRef.nativeElement;
    this.changesObserver = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((m: MutationRecord) => {
        //console.log('emit dom change', el, m);
        this.domChange.emit(m);
      });
    });
    this.changesObserver.observe(el, {
      attributes: true,
      childList: true,
      characterData: true
    });
    //console.log('start monitoring element', el);
  }

  ngOnDestroy() {
    this.changesObserver.disconnect();
  }

}
