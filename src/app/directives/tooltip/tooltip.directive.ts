import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective implements AfterViewInit {
  @Input() tooltip!: string;

  tooltipEle!: HTMLDivElement;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.createElememt();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.after(this.tooltipEle);
  }
  @HostListener('mouseout') onMouseLeave() {
    this.tooltipEle.remove();
  }

  createElememt() {
    this.tooltipEle = document.createElement('div');
    this.tooltipEle.innerText = this.tooltip;
    const rectEle = this.el.nativeElement.getBoundingClientRect();
    const yPosition = rectEle.top;
    const xPosition = rectEle.left + rectEle.width / 2;

    this.tooltipEle.setAttribute('class', 'tooltip');
    this.tooltipEle.setAttribute(
      'style',
      `top:${yPosition}px; left:${xPosition}px;`
    );
  }
}
