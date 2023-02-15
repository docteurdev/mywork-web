import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  @ViewChild('tab_bar') myElement:ElementRef;
  tab1:boolean;
  constructor() {}
  ngOnInit() {
  }
}
