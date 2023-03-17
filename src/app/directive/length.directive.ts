import { Directive, HostListener } from "@angular/core";
import { FormControlName } from "@angular/forms";

@Directive({
    selector: '[appMaxLength]'
  })
  export class MaxLengthDirective {
  
    constructor(private readonly formControl: FormControlName) {}
  
    @HostListener('keyup', ['$event'])
    onKeyUp(event: any): void {
      const value = this.formControl.value;
  
      if (value.length > 10) {
        event.preventDefault();
      }
    }
  
  }