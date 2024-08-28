import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() text: string = 'New';
  @Input() backgroundColor: string = 'bg-purple';
  @Input() textColor: string = 'text-white';

}
