import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-app',
  templateUrl: './error-app.component.html',
  styleUrls: []
})
export class ErrorAppComponent implements OnInit {

  errorApp;
  constructor(  private route: ActivatedRoute ) {   
  }

  ngOnInit() {
     this.errorApp = this.route.snapshot.paramMap.get( 'error' );     
  }

}
