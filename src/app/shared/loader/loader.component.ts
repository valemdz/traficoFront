import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../../_services/loader.service";


@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  showLoader: boolean;

  constructor(  private loaderService: LoaderService ) { }

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;        
    });
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }


}
