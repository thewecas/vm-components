import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  @Input('name') optionName: string = 'option';
  @Input() optionsList: string[] =  ['Option 1 ', 'Option 2', 'Option 3'];
}

