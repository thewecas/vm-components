import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileInputComponent } from './components/file-input/file-input.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { RadioComponent } from './components/radio/radio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TooltipDirective, FileInputComponent, RadioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vm-components';

}
