import { ElementRef } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

describe('TootipDirective', () => {
  it('should create an instance', () => {
    const directive = new TooltipDirective(
      new ElementRef(new HTMLButtonElement())
    );
    expect(directive).toBeTruthy();
  });
});
