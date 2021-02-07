import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.sass']
})
export class QuoteComponent implements OnInit {

  
  public showProgressSpinner : boolean;
  
  constructor() {
    this.showProgressSpinner = true;
  }

  ngOnInit(): void {
  }

}
