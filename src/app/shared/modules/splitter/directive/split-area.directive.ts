import { Directive, ElementRef, OnInit, Input, NgZone, Renderer2, OnDestroy } from '@angular/core';
import { SplitComponent } from '../split/split.component';

@Directive({
  selector: '[appSplitArea]'
})
export class SplitAreaDirective implements OnInit, OnDestroy {

  @Input() order: number | null = null;

  @Input() size: number | null = null;

  @Input() minSize: number = 0;

  @Input() visible: boolean = true;

  private transitionListener: Function;
  private readonly lockListeners: Array<Function> = [];

  constructor(private ngZone: NgZone,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private split: SplitComponent) { }

  ngOnInit() {
    //adjust size
    this.size = (!isNaN(this.size) && this.size >= 0 && this.size <= 100) ? (this.size / 100) : null;
    this.split.addArea(this);
    this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', '0');
    this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', '0');

    this.ngZone.runOutsideAngular(() => {
      this.transitionListener = this.renderer.listen(this.elRef.nativeElement, 'transitionend', (e: TransitionEvent) => this.onTransitionEnd(e));
    });
    this.split.updateArea(this, false, true);
  }

  public ngOnDestroy(): void {
    this.unlockEvents();

    if (this.transitionListener) {
      this.transitionListener();
    }

    this.split.removeArea(this);
  }

  public lockEvents(): void {
    this.ngZone.runOutsideAngular(() => {
      this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'selectstart', (e: Event) => false));
      this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'dragstart', (e: Event) => false));
    });
  }

  public unlockEvents(): void {
    while (this.lockListeners.length > 0) {
      const fct = this.lockListeners.pop();
      if (fct) {
        fct();
      }
    }
  }

  public getSizePixel(prop: 'offsetWidth' | 'offsetHeight'): number {
    return this.elRef.nativeElement[prop];
  }

  public setStyleVisibleAndDir(isVisible: boolean, isDragging: boolean, direction: 'horizontal' | 'vertical'): void {
    if (isVisible === false) {
      this.setStyleFlexbasis('0', isDragging);
      this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
      this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'hidden');

      if (direction === 'vertical') {
        this.renderer.setStyle(this.elRef.nativeElement, 'max-width', '0');
      }
    }
    else {
      this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
      this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'auto');
      this.renderer.removeStyle(this.elRef.nativeElement, 'max-width');
    }

    if (direction === 'horizontal') {
      this.renderer.setStyle(this.elRef.nativeElement, 'height', '100%');
      this.renderer.removeStyle(this.elRef.nativeElement, 'width');
    }
    else {
      this.renderer.setStyle(this.elRef.nativeElement, 'width', '100%');
      this.renderer.removeStyle(this.elRef.nativeElement, 'height');
    }
  }

  public setStyleOrder(value: number): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
  }

  public setStyleFlexbasis(value: string, isDragging: boolean): void {
    // If component not yet initialized or gutter being dragged, disable transition
    if (this.split.isViewInitialized === false || isDragging === true) {
      this.setStyleTransition(false);
    }
    // Or use 'useTransition' to know if transition.
    else {
      this.setStyleTransition(this.split.useTransition);
    }

    this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
  }

  private setStyleTransition(useTransition: boolean): void {
    if (useTransition) {
      this.renderer.setStyle(this.elRef.nativeElement, 'transition', `flex-basis 0.3s`);
    }
    else {
      this.renderer.removeStyle(this.elRef.nativeElement, 'transition');
    }
  }

  private onTransitionEnd(event: TransitionEvent): void {
    // Limit only flex-basis transition to trigger the event
    if (event.propertyName === 'flex-basis') {
      this.split.notify('transitionEnd');
    }
  }
}
