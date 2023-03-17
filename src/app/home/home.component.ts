import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  // myImg: string = "assets/image2.jpg"
  
  ngOnInit(): void {

  }

  public slides = [
    { src: "assets/image2.jpg" },
    { src: "assets/bank.jpg" },
    { src: "assets/dark-dollar-2-1237045.jpg" },
    { src: "assets/money-under-the-mouse-1-1239135.jpg" },
    { src: "assets/istockphoto-1217392218-1024x1024.jpg" }
  ];

}