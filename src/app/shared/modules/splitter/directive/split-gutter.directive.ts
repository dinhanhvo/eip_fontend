import { Directive, OnInit, ElementRef, Renderer2, Input } from '@angular/core';
import { SplitComponent } from '../split/split.component';
import { ICss } from '../interface/icss';

@Directive({
  selector: '[appSplitGutter]'
})
export class SplitGutterDirective implements OnInit {

  @Input() order: number = 0;

  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';

  @Input() size: number;

  @Input() color: string = '';

  @Input() disabled: boolean = false;


  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.refreshStyle();
  }

  private refreshStyle(): void {
    const state: 'disabled' | 'vertical' | 'horizontal' = (this.disabled === true) ? 'disabled' : this.direction;
    let styles: Array<ICss> = [
      {
        attr: 'flex',
        value: '0 0 ' + `${this.size}px`
      },
      {
        attr: 'order',
        value: this.order
      },
      {
        attr: 'height',
        value: (this.direction === 'vertical') ? `${this.size}px` : `100%`
      },
      {
        attr: 'background-color',
        value: (this.color !== '') ? this.color : '#F0F0F0'
      },
      {
        attr: 'background-image',
        value: this.getImage(state)
      },
      {
        attr: 'background-position',
        value: 'center'
      },
      {
        attr: 'background-repeat',
        value: 'no-repeat'
      },
      {
        attr: 'cursor',
        value: this.getCursor(state)
      }
    ];
    const el = this.elRef.nativeElement;
    styles.forEach((item: ICss) => {
      this.renderer.setStyle(el, item.attr, item.value);
    });
  }

  private getCursor(state: 'disabled' | 'vertical' | 'horizontal'): string {
    switch (state) {
      case 'horizontal':
        return 'col-resize';

      case 'vertical':
        return 'row-resize';

      case 'disabled':
        return 'default';
    }
  }

  private getImage(state: 'disabled' | 'vertical' | 'horizontal'): string {
    switch (state) {
      case 'horizontal':
        return defaultImageH;

      case 'vertical':
        return defaultImageV;

      case 'disabled':
        return '';
    }
  }
}

const defaultImageH = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==")';
const defaultImageV = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC")';
