import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appIndeterminate]',
    standalone: true
})
export class IndeterminateDirective {
   @Input()
   set indeterminate(value: any) {
     this.elem.nativeElement.indeterminate = value ;
   }
    constructor(private elem: ElementRef) {
    }
}
