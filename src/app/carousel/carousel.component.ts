import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate, useAnimation } from "@angular/animations";
import { fadeIn, fadeOut } from './carousel.animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(fadeIn, {params: { time: '1300ms' }} )]),
      transition("* => void", [useAnimation(fadeOut, {params: { time: '1300ms' }})]),
    ])
   ]
})
export class CarouselComponent implements OnInit {

  constructor() { }

  currentSlide = 0;

  ngOnInit(): void {
    this.preloadImages()
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }

  @Input() slides: any;

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }
  
}
