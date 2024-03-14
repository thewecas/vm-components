import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[VmDrag]',
  standalone: true,
})
export class VmDragDirective {
  @Input() dropContainer!: HTMLElement;

  constructor() {}
}
