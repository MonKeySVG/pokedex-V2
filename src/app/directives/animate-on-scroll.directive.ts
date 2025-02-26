import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
})
export class AnimateOnScrollDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'animate');
        }
      });
    });

    observer.observe(this.el.nativeElement);
  }
}
